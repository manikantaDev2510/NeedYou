// ✅ Import mongoose to define a MongoDB schema
import mongoose from "mongoose";

// ✅ Define the schema for the User collection
const addressSchema = new mongoose.Schema({
        address_line : {
        type : String,
        default : ""
    },
    city : {
        type : String,
        default : ""
    },
    state : {
        type : String,
        default : ""
    },
    pincode : {
        type : Number,
    },
    country : {
        type : String,
    },
    mobile : {
        type : Number,
        default : null
    },
    status : {
        type : Boolean,
        default : true
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        default : ""
    }

},{
    timestamps : true
});

// ✅ Create and export the User model
export const AddressModel = mongoose.model("Address", addressSchema);