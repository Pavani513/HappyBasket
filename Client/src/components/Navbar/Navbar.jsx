import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    // Debouncing
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            onSearch(searchTerm.trim());
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm, onSearch]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="flex items-center justify-between bg-white shadow p-4">
            {/* Logo */}
            <div
                className="text-2xl font-bold text-blue-600 cursor-pointer"
                onClick={() => navigate("/")}
            >
                HappyBasket
            </div>

            {/* Centered Search Bar */}
            <div className="flex justify-center flex-1">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products by title, category, or price..."
                    className="w-1/2 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate("/CreateProduct")}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Create
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
