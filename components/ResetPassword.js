// React imports
import { useState } from "react";
// Hook imports
import { useAuth } from "@/hooks/useAuth";
import useI18n from "@/hooks/useI18n";
// Component imports
import Modal from "@/components/Modal";
import SubmitButton from "@/components/SubmitButton";
import Input from "@/components/Input";
// Third party library imports.
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const ResetPassword = ({ open, setOpen }) => {
  // Helps with disableling the send button.
  const [processing, setProcessing] = useState(false);
  // Shows the succes message when email link is sent.
  const [success, setSuccess] = useState(false);
  const t = useI18n();
  const auth = useAuth();

  // The schema that we use to validate the email.
  const schema = yup.object().shape({
    // Email is required and checked if it is a valid email.
    email: yup.string().required(t.required).email(t.email_not_valid),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // This function is used to submit the form.
  const onSubmit = async (data) => {
    // Processing state is used to disable the button when submited.
    setProcessing(true);
    // If the res has the property of code it means that there is an error.
    // We show that the error. The only error we show at the moment is that...
    // the email used doesn't exist. Maybe there are other errors that can occure.
    const res = await auth.resetPassword(data.email);
    if (res?.code) {
      setError("email", {
        type: "manual",
        message: t.reset_password_failed,
      });
      // If there is an error we exit the function and set processing backt to false.
      return setProcessing(false);
    }
    // If there isn't an error we setSucces to true to let the user know we have sent an email.
    setSuccess(true);
    // And set processing back to false.
    return setProcessing(false);
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className="bg-white w-80 shadow border py-8 px-6 m-4 rounded-xl"
    >
      <h1 className="font-semibold text-3xl">{t.reset_password}</h1>
      <h2 className="text-sm">{t.reset_password_info}</h2>
      <form className="grid mt-10" onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          errors={errors.email}
          name="email"
          label={t.email}
          focus={true}
        />
        {success && (
          <label htmlFor="email" className="text-xs bg-yellow-100 p-2 mt-3">
            {t.reset_password_succes}
          </label>
        )}
        <SubmitButton processing={processing}>{t.send}</SubmitButton>
      </form>
    </Modal>
  );
};

export default ResetPassword;
