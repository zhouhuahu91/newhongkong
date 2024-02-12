import Modal from "@/components/Modal";
import IconBtn from "@/components/IconBtn";
// Icon imports
import CloseIcon from "@/icons/CloseIcon";

const TableModal = ({ open, setOpen, table }) => {
  return (
    <Modal
      className="w-full h-full max-w-[1080px] max-h-[820px] relative bg-white rounded-xl"
      toggle={open}
      close={() => setOpen(false)}
    >
      <IconBtn
        onClick={() => setOpen(false)}
        className="absolute right-4 top-4"
      >
        <CloseIcon />
      </IconBtn>
    </Modal>
  );
};

export default TableModal;
