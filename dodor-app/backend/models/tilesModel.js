const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tileSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    outdoors: {
        type: Boolean,
        required: true,
    }, 
    articleNumber: {
      type: String,
      required: true,
      unique: true,
    },
    meterPerBox: {
      type: Number,
    },
    importPrice: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    supplier: {
      type: String,
      required: true,
      enum: ["Oprey", "BST", "Stonerbell", "Sanimania", "Jabostone", "Balders"],
    },
    inStore: {
        type: Boolean,
        required: true,
        default: false
    },
    positionInStore: {
        type: String,
        required: false,
        enum: ["Muur", "Display", "Lade", "Etalage"]
    },
    picture: {
        type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tile", tileSchema);
