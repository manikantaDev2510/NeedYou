import React, { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';

import SummaryApi from '../common/SummaryApi';

export default function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isFormValid = Object.values(formData).every((value) => value.trim() !== '');

    useEffect(() => {
        if (!location?.state?.data?.success) {
            navigate('/');
        }

        if (location?.state?.email) {
            setFormData((prev) => ({
                ...prev,
                email: location.state.email,
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('New password and confirm password must match.');
            return;
        }

        try {
            const response = await Axios({
                ...SummaryApi.resetPassword,
                data: formData,
            });

            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/login');
                setFormData({
                    email: '',
                    newPassword: '',
                    confirmPassword: '',
                });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 shadow-xl rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-center mb-4">Reset Your Password</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* New Password */}
                <div className="space-y-1">
                    <label htmlFor="newPassword" className="block text-sm font-medium">New Password</label>
                    <div className="flex items-center bg-indigo-50 border border-indigo-200 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-300 transition">

                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            className="flex-1 outline-none bg-transparent"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="ml-2 text-gray-600"
                        >
                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
                    {/* <div className="flex items-center border rounded bg-blue-50 px-3 py-2 focus-within:border-blue-300"> */}
                    <div className="flex items-center bg-indigo-50 border px-3 py-2 border-indigo-200 rounded focus-within:ring-2 focus-within:ring-indigo-300 transition">

                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm new password"
                            className="flex-1 outline-none bg-transparent"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="ml-2 text-gray-600"
                        >
                            {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full py-2 rounded font-semibold tracking-wide transition ${isFormValid
                        ? 'bg-green-700 hover:bg-green-800 text-white'
                        : 'bg-gray-400 text-white cursor-not-allowed'
                        }`}
                >
                    Change Password
                </button>
            </form>

            {/* Link to Login */}
            <p className="mt-4 text-sm text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-green-700 font-medium hover:underline">
                    Login
                </Link>
            </p>
        </div>
    );
};