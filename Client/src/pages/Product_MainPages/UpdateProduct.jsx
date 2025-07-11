import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateProduct } from "../../toolkit/ProductSliceRoutes/UserPutRoute";
import { getProductById } from "../../toolkit/ProductSliceRoutes/GetIdRoute";
import { FaPlus } from "react-icons/fa";

const UpdateProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const { data, status, error } = useSelector((state) => state.getProductById);

    const [formData, setFormData] = useState({
        image: "",
        title: "",
        category: "",
        description: "",
        cost: "",
        editorName: ""
    });
    const [preview, setPreview] = useState("");

    useEffect(() => {
        dispatch(getProductById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (data) {
            setFormData({
                image: data?.image || "",
                title: data.Title || "",
                category: data.Category || "",
                description: data.Description || "",
                cost: data.Cost || "",
                editorName: data?.EditorName || ""
            });
            setPreview(data?.image || "");
        }
    }, [data]);

    const handleImageBoxClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setFormData((prev) => ({
                ...prev,
                imageFile: file // used for backend update if needed
            }));
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            image: formData.imageFile, // if using Cloudinary or direct link
            Title: formData.title,
            Category: formData.category,
            Description: formData.description,
            Cost: formData.cost,
            EditorName: formData.editorName,
        };

        try {
            await dispatch(updateProduct({ id, updatedData })).unwrap();
            alert("Product updated successfully!");
            navigate("/products");
        } catch (err) {
            console.error(err);
            alert(err.message || "Error updating product.");
        }
    };

    if (status === "loading") return <p className="text-center">Loading...</p>;
    if (status === "failed") return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-5xl mx-auto m-10 p-6 bg-white rounded-xl shadow-2xl mt-35">
            <h1 className="text-2xl font-bold mb-6 text-center text-orange-600">Update Product</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Image Upload Box */}
                <div
                    className="border-2 border-dashed border-gray-400 rounded-lg flex justify-center items-center w-[200px] h-[200px] mx-auto cursor-pointer hover:transition relative"
                    onClick={handleImageBoxClick}
                >
                    {preview ? (
                        <img src={preview} alt="Preview" className="object-contain h-full w-full rounded-lg" />
                    ) : (
                        <div className="flex flex-col items-center text-gray-400">
                            <FaPlus className="text-4xl mb-2" />
                            <p className="text-sm text-center">Click to upload product image</p>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="hidden"
                    />
                </div>

                {/* Title Field */}
                <div className="flex flex-col">
                    <label className="text-gray-600 mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-600 mb-1">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="border p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                        required
                    >
                        <option value="">Select a category</option>
                        {["Fruits", "Vegetables", "Electronics", "Fashion", "Footwear"].map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-600 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-600 mb-1">Cost</label>
                    <input
                        type="number"
                        name="cost"
                        value={formData.cost}
                        onChange={handleChange}
                        className="border p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
