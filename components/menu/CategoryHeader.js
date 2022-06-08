import { useEffect, useState } from "react";

// Hook imports
import useI18n from "@/hooks/useI18n";
const CategoryHeader = ({ data, categoryRef }) => {
  const [visableCategory, setVisableCategory] = useState(null);
  const t = useI18n();

  const getDimensions = (ele) => {
    const { height } = ele.getBoundingClientRect();
    const offsetTop = ele.offsetTop;
    const offsetBottom = offsetTop + height;

    return {
      height,
      offsetTop,
      offsetBottom,
    };
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const x = categoryRef.current.find((e) => {
        if (e) {
          const { offsetBottom, offsetTop } = getDimensions(e);
          return position >= offsetTop && position <= offsetBottom;
        }
      });

      if (x && x !== visableCategory) {
        setVisableCategory(x.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(visableCategory);

  return (
    <div className="flex overflow-scroll sticky top-0">
      {data.map(
        (category, idx) => (
          console.log(category.id == visableCategory),
          (
            <div
              key={category.id}
              onClick={() =>
                categoryRef.current[idx].scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className={`whitespace-nowrap p-1 mx-4 ${
                visableCategory == category.id && "text-main"
              }`}
            >
              {category.category[t.locale]}
            </div>
          )
        )
      )}
    </div>
  );
};

export default CategoryHeader;
