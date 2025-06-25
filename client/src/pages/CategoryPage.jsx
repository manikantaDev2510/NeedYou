import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Axios from "../utils/Axios.js";
import AxiosToastError from "../utils/AxiosToastError.js";

import SummaryApi from "../common/SummaryApi.js";

import Loading from "../components/Loading";
import NoData from "../components/NoData.jsx";
import UploadCategoryModel from "../components/UploadCategoryModel.jsx";
import EditCategory from "../components/EditCategory.jsx";
import ConfirmBox from "../components/ConfirmBox.jsx";

export default function CategoryPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editData, setEditData] = useState({});
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState({});

    // Fetch categories from server
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await Axios({ ...SummaryApi.getCategory });
            if (response.data.success) {
                setCategories(response.data.data);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle category delete
    const handleDeleteCategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data: deleteTarget,
            });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchCategories();
                setOpenDeleteConfirm(false);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className="px-4 py-3">
            {/* Header */}
            <div className="bg-white shadow rounded p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                <h1 className="text-lg font-semibold text-gray-800">Categories</h1>
                <button
                    onClick={() => setOpenAddModal(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded transition"
                >
                    + Add Category
                </button>
            </div>

            {/* No data */}
            {!categories.length && !loading && <NoData />}

            {/* Category grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {categories.map((category) => (
                    <div
                        key={category._id}
                        className="rounded shadow p-2 flex flex-col items-center bg-white"
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-40  object-contain"
                        />
                        <p className="mt-2 text-sm font-medium text-center text-gray-700">
                            {category.name}
                        </p>
                        <div className="flex gap-2 w-full mt-2">
                            <button
                                onClick={() => {
                                    setEditData(category);
                                    setOpenEditModal(true);
                                }}
                                className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 text-xs py-1 rounded transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    setDeleteTarget(category);
                                    setOpenDeleteConfirm(true);
                                }}
                                className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 text-xs py-1 rounded transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Loading */}
            {loading && <Loading />}

            {/* Add modal */}
            {openAddModal && (
                <UploadCategoryModel
                    fetchData={fetchCategories}
                    close={() => setOpenAddModal(false)}
                />
            )}

            {/* Edit modal */}
            {openEditModal && (
                <EditCategory
                    data={editData}
                    fetchData={fetchCategories}
                    close={() => setOpenEditModal(false)}
                />
            )}

            {/* Confirm delete */}
            {openDeleteConfirm && (
                <ConfirmBox
                    confirm={handleDeleteCategory}
                    cancel={() => setOpenDeleteConfirm(false)}
                    close={() => setOpenDeleteConfirm(false)}
                />
            )}
        </section>
    );
};
