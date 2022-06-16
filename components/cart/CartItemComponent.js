// React imports
import { useState } from "react";
// Component imports
import IconButton from "@/components/IconButton";
import EditCartItemModal from "@/components/cart/EditCartItemModal";
// Hook imports
import { useCart } from "@/hooks/useCart";
import useI18n from "@/hooks/useI18n";
import { useMenu } from "@/hooks/useMenu";
// Function imports
import euro from "@/functions/euro";
import findItemInMenu from "@/functions/findItemInMenu";

const CartItemComponent = ({ cartItem }) => {
  const [open, setOpen] = useState(false);
  // Retrieves dispatch to increment and decrement cart.
  const { dispatch } = useCart();
  // t is used to translate.
  const t = useI18n();
  // Return the original menu.
  const { data } = useMenu();

  // is the original item in the data.
  const item = findItemInMenu(cartItem.id, data);

  if (item === "item not found") {
    console.log("item not found");
  }

  return (
    <>
      {item !== "item not found" && (
        <EditCartItemModal
          item={item}
          cartItem={cartItem}
          open={open}
          setOpen={setOpen}
        />
      )}
      {/* // ********* CART ITEM CONTAINER ********* */}
      <div className="flex items-start mt-1">
        {/* ********** INCREMENT & DECEREMENT ********** */}
        <div
          style={{ maxWidth: "3.25rem" }}
          className="flex justify-between w-full items-center"
        >
          <IconButton
            variant="remove_circle_outline"
            size="small"
            color="main"
            onClick={() =>
              dispatch({
                type: "DECREMENT_ITEM",
                payload: cartItem,
              })
            }
          />
          <span>{cartItem.qwt}</span>
          <IconButton
            variant="add_circle_outline"
            size="small"
            color="main"
            onClick={() =>
              dispatch({
                type: "INCREMENT_ITEM",
                payload: cartItem,
              })
            }
          />
        </div>
        {/* ********** END INCREMENT & DECEREMENT ********** */}
        {/* ********** PRODUCT NAME & DESCRIPTION ********** */}
        <div className="flex-grow mx-3">
          <div className="flex items-center">
            <span className="mr-2">{cartItem.name[t.locale]}</span>
            <IconButton
              onClick={() => setOpen(true)}
              variant="edit"
              size="small"
            />
          </div>
          <div className="leading-none">
            <span className="text-xs text-gray-500">
              {cartItem.description[t.locale]}
            </span>
          </div>
          {cartItem.remarks && (
            <div className="leading-none flex items-center">
              <span className="text-xs text-gray-500">{cartItem.remarks}</span>
            </div>
          )}
        </div>
        {/* ********** END PRODUCT NAME & DESCRIPTION ********** */}
        {/* ********** PRICE ********** */}
        <div className="justify-self-end">
          <span>{euro(cartItem.price)}</span>
        </div>
        {/* ********** PRICE ********** */}
      </div>
      {/* // ********* END CART ITEM CONTAINER ********* */}
    </>
  );
};

export default CartItemComponent;
