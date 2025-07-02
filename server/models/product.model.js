// ✅ Import mongoose to define a MongoDB schema
import mongoose from "mongoose";

// ✅ Define the schema for the User collection
const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: Array,
        default: []
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Category'
        }
    ],
    subCategory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'SubCategory'
        }
    ],
    unit: {
        type: String,
        default: ""
    },
    stock: {
        type: Number,
        default: null
    },
    price: {
        type: Number,
        defualt: null
    },
    discount: {
        type: Number,
        default: null
    },
    description: {
        type: String,
        default: ""
    },
    more_details: {
        type: Object,
        default: {}
    },
    publish: {
        type: Boolean,
        default: true
    },


    type: { type: String, default: "" },
    shelfLife: { type: String, default: "" },
    countryOfOrigin: { type: String, default: "" },
    fssaiLicense: { type: String, default: "" },
    customerCareDetails: { type: String, default: "" },
    returnPolicy: { type: String, default: "" },
    expiryDate: { type: String, default: "" },

}, {
    timestamps: true
});

productSchema.index({
    name: "text",
    description: "text"
});

// ✅ Create and export the User model
export const ProductModel = mongoose.model("Product", productSchema);