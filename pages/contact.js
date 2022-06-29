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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2441.97711764866!2d4.492445416000293!3d52.26196056307211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5c1c5907b92e3%3A0xc413e142a993cc45!2sHavenstraat%2013%2C%202211%20EE%20Noordwijkerhout!5e0!3m2!1snl!2snl!4v1622457839667!5m2!1snl!2snl"
            className="border-0 w-full h-[480px] px-4 sm:px-0 z-10 relative"
            loading="lazy"
            title="google maps"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
