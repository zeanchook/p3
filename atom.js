import { atom } from "jotai";
import { getUser } from "./src/utilities/users-service";
import sendRequest from "./src/utilities/send-request";

const cartItems = atom("");
const loginSts = atom(getUser());

const test = sendRequest(`/api/orders/getUserOrders2/`);
console.log("here", test);
const adminUserOrder = atom("");

export { cartItems, loginSts, adminUserOrder };
