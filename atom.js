import { atom } from "jotai";
import { getUser } from "./src/utilities/users-service";

const cartItems = atom("");
const loginSts = atom(getUser());

export { cartItems, loginSts };
