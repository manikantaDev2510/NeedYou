import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";

import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios.js";
import fetchUserDetails from "../utils/fetchUSerDetails.js";

import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit.jsx";

import SummaryApi from "../common/SummaryApi.js";

import { setUserDetails } from "../store/userSlice.js";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [openAvatarEdit, setOpenAvatarEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        const updatedUser = await fetchUserDetails();
        dispatch(setUserDetails(updatedUser.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl w-full mx-auto p-4 md:p-6 lg:p-8">
      {/* Avatar Section */}
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full shadow-lg overflow-hidden bg-gradient-to-br from-indigo-200 to-purple-300 flex items-center justify-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <FaRegUserCircle size={70} className="text-gray-600" />
          )}
        </div>

        <button
          onClick={() => setOpenAvatarEdit(true)}
          className="mt-4 px-4 py-1.5 text-sm font-medium border border-indigo-300 text-indigo-600 hover:bg-indigo-100 transition rounded-full"
        >
          Edit Avatar
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 grid gap-5"
      >
        <h2 className="text-xl font-semibold text-center text-indigo-600">Update Profile</h2>

        <div className="grid">
          <label className="mb-1 text-sm font-medium text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={userData.name}
            onChange={handleOnChange}
            required
            className="p-3 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          />
        </div>

        <div className="grid">
          <label className="mb-1 text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={userData.email}
            onChange={handleOnChange}
            required
            className="p-3 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          />
        </div>

        <div className="grid">
          <label className="mb-1 text-sm font-medium text-gray-600">Mobile</label>
          <input
            type="text"
            name="mobile"
            placeholder="Your mobile number"
            value={userData.mobile}
            onChange={handleOnChange}
            required
            className="p-3 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 bg-green-700 hover:bg-green-800 text-white font-medium py-2 rounded-md transition"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>

      {/* Avatar Edit Modal */}
      {openAvatarEdit && (
        <UserProfileAvatarEdit close={() => setOpenAvatarEdit(false)} />
      )}
    </section>
  );
};