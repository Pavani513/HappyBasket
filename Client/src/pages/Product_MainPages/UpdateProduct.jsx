import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateProduct } from "../../toolkit/ProductSliceRoutes/UserPutRoute";
import { getProductById } from "../../toolkit/ProductSliceRoutes/GetIdRoute";

const UpdateProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {  data, status, error } = useSelector((state) => state.getProductById);

    console.log(data,'data')
    const [formData, setFormData] = useState({
       image: "",
        title: "",
        category: "",
        description: "",
        cost: "",
        editorName:""
       
    });

    useEffect(() => {
        dispatch(getProductById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (data) {
            setFormData({
                image: data?.image ||"",
                title: data.Title || "",
                category: data.Category || "",
                description: data.Description || "",
                cost: data.Cost || "",
                editorName: data?.EditorName || "",
            });
        }
    }, [data]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
        image: formData.image,
        Title: formData.title,
        Category: formData.category,
        Description: formData.description,
        Cost: formData.cost,
        EditorName: formData.editorName,
    };

    console.log(updatedData, 'updatedData being sent');

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
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
            <h1 className="text-xl font-bold mb-4 text-center">Update Product</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {formData.image && (
                    <img
                        src={formData.image}
                        alt={formData.title}
                        className="h-48 w-full object-cover rounded mb-2"
                    />
                )}
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="border p-2 rounded"
                    required
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    placeholder="Cost"
                    className="border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;

