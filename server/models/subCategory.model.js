// ✅ Import mongoose to define a MongoDB schema
import mongoose from "mongoose";

// ✅ Define the schema for the User collection
const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Category"
        }
    ]

}, {
    timestamps: true
});

// ✅ Create and export the User model
export const SubCategoryModel = mongoose.model("SubCategory", subCategorySchema);