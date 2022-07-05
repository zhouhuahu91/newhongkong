// React imports
import { useState } from "react";
// Component imports
import Modal from "@/components/Modal";
import IconButton from "@/components/IconButton";
import Input from "@/components/Input";
import SubmitButton from "@/components/SubmitButton";
// Form imports
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
// Hook imports
import { useAuth } from "@/hooks/useAuth";
// Function imports
import getURL from "@/functions/getURL";

const AddEmployeeRoll = () => {
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [response, setResponse] = useState("");

  const { user } = useAuth();
  const URL = getURL();

  const schema = yup.object().shape({
    email: yup.string().required("required").email("email not valid"),
    roll: yup.string().required("required"),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    setResponse("");
    setProcessing(true);
    const { data } = await axios.post(`${URL}/api/customclaims`, {
      ...formData,
      user,
    });

    if (data.error) {
      setError("email", {
        type: "manual",
        message: data.error,
      });
      return setProcessing(false);
    }

    if (data.message) {
      setResponse(data.message);
    }

    setProcessing(false);
  };

  return (
    <>
      <IconButton
        className="mx-2"
        variant="manage_accounts"
        onClick={() => setOpen(true)}
      />
      <Modal
        toggle={open}
        close={() => setOpen(false)}
        className="bg-white max-w-sm w-full mx-2 rounded-lg overflow-hidden"
      >
        <form className="bg-white w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between p-4 shadow border-b">
            <h1 className="text-xl font-semibold">Add Employee</h1>
            <IconButton variant="close" onClick={() => setOpen(false)} />
          </div>
          <div className="bg-neutral-50 p-4">
            <Input
              register={register}
              errors={errors.email}
              name="email"
              label="email"
            />
            <label htmlFor="roll" className="text-sm text-gray-500">
              function
            </label>
            <select
              className="appearance-none cursor-pointer red-focus-ring my-0.5 border rounded-md w-full text-sm text-gray-500 py-2 px-3"
              {...register("roll")}
            >
              <option value="employee">employee</option>
              <option value="accountant">accountant</option>
              <option value="admin">admin</option>
              <option value="delete">delete</option>
            </select>
            {response && (
              <div className="text-xs p-2 border mt-2 bg-amber-50 flex items-center">
                <span className="material-symbols-rounded text-main mr-1 icon-small">
                  info
                </span>
                <span>{response}</span>
              </div>
            )}
          </div>
          <div className="p-4 border-t flex space-x-4">
            <button
              onClick={() => {
                setOpen(false);
              }}
              type="button"
              className="w-8/12 border button"
            >
              Cancel
            </button>
            <SubmitButton processing={processing}>Send</SubmitButton>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddEmployeeRoll;
