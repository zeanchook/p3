const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    picture: { type: String },
  },
  {
    timestamps: true,
  }
);

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const orderLineSchema = new Schema({
  product_id: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  orderQty: { type: Number, required: true, default: 1 },
});

const orderSchema = new Schema(
  {
    user_id: [{ type: Schema.Types.ObjectId, ref: "User" }],
    paidStatus: { type: Boolean, required: true, default: false },
    orderLine: [orderLineSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Product: mongoose.model("Product", productSchema),
  Order: mongoose.model("Order", orderSchema),
  User: mongoose.model("User", userSchema),
};
