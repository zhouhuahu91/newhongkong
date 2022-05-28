// React imports
import { useState } from "react";

// Custom input that accepts register from react hook forms.
const Input = ({
  // This is required and comes from the react hook form library.
  register,
  // This is optional it will turn label red and shows error message.
  errors,
  // Name is required. This is the name of the input...
  // ...and it is also passed on to the react hook form.
  name,
  // This is optional if not passed name will be used.
  type,
  // This is optional if not passed name will be used.
  autoComplete,
  // Label is requiered.
  label,
  // This is optional.
  placeholder,
  // This is optional. Extra styling for the input wrapper.
  wrapper,
  // If the input is required we would want to show a asterisk.
  asterisk,
  // This is optional.
  capitalize,
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className={`flex flex-col w-full ${wrapper && wrapper}`}>
      <label
        htmlFor={name}
        className={`text-xs ${errors ? "text-red-400" : "text-gray-600"}`}
      >
        {label} {asterisk && "*"}
      </label>
      <div className="relative">
        <input
          {...register(name)}
          type={
            type
              ? type === "password"
                ? show
                  ? "text"
                  : "password"
                : type
              : name === "password"
              ? show
                ? "text"
                : "password"
              : name
          }
          placeholder={placeholder ? placeholder : ""}
          autoComplete={autoComplete ? autoComplete : name}
          id={name}
          className={`appearance-none my-0.5 border rounded-lg w-full text-sm text-gray-800 focus-shadow-md py-2 placeholder-gray-300 ${
            capitalize ? "capitalize" : ""
          } ${name === "password" ? "pl-3 pr-8" : "px-3"}`}
        />
        {(name === "password" || type === "password") && (
          <span
            onClick={() => setShow((prev) => !prev)}
            className="material-icons-outlined text-lg text-gray-300 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
          >
            {show ? "visibility_off" : "visibility"}
          </span>
        )}
      </div>
      <label htmlFor={name} className="text-red-400 text-xs">
        {errors?.message}
      </label>
    </div>
  );
};

export default Input;
