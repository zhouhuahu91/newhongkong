// NextJs imports
import Image from "next/image";
import { useRouter } from "next/router";
// Hook imports
import { useAuth } from "@/hooks/useAuth";
import useI18n from "@/hooks/useI18n";

const SignInProviders = ({ setError }) => {
  const t = useI18n();
  const auth = useAuth();
  const router = useRouter();

  const signInWithGoogle = async () => {
    // When customer signs in with google there is only one important error.
    // The user already has an account with the email.
    const res = await auth.signInWithGoogle();
    // If the response has code property and it includes the following message we...
    // notify the user with the error in the email input.
    // Maybe we should make a seperate error label for the google button?
    if (res.code?.includes("exists-with-different-credential")) {
      return setError("email", {
        type: "manual",
        message: t.exists_with_different_credential,
      });
    }
    // If the code doesn't include the message but there is a code property we...
    // return from the fucntion. Need to check what other error codes are important.
    // Maybe for in the future.
    if (res.code) return res.code;
    // If there is no error code we redirect the customer to the homepage.
    router.push("/");
  };

  // We do the same here as signinWithGoogle. See comments above.
  const signInWithFacebook = async () => {
    const res = await auth.signInWithFacebook();
    if (res.code?.includes("exists-with-different-credential")) {
      return setError("email", {
        type: "manual",
        message: t.exists_with_different_credential,
      });
    }
    if (res.code) return res.code;
    router.push("/");
  };

  return (
    <>
      <h2 className="text-gray-500 text-sm text-center">{t.or}</h2>
      <button
        onClick={() => signInWithGoogle()}
        type="button"
        className="button border border-gray-200 w-full relative text-gray-500"
      >
        <div className="absolute w-5 h-5 left-4 top-1/2 transform -translate-y-1/2">
          <Image src="/google.svg" alt="google icon" width={20} height={20} />
        </div>

        {t.sign_in_google}
      </button>
      <button
        onClick={() => signInWithFacebook()}
        type="button"
        className="button bg-fb w-full relative text-white"
      >
        <div className="absolute w-5 h-5 left-4 top-1/2 transform -translate-y-1/2">
          <Image
            src="/facebook.svg"
            alt="facebook icon"
            width={20}
            height={20}
          />
        </div>

        {t.sign_in_facebook}
      </button>
    </>
  );
};

export default SignInProviders;
