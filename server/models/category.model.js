// ✅ Import mongoose to define a MongoDB schema
import mongoose from "mongoose";

// ✅ Define the schema for the User collection
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

// ✅ Create and export the User model
export const CategoryModel = mongoose.model("Category", categorySchema);