import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../toolkit/ProductSliceRoutes/UserGetRoute";
import { deleteProduct } from "../../toolkit/ProductSliceRoutes/UserDeleteRoute";
import BinImg from "../../assets/Bin.png";
import EditImg from "../../assets/Edit.png";
import { MoreVertical } from "lucide-react";

const Categories = ({ searchTerm = "" }) => { 
    const { category } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openMenuId, setOpenMenuId] = useState(null);

    const { data: products, status, error } = useSelector((state) => state.getProducts);

    useEffect(() => {
        if (status === "idle") {
            dispatch(getProducts());
        }
    }, [dispatch, status]);

    const filteredProducts = products.filter((product) => {
        const inCategory = product.Category.toLowerCase() === category.toLowerCase();
        const matchesSearch =
            product.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(product.Cost).includes(searchTerm);
        return inCategory && (!searchTerm.trim() || matchesSearch);
    });

    const handleMenuToggle = (id) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };

    const handleEdit = (id) => {
        navigate(`/editProduct/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await dispatch(deleteProduct(id)).unwrap();
                dispatch(getProducts());
                alert("Product deleted successfully!");
            } catch (err) {
                console.error(err);
                alert("Error deleting product.");
            }
        }
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen mt-25">
            <h1 className="text-2xl font-bold mb-6 capitalize text-center text-blue-950">
                {category} Category
            </h1>

            {status === "loading" && (
                <p className="text-blue-500 text-center">Loading products...</p>
            )}

            {status === "failed" && (
                <p className="text-red-500 text-center">Error: {error}</p>
            )}

            {status === "succeeded" && filteredProducts.length === 0 && (
                <p className="text-gray-500 text-center">No products found in this category.</p>
            )}

            {status === "succeeded" && filteredProducts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="relative flex flex-col rounded-2xl shadow hover:shadow-md transition group overflow-hidden bg-white"
                        >
                            <button
                                onClick={() => handleMenuToggle(product._id)}
                                className="absolute top-2 right-2 text-blue-900 hover:text-gray-700 z-10"
                            >
                                <MoreVertical size={20} />
                            </button>

                            {openMenuId === product._id && (
                                <div className="absolute top-8 right-2 bg-white shadow rounded p-2 flex flex-col z-20">
                                    <button
                                        onClick={() => handleEdit(product._id)}
                                        className="hover:bg-blue-50 p-1 rounded transition"
                                    >
                                        <img src={EditImg} alt="Edit" className="w-5 h-5 object-contain" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="hover:bg-blue-50 p-1 rounded transition"
                                    >
                                        <img src={BinImg} alt="Delete" className="w-5 h-5 object-contain" />
                                    </button>
                                </div>
                            )}

                            <div
                                onClick={() => navigate(`/productDetails/${product._id}`)}
                                className="cursor-pointer w-full aspect-[4/3] flex items-center justify-center overflow-hidden"
                            >
                                <img
                                    src={product.image}
                                    alt={product?.Title || "Product Image"}
                                    className="w-full h-full object-contain mt-6 transition-transform duration-300 group-hover:scale-105 rounded-t-2xl"
                                />
                            </div>

                            <div className="p-4 flex flex-col flex-grow text-center">
                                <h2 className="font-semibold text-lg text-gray-800 mb-1">{product.Title}</h2>
                                <p className="text-gray-700 text-md mb-1 line-clamp-1">
                                    <strong>Description:</strong> {product.Description}
                                </p>
                                <p className="text-gray-700 font-medium text-base mb-4">₹{product.Cost}</p>

                                {/* View Details Button */}
                                <button
                                    onClick={() => navigate(`/productDetails/${product._id}`)}
                                    className="mt-3 mx-auto w-full flex items-center justify-center gap-1 
                                               text-white font-bold text-sm py-4 rounded-full 
                                               bg-[#FF4500] shadow-sm 
                                               hover:bg-white hover:text-[#F7931E] border border-[#F7931E] 
                                               transition duration-200"
                                >
                                    View product details
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Categories;
