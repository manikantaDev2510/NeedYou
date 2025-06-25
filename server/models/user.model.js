// ✅ Import mongoose to define a MongoDB schema
import mongoose from "mongoose";

// ✅ Define the schema for the User collection
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide name"],
    },
    email: {
        type: String,
        required: [true, "Provide email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Provide Password"],
    },
    avatar: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: null
    },
    refresh_token: {
        type: String,
        default: ""
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    last_login_date: {
        type: Date,
        default: ""
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active"
    },
    address_details: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Address'
        }
    ],
    shopping_cart: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'CartProduct'
        }
    ],
    orderHistory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Order'
        }
    ],
    forgot_password_otp: {
        type: String,
        default: null
    },
    forgot_password_expiry: {
        type: Date,
        default: ""
    },
    role: {
        type: String,
        enum: ['ADMIN', "USER"],
        default: "USER"
    }
}, {
    timestamps: true
});

// ✅ Create and export the User model
// NOTE: Mongoose automatically converts "User" to "users" in the DB
export const UserModel = mongoose.model("User", userSchema);