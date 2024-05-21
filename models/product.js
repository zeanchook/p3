const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    picture: { type: String },
    views: { type: Number, default: 10 },
    // reviewsCount: { type: Number, default: 0 },
    // averageRating: { type: Number, default: 0 },
    ranking: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  },
);

// Method: Calculate ranking
productSchema.methods.calculateRanking = function () {
  const w1 = 2.0; // weight for views
  const w2 = 0.1; // weight for createdAt (time factor)

  const ageInDays = (Date.now() - this.createdAt) / (1000 * 60 * 60 * 24); // product age in days

  // Formula including views and age (more recent products get higher ranking)
  this.ranking = this.views * w1 - ageInDays * w2;
  return this.ranking;
};

// Pre-save hook to calculate ranking
productSchema.pre("save", function (next) {
  this.calculateRanking();
  next();
});

module.exports = {
  Product: mongoose.model("Product", productSchema),
};
