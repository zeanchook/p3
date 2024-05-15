const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 6;

const productSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    picture: { type: String },
  },
  {
    timestamps: true,
  },
);

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    orders: {},
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  // 'this' is the user doc
  if (!this.isModified("password")) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

const orderLineSchema = new Schema(
  {
    product_id: { type: Schema.Types.ObjectId, ref: "Product" },
    orderQty: { type: Number, required: true, default: 1 },
  },
  { toJSON: { virtuals: true } },
);

orderLineSchema.virtual("extPrice").get(function () {
  return this.orderQty * this.product_id.price;
});

const orderSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    paidStatus: { type: Boolean, required: true, default: false },
    orderLine: [orderLineSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

orderSchema.virtual("orderTotal").get(function () {
  return this.orderLine.reduce((total, item) => total + item.extPrice, 0);
});

orderSchema.virtual("totalQty").get(function () {
  return this.orderLine.reduce((total, item) => total + item.orderQty, 0);
});

// orderSchema.virtual('orderId').get(function () {
//   return this.id.slice(-6).toUpperCase();
// });

orderSchema.methods.populateProducts = function () {
  return this.populate({
    path: "orderLine.product_id",
    select: "name price", // you can specify the fields you want to include in the returned documents
  });
};

module.exports = {
  Product: mongoose.model("Product", productSchema),
  Order: mongoose.model("Order", orderSchema),
  User: mongoose.model("User", userSchema),
};
