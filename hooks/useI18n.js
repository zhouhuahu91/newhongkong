import { useRouter } from "next/router";
import nl from "@/locales/nl";
import en from "@/locales/en";
import de from "@/locales/de";

// We use the hook to check what locale the client is using
const useI18n = () => {
  const router = useRouter();
  const { locale } = router;
  // TODO: Add more locales and change this to a switch case.
  const t = locale === "nl" ? nl : locale === "en" ? en : de;
  return t;
};

export default useI18n;
