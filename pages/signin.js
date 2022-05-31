// React imports.
import { useState } from "react";
// NextJs imports
import { useRouter } from "next/router";
import Link from "next/link";
// Third party library imports.
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useAuth } from "@/hooks/useAuth";
// Component imports
import Input from "@/components/Input";
import SubmitButton from "@/components/SubmitButton";
import SignInProviders from "@/components/SignInProviders";
import ResetPassword from "@/components/ResetPassword";

// SignIn page.
const SignIn = () => {
  // State that determines if the modal is open.
  const [open, setOpen] = useState(false);
  // State handles the submit button loading state.
  const [processing, setProcessing] = useState(false);
  // t is used to translate the text.
  const t = useI18n();
  // Router is used to redirect user.
  const router = useRouter();
  // we get the signin function from the auth hook.
  const auth = useAuth();
  // This is schema is used in the form to validate the input.
  const schema = yup.object().shape({
    // Email is requiered and checked if it is a valid email.
    email: yup.string().required(t.required).email(t.email_not_valid),
    // Password is requiered.
    password: yup.string().required(t.required),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    // We check the inputs on blur.
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  // This function is used when user signs in with email and password.
  const onSubmit = async (data) => {
    // With this state we disable the submit button.
    setProcessing(true);
    // We collect the data from the react-hook-form.
    // We await the sign in, it will return either a user or a res with a error "code".
    const res = await auth.signIn(data.email, data.password);
    // If the res has the code property it means there is an error.
    // We keep the error vague so that user doesn't receive more information than needed.
    if (res.code) {
      // Return from the function with an error.
      setError("email", {
        type: "manual",
        message: t.sign_in_failed,
      });
      return setProcessing(false);
    }
    // If res doesn't have the code property it means that there isn't an error and...
    // we have a succesfull login.
    // We redirect the customer to the homepage.
    setProcessing(false);
    return router.push("/");
  };

  return (
    <>
      <ResetPassword open={open} setOpen={setOpen} />
      <div className="flex flex-col justify-center items-center mx-4 mt-10 sm:mt-40">
        <div className="flex flex-col justify-center rounded-xl py-8 px-6 w-full max-w-sm border bg-white shadow-sm">
          <h1 className="font-semibold text-3xl">{t.welcome}</h1>
          <h2 className="text-sm">{t.welcome_text}</h2>
          <form className="grid gap-3 mt-10" onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="email"
              register={register}
              errors={errors.email}
              label={t.email}
              focus={true}
            />
            <Input
              name="password"
              register={register}
              errors={errors.password}
              label={t.password}
            />
            {/* This button opens the model for resetting users password. */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="text-xs focus:outline-none text-gray-500 text-right"
            >
              {t.forgot_password}
            </button>
            <SubmitButton processing={processing}>{t.sign_in}</SubmitButton>
            <SignInProviders setError={setError} />
          </form>
        </div>
        <div className="text-xs flex justify-center sm:justify-start w-full max-w-sm">
          <span className="text-gray-500 m-4">
            {t.no_account}{" "}
            <Link href="/signup">
              <a className="text-main font-medium">{t.sign_up_here}</a>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default SignIn;
