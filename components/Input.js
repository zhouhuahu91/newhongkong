// React imports
import { useState } from "react";

// Custom input that accepts register from react hook forms.
// This input component CAN NOT be used without react hook forms.
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
  // This is optional and is used to put focus on the input on render.
  focus,
}) => {
  // This state is used to show or not show input when input is a password.
  const [show, setShow] = useState(false);
  return (
    <div className={`flex flex-col w-full ${wrapper && wrapper}`}>
      <label
        htmlFor={name}
        className={`text-xs ${errors ? "text-red-400" : "text-gray-500"}`}
      >
        {label} {asterisk && "*"}
      </label>
      <div className="relative">
        <input
          {...register(name)}
          type={
            // If there is no type we use name.
            type
              ? type === "password" // If there is a type we check if it is password
                ? show // If it is we show or hide the password depending on the show state.
                  ? "text"
                  : "password"
                : type // if it isn't password we use the type passed.
              : name === "password" // if there is no type passed we still check if name is password.
              ? show // If it is we show or hide the password depending on the show state.
                ? "text"
                : "password"
              : name // If there is no type passed and name passed is !== "password" we use name.
          }
          // If focus is true
          autoFocus={focus}
          // If there is placeholder we use placeholder otherwise we pass empty string.
          placeholder={placeholder ? placeholder : ""}
          // If there is no autoComplete we use name.
          autoComplete={autoComplete ? autoComplete : name}
          // Id is always the name it is needed to link the label to the input.
          id={name}
          className={`appearance-none my-0.5 border rounded-lg w-full text-sm hover:shadow focus:outline-none bg-inherit focus:shadow py-2 placeholder-gray-300 ${
            capitalize ? "capitalize" : ""
            // If name is password we move add extra padding on the right side for the icon
          } ${name === "password" ? "pl-3 pr-8" : "px-3"}`}
        />
        {/* If name or type is password we show the icon that can also be pressed. */}
        {(name === "password" || type === "password") && (
          <span
            onClick={() => setShow((prev) => !prev)}
            className="material-symbols-rounded text-lg text-gray-500 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
          >
            {show ? "visibility" : "visibility_off"}
          </span>
        )}
      </div>
      {/* If errors has a message we display it beneath te input. */}
      <label htmlFor={name} className="text-red-400 text-xs">
        {errors?.message}
      </label>
    </div>
  );
};

export default Input;
