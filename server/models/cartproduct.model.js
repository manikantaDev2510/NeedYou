// ✅ Import mongoose to define a MongoDB schema
import mongoose from "mongoose";

// ✅ Define the schema for the User collection
const cartProductSchema = new mongoose.Schema({
        productId : {
        type : mongoose.Schema.ObjectId,
        ref : 'Product'
    },
    quantity : {
        type : Number,
        default : 1
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    }
},{
    timestamps : true
});

// ✅ Create and export the User model
export const CartProductModel = mongoose.model("CartProduct", cartProductSchema);