import Modal from "@/components/Modal";
import IconBtn from "@/components/IconBtn";
// Icon imports
import CloseIcon from "@/icons/CloseIcon";
// Hook imports
import { useMenu } from "@/hooks/useMenu";

const TableModal = ({ open, setOpen, table }) => {
  const { data } = useMenu();
  return (
    <Modal
      className="w-full h-full max-w-[1080px] max-h-[820px] relative bg-white rounded-xl overflow-hidden"
      toggle={open}
      close={() => setOpen(false)}
    >
      <IconBtn
        onClick={() => setOpen(false)}
        className="absolute right-4 top-4"
      >
        <CloseIcon />
      </IconBtn>
      {/* Two containers left and right one is the receipt and the other items that we can add to the receipt */}
      <div className="flex flex-row w-full h-full justify-between gap-2 bg-neutral-50">
        <div className="w-full h-full border-r p-4 bg-white grid grid-cols-2 gap-2">
          {data.map((category) => {
            return (
              <div
                key={category.id}
                className="col-span-1 p-3 text-left flex flex-col rounded-lg bg-white hover:shadow hover:scale-[1.04] red-focus-ring transition-all ease-in border cursor-pointer"
              >
                {category.category["nl"]}
              </div>
            );
          })}
        </div>
        <div className="w-full h-full flex border-l p-4 bg-white flex-col font-mono">
          <h1 className="border-b mt-6 p-4 w-full text-center font-bold text-3xl">
            Tafel {table.number}
          </h1>
          <div>test</div>
        </div>
      </div>
    </Modal>
  );
};

export default TableModal;
