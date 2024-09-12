const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: ["Concept", "Offerte verstuurd", "Bestelling geplaatst", "Wachten op betaling", "Afgerond"],
      default: "Concept",
    },    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
