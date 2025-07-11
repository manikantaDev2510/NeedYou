import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import SearchPage from "../pages/SearchPage.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import OtpVerification from "../pages/OtpVerification.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import UserMenuMobile from "../pages/UserMenuMobile.jsx";
import Dashboard from "../layouts/Dashboard.jsx";
import Profile from "../pages/Profile.jsx";
import MyOrders from "../pages/MyOrders.jsx";
import Address from "../pages/Address.jsx";
import CategoryPage from "../pages/CategoryPage.jsx";
import SubCategoryPage from "../pages/SubCategoryPage.jsx";
import UploadProduct from "../pages/UploadProduct.jsx";
import ProductAdmin from "../pages/ProductAdmin.jsx";
import AdminPermission from "../layouts/AdminPermission.jsx";
import ProductListPage from "../pages/ProductListPage.jsx";
import ProductDisplayPage from "../pages/ProductDisplayPage.jsx";
import CartMobile from "../pages/CartMobile.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";
import Success from "../pages/Success.jsx";
import Cancel from "../pages/Cancel.jsx";
import BackgroundImage from "../components/BackgroundImage.jsx";
import NoData from "../components/NoData.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            { path: "search", element: <SearchPage /> },
            { path: "login", element: <BackgroundImage><Login /></BackgroundImage> },
            { path: "register", element: <BackgroundImage><Register /></BackgroundImage> },
            { path: "forgot-password", element: <BackgroundImage><ForgotPassword /></BackgroundImage> },
            { path: "verification-otp", element: <BackgroundImage><OtpVerification /></BackgroundImage> },
            { path: "reset-password", element: <BackgroundImage><ResetPassword /></BackgroundImage> },
            { path: "user", element: <UserMenuMobile /> },
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    { path: "profile", element: <Profile /> },
                    { path: "myorders", element: <MyOrders /> },
                    { path: "address", element: <Address /> },
                    { path: "category", element: <AdminPermission><CategoryPage /></AdminPermission> },
                    { path: "subcategory", element: <AdminPermission><SubCategoryPage /></AdminPermission> },
                    { path: "upload-product", element: <AdminPermission><UploadProduct /></AdminPermission> },
                    { path: "product", element: <AdminPermission><ProductAdmin /></AdminPermission> }
                ]
            },
            {
                path: ":category",
                children: [
                    { path: ":subCategory", element: <ProductListPage /> }
                ]
            },
            { path: "product/:product", element: <ProductDisplayPage /> },
            { path: "cart", element: <CartMobile /> },
            { path: "checkout", element: <CheckoutPage /> },
            { path: "success", element: <BackgroundImage><Success /></BackgroundImage> },
            { path: "cancel", element: <BackgroundImage><Cancel /></BackgroundImage> },
            { path: "*", element: <NoData /> }
        ]
    }
]);
