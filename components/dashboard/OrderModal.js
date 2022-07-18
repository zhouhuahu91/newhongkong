// Component imports
import Modal from "@/components/Modal";

const OrderModal = ({ open, setOpen }) => {
  return (
    <Modal toggle={open} close={() => setOpen(false)}>
      <button>test</button>
    </Modal>
  );
};

export default OrderModal;
