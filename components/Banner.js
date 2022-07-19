// React imports
import { useEffect, useState } from "react";
import useI18n from "@/hooks/useI18n";
// Hook imports
import { useStoreInfo } from "@/hooks/useStoreInfo";
// Component imports
import IconButton from "@/components/IconButton";

const Banner = () => {
  const [show, setShow] = useState(true);
  const [bannerMessage, setBannerMessage] = useState("");

  const {
    openingSoon,
    closingSoon,
    remainingMinutes,
    closed,
    digitalClosingTime,
    digitalOpeningTime,
    currentTimeInSeconds,
    liveMessage,
  } = useStoreInfo();
  const t = useI18n();

  useEffect(() => {
    switch (true) {
      case liveMessage.length > 0:
        return setBannerMessage(liveMessage);
      case openingSoon:
        return setBannerMessage(t.store_open_soon(digitalOpeningTime));
      case closingSoon:
        return setBannerMessage(t.store_closing_soon(remainingMinutes));
      case closed:
        return setBannerMessage(
          t.store_closed(digitalOpeningTime, digitalClosingTime)
        );
      default:
        return setBannerMessage("");
    }
  }, [
    digitalOpeningTime,
    digitalClosingTime,
    closed,
    openingSoon,
    closingSoon,
    currentTimeInSeconds,
    remainingMinutes,
    liveMessage,
    t,
  ]);

  return (
    <>
      {show && bannerMessage && (
        <div className="bg-amber-50 py-2 px-4 flex items-center justify-between space-x-2">
          <div className="flex space-x-2 items-center">
            <span className="material-symbols-rounded text-main select-none">
              info
            </span>
            <span className="text-sm font-normal">{bannerMessage}</span>
          </div>
          <IconButton variant="close" onClick={() => setShow(false)} />
        </div>
      )}
    </>
  );
};

export default Banner;
