import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../toolkit/ProductSliceRoutes/UserDeleteRoute";
import { MoreVertical } from "lucide-react";
import { getProducts } from "../../toolkit/ProductSliceRoutes/UserGetRoute";
import Navbar from "../../components/Navbar/Navbar";

const GetProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, status, error } = useSelector((state) => state.getProducts);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    // Debounced Search
    useEffect(() => {
        const debounce = setTimeout(() => {
            if (!searchTerm.trim()) {
                setFilteredData(data);
                return;
            }
            const lowerTerm = searchTerm.toLowerCase();
            const filtered = data.filter(
                (product) =>
                    product.Title.toLowerCase().includes(lowerTerm) ||
                    product.Category.toLowerCase().includes(lowerTerm) ||
                    String(product.Cost).includes(lowerTerm)
            );
            setFilteredData(filtered);
        }, 400);

        return () => clearTimeout(debounce);
    }, [searchTerm, data]);

    const handleMenuToggle = (id) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };

    const handleEdit = (id) => {
        navigate(`/editProduct/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            await dispatch(deleteProduct(id)).unwrap();
            dispatch(getProducts());
            alert("Product deleted successfully!");
        } catch (err) {
            console.error("Delete error:", err);
            alert("Error deleting product.");
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <div className="p-4">
            <Navbar onSearch={handleSearch} />

            <h1 className="text-2xl font-bold mb-4 text-center">All Products</h1>

            {status === "loading" && <p className="text-center">Loading...</p>}

            {status === "failed" && (
                <p className="text-center text-red-500">{error}</p>
            )}

            {status === "succeeded" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredData.map((product) => (
                        <div
                            key={product._id}
                            className="relative border p-4 rounded shadow bg-white hover:shadow-lg transition group"
                        >
                            {/* Three dots menu */}
                            <button
                                onClick={() => handleMenuToggle(product._id)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                <MoreVertical size={20} />
                            </button>

                            {openMenuId === product._id && (
                                <div className="absolute top-8 right-2 bg-white shadow rounded p-2 flex flex-col z-10">
                                    <button
                                        onClick={() => handleEdit(product._id)}
                                        className="text-blue-600 hover:bg-blue-50 text-left px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="text-red-600 hover:bg-red-50 text-left px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}

                            <div
                                onClick={() => navigate(`/productDetails/${product._id}`)}
                                className="cursor-pointer"
                            >
                                <img
                                    src={product.image}
                                    alt={product?.Title || "Product Image"}
                                    className="h-100 w-full object-cover rounded mb-2"
                                />
                                <h2 className="font-semibold text-lg">{product.Title}</h2>
                                <p className="text-gray-600">Category: {product.Category}</p>
                                <p className="text-gray-800 font-medium">Cost: ₹{product.Cost}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GetProducts;

