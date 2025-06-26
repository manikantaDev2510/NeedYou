import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
// import { setUserDetails } from "./store/userSlice.js";
import SummaryApi from "./common/SummaryApi.js";
import Axios from "./utils/Axios.js";
import { setAllCategory, setAllSubCategory, setLoadingCategory } from "./store/productSlice.js";
import GlobalProvider from "./provider/GlobalProvider.jsx";
import CartMobileLink from "./components/CartMobile.jsx";
// import fetchUserDetails from "./utils/fetchUserDetails.js";

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation()

  // const fetchUser = async () => {
  //   const userData = await fetchUserDetails();
  //   dispatch(setUserDetails(userData.data));
  // };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummaryApi.getCategory
      })
      const { data: responseData } = response

      if (responseData.success) {
        dispatch(setAllCategory(responseData.data))
      }
    } catch (error) {

    } finally {
      dispatch(setLoadingCategory(false))
    }
  }

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })
      const { data: responseData } = response

      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data))
      }
    } catch (error) {
    } finally {
    }
  }

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory()
  }, []);
  return (
    < GlobalProvider >
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {
        location.pathname !== '/checkout' && (
          <CartMobileLink />
        )
      }

    </GlobalProvider >
  );
}