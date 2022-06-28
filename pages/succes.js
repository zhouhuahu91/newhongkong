// NextJs imports
import { useRouter } from "next/router";

const Succes = () => {
  const router = useRouter();

  console.log(router.query);

  return <div></div>;
};

export default Succes;
