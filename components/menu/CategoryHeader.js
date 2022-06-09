// React imports
import { useEffect, useState, useRef } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
// Function imports
import getElementDimensions from "@/functions/getElementDimensions";

const CategoryHeader = ({ data, categoryRef }) => {
  // This state stores the id of the current category in view.
  const [visableCategory, setVisableCategory] = useState(null);
  // t is the translation object.
  const t = useI18n();
  // This references to the category title itself.
  const categoryTitleRef = useRef([]);
  const containerRef = useRef();

  // This useEffect listens to scroll and changes the visableCategory state.
  useEffect(() => {
    const handleScroll = () => {
      // Position of the current scroll
      const position = window.scrollY;
      // Find in witch category the scroll is in.
      const currentCategory = categoryRef.current.find((e) => {
        if (e) {
          const { offsetBottom, offsetTop } = getElementDimensions(e);
          return position > offsetTop && position < offsetBottom;
        }
      });
      // If there is a currentCategory and it is not the same as the visableCategory...
      // ...then set the visableCategory to the curret category's id.
      if (currentCategory && currentCategory !== visableCategory) {
        setVisableCategory(currentCategory);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (containerRef.current && visableCategory && categoryTitleRef.current) {
      const element = categoryTitleRef.current.find(
        (title) => title.id === visableCategory.id
      );
      const { offsetLeft } = getElementDimensions(element);
      containerRef.current.scrollTo({
        left: offsetLeft - 40,
        behavior: "smooth",
      });
    }
  }, [visableCategory, containerRef, categoryTitleRef]);

  return (
    <div className="sticky top-0 bg-white z-10 rounded-full border mt-10 hover:shadow focus:shadow">
      <div
        ref={containerRef}
        className="flex overflow-scroll mx-8 hide-scroll-bar"
      >
        {data.map((category, idx) => (
          <div
            id={category.id}
            key={category.id}
            ref={(e) => (categoryTitleRef.current[idx] = e)}
            onClick={() => {
              window.scrollTo({
                behavior: "smooth",
                // We scroll to the top of the category + 50px for ajustment.
                top: categoryRef.current[idx].offsetTop + 50,
              });
            }}
            className={`whitespace-nowrap my-2 cursor-pointer flex items-center`}
          >
            <span
              className={`px-2 text-sm py-1 rounded-full transition-colors ease-in duration-200 ${
                visableCategory?.id == category.id && "bg-main text-white"
              }`}
            >
              {category.category[t.locale]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHeader;
