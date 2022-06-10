// Component imports
import Modal from "@/components/Modal";

// The user has to decide if they want to have there food delivered or picked up.
// When the user clicks on an item card we check if delivery === "undecided".
// If it is, we open the modal for them to pick one.
const DeliveryOrPickUp = ({ open, setOpen }) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      delivery or pick up
    </Modal>
  );
};

export default DeliveryOrPickUp;
