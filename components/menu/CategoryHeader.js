// React imports
import { useEffect, useState, useRef } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
// Function imports
import getElementDimensions from "@/functions/getElementDimensions";
// Component imports
import IconBtn from "@/components/IconBtn";
import ChevronRightIcon from "@/icons/ChevronRightIcon";
import ChevronLeftIcon from "@/icons/ChevronLeftIcon";
import IconButton from "@/components/IconButton";
import Search from "@/components/menu/Search";

const CategoryHeader = ({ data, categoryRef }) => {
  // This state stores the id of the current category in view.
  const [visableCategory, setVisableCategory] = useState(null);
  // t is the translation object.
  const t = useI18n();
  // This references to the category title itself.
  const categoryTitleRef = useRef([]);
  // This is a reference to the container holding the titles.
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
    // We set the event listener.
    window.addEventListener("scroll", handleScroll);
    // We clean up the event listener.
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // This useEffect hightlights the current category in the header.
  useEffect(() => {
    // We first check if everything is loaded.
    if (containerRef.current && visableCategory && categoryTitleRef.current) {
      // We look for the element that is currently visable.
      // We filter out the title that has the same id.
      const element = categoryTitleRef.current.find(
        (title) => title.id === visableCategory.id
      );
      // We then scroll to the element.
      const { offsetLeft } = getElementDimensions(element);
      // We then scroll to this element in the container ref.
      // We have an ajustment of 5 for the padding.
      containerRef.current.scrollTo({
        // We ajust it with the offset of the container because it has margins and paddings.
        left: offsetLeft - containerRef.current.offsetLeft - 5,
        behavior: "smooth",
      });
    }
  }, [visableCategory, containerRef, categoryTitleRef]);

  return (
    <div className="bg-white border-b sticky top-0 z-10 p-2">
      <div className="mx-auto max-w-screen-xl flex items-center relative">
        {/* This button scrolls the container holding the category titles to the left. */}
        {/* It scrolls it only one client width at the time. */}
        <Search />
        <IconBtn
          onClick={() => {
            if (containerRef.current) {
              containerRef.current.scrollTo({
                left:
                  // We check where the current scroll position is and we subtract the width of the element.
                  containerRef.current.scrollLeft -
                  containerRef.current.clientWidth,
                behavior: "smooth",
              });
            }
          }}
          variant="chevron_left"
          className="rounded mx-2"
        >
          <ChevronLeftIcon />
        </IconBtn>
        {/* ********* CONTAINER FOR ALL THE TITLES ********* */}
        <div
          ref={containerRef}
          className="flex overflow-scroll hide-scroll-bar"
        >
          {data.map((category, idx) => (
            <button
              type="button"
              id={category.id}
              key={category.id}
              ref={(e) => (categoryTitleRef.current[idx] = e)}
              onClick={() => {
                // This scrolls the main menu in the y axis.
                window.scrollTo({
                  behavior: "smooth",
                  // We scroll to the top of the category + 100px for ajustment.
                  top: categoryRef.current[idx].offsetTop + 100,
                });
              }}
              className={`whitespace-nowrap my-3 rounded-full px-2 text-sm py-1 transition-colors ease-in duration-200 ${
                visableCategory?.id == category.id
                  ? "border-main font-medium text-main selected red-focus-ring mx-1"
                  : "red-focus-text"
              }`}
            >
              {/* We highlight the category that is selected. */}
              {category.category[t.locale]}
            </button>
          ))}
        </div>
        <IconBtn
          onClick={() => {
            if (containerRef.current) {
              containerRef.current.scrollTo({
                left:
                  // We check where the current scroll position is and we add the scroll width of the element.
                  containerRef.current.scrollLeft +
                  containerRef.current.clientWidth,
                behavior: "smooth",
              });
            }
          }}
          className="mx-2 rounded"
        >
          <ChevronRightIcon />
        </IconBtn>
      </div>
    </div>
  );
};

export default CategoryHeader;
