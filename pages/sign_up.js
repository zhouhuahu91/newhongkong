// React imports
import { useState } from "react";
// NextJs imports
import Link from "next/link";
import { useRouter } from "next/router";
// Third party library imports.
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useAuth } from "@/hooks/useAuth";
// Component imports
import Input from "@/components/Input";
import SubmitButton from "@/components/SubmitButton";
import SignInProviders from "@/components/SignInProviders";

const SignUp = () => {
  // State disables screen and submit button on submit.
  const [processing, setProcessing] = useState(false);
  // To push the user to the home page on successful sign up.
  const router = useRouter();
  // This hooks gives acces to all auth functions.
  const auth = useAuth();
  // t is used to translate the text.
  const t = useI18n();
  // Schema is passed to the react hook form to validate the input.
  const schema = yup.object().shape({
    // Name is required and just in case max 100 characters.
    name: yup.string().required(t.required).max(100),
    // Email is required and checked if it is a valid email.
    email: yup.string().email(t.email_not_valid).required(t.required),
    // Password is required and minimum 6 characters.
    password: yup.string().required(t.required).min(6, t.min_6),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Function triggers on submit.
  const onSubmit = async (data) => {
    // First we set processing to true to disable the screen and submit button.
    setProcessing(true);
    // Deconstruct the data.
    const { name, email, password } = data;
    // We use the useAuth hook to sign up the user.
    const { code } = await auth.signUp(email, password, name);

    if (code === "auth/email-already-in-use") {
      // If the email is already in use we set the error.
      setError("email", { type: "manual", message: t.email_already_in_use });
      // We return here to make sure we don't trigger the redirect.
      return setProcessing(false);
    }

    // We set processing to false to enable the screen and submit button.
    setProcessing(false);
    // We redirect the user to the home page.
    router.push("/");
  };

  return (
    <div className="flex flex-col justify-center items-center mx-4 mt-10 sm:mt-32">
      <div className="flex flex-col justify-center rounded-xl py-8 px-6 w-full max-w-sm border bg-white shadow">
        <h1 className="font-semibold text-3xl">{t.welcome}</h1>
        <h2 className="text-sm">{t.sign_in_text}</h2>
        <form className="grid gap-3 mt-10" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            errors={errors.name}
            name="name"
            type="text"
            label={t.name}
            focus={true}
          />
          <Input
            register={register}
            errors={errors.email}
            name="email"
            label={t.email}
          />
          <Input
            register={register}
            errors={errors.password}
            name="password"
            autoComplete="new-password"
            label={t.password}
          />
          <span className="text-xs text-gray-500 mt-1 text-right">
            {t.already_have_account}{" "}
            <Link href="/sign_in">
              <a className="text-main font-medium">{t.sign_in}</a>
            </Link>
          </span>
          <SubmitButton processing={processing}>{t.send}</SubmitButton>
          <SignInProviders setError={setError} />
        </form>
      </div>
      <div className="text-xs flex justify-center sm:justify-start w-full max-w-sm">
        <span className="m-4 text-gray-500">
          {t.our}{" "}
          <Link href="/privacy_policy">
            <a className="text-main font-medium">{t.privacy_policy}</a>
          </Link>{" "}
          {t.applies}.
        </span>
      </div>
    </div>
  );
};

export default SignUp;
