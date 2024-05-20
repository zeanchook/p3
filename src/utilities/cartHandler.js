//   //patch, post
import {
  updateCartDetails,
  createCartDetails,
  deleteCartItem,
} from "./cart-service";
import { produce } from "immer";

export const handleCart = async (type, cartState, quantity, productId) => {
  const orderLineFinder = finder(cartState, productId);
  console.log(orderLineFinder, cartState, quantity);
  if (orderLineFinder !== -1) {
    const nextState = produce(cartState, (draft) => {
      draft.orderLine[orderLineFinder].orderQty += quantity;
    });

    const updatedCart = await updateCartDetails(
      nextState.orderLine[orderLineFinder],
      nextState._id,
    );
    console.log(updatedCart, nextState.orderLine[orderLineFinder], nextState);
    return nextState;
  } else {
    const orderLine = {
      product_id: productId,
      orderQty: quantity,
    };
    const nextState = produce(cartState, (draft) => {
      draft?.orderLine?.push(orderLine);
    });
    const updatedCart = await createCartDetails(cartState._id, orderLine);
    console.log(nextState, updatedCart);
    return nextState;
  }
};

export const finder = (cartState, productId) => {
  const orderLineFinder = cartState?.orderLine?.findIndex(
    (item) =>
      item.product_id._id === productId || item.product_id === productId,
  );
  return orderLineFinder;
};

export const deleteCart = (productId, cartStates) => {
  console.log(finder(cartStates, productId));
  const nextState = produce(cartStates, (draft) => {
    draft.orderLine.splice([finder(cartStates, productId)], 1);
  });
  // console.log(nextState)
  deleteCartItem(productId);
  return nextState;
};
