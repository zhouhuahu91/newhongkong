import useI18n from "@/hooks/useI18n";
import { useStoreInfo } from "@/hooks/useStoreInfo";

const Contact = () => {
  const t = useI18n();
  const { digitalOpeningTime, digitalClosingTime } = useStoreInfo();
  return (
    <div className="mx-auto max-w-lg">
      <div className="flex flex-col rounded-xl sm:bg-white sm:shadow sm:border sm:mt-10 overflow-hidden">
        <div className="p-4">
          <h1 className="font-semibold text-3xl my-2">{t.contact}</h1>
          <p className="text-sm">
            {t.opening_hours(digitalOpeningTime, digitalClosingTime)}
          </p>
          <a
            className="text-sm block text-main font-medium mt-2"
            href="mailto:info@newhongkong.nl"
          >
            info@newhongkong.nl
          </a>
          <a
            className="text-sm block text-main font-medium mt-2"
            href="tel:+31252372902"
          >
            0252 37 29 02
          </a>
        </div>
        <div className="relative">
          <div className="absolute right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2">
            <span className="text-sm block mt-2">Havenstraat 13</span>
            <span className="text-sm block">2211EE Noordwijkerhout</span>
          </div>
          <iframe
            src={`https://www.google.com/maps/embed/v1/MAP_MODE?key=${process.env.NEXT_PUBLIC_GOOGLEMAPS_API}&havenstraat+13+Noordwijkerhout`}
            className="border-0 w-full h-[480px] px-4 sm:px-0 z-10 relative"
            referrerPolicy="no-referrer-when-downgrade"
            loading="lazy"
            title="google maps"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
