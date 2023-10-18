const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    name:{
      type:String,
      require:[true,"Please Enter the name of the product"]
    },
    description:{
      type: String,
      required:[true,'please enter a description']
    },
    price:{
      type:Number,
      required:[true,'please enter a price'],
      default:0
    },
    quantity:{
      type:Number,
      require:true,
      default:0
    },
    category:{
      type:String,
      required:[true,"Please Enter the Category you want to select"]
    }
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model("Product", productSchema);
module.exports= Product;
