// React imports
import { useState } from "react";
// Component imports
import SubmitButton from "@/components/SubmitButton";

const signin = () => {
  const [processing, setProcessing] = useState(false);
  return (
    <div>
      <SubmitButton processing={processing}>signin</SubmitButton>
    </div>
  );
};

export default signin;
