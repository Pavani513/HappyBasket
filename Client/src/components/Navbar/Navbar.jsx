import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import HappeBasket from "../../assets/hb_logo.png";
import search from "../../assets/search.png";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);

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

  const handleCategorySelect = (Category) => {
    setIsDropdownOpen(false);
    setIsMobileCategoriesOpen(false);
    setIsMobileMenuOpen(false);
    navigate(`/category/${Category}`);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between bg-gradient-to-r from-orange-200 via-pink-100 to-orange-300 shadow p-4">
      {/* Logo */}
      <div
        className="cursor-pointer flex justify-center items-center"
        onClick={() => navigate("/products")}
      >
        <img
          src={HappeBasket}
          alt="HappeBasket Logo"
          className="h-20 w-25 object-contain"
        />
      </div>

      {/* Center Search Bar (hidden on mobile & tablet) */}
      <div className="hidden lg:flex justify-center flex-1">
        <div className="relative w-1/2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products"
            className="w-full border border-blue-800 rounded-full pl-12 pr-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-800 transition duration-200"
          />
          <img
            src={search}
            alt="Search"
            className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 opacity-60"
          />
        </div>
      </div>

      {/* Desktop Buttons (hidden on mobile & tablet) */}
      <div className="hidden lg:flex items-center gap-3 relative">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-xl text-blue-900 font-bold px-4 py-2 rounded hover:text-blue-950 transition"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/createProduct")}
          className="text-xl text-blue-900 font-bold px-4 py-2 rounded hover:text-blue-950 transition"
        >
          Create
        </button>

        {/* Categories Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-blue-900 text-xl font-bold px-4 py-2 rounded  hover:text-blue-950 transition flex items-center gap-1"
          >
            Categories <FaChevronDown className="text-sm mt-0.5" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-blue-900 font-bold border border-gray-200 rounded shadow-lg z-50">
              {[
                "Fruits",
                "Vegetables",
                "Electronics",
                "Fashion",
                "Footwear",
              ].map((Category) => (
                <div
                  key={Category}
                  onClick={() => handleCategorySelect(Category)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {Category}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-bold px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Hamburger Menu (visible on mobile & tablet) */}
      <div className="lg:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <FaTimes className="text-2xl text-black" />
          ) : (
            <FaBars className="text-3xl text-black" />
          )}
        </button>
      </div>

      {/* Mobile/Tablet Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-4 w-64 bg-white border border-gray-200 rounded shadow-lg z-50 flex flex-col p-4 gap-2">
          {/* Search Bar */}
          <div className="relative w-1/2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products"
              className="w-55 border border-gray-300 rounded pl-12 pr-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
            <img
              src={search}
              alt="Search"
              className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 opacity-60"
            />
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-xl text-blue-900 font-bold px-4 py-2 rounded hover:text-blue-950 transition"
          >
            Dashboard
          </button>

          {/* Create Button */}
          <button
            onClick={() => {
              navigate("/CreateProduct");
              setIsMobileMenuOpen(false);
            }}
            className="px-4 py-2 text-blue-900 font-bold hover:text-blue-950 text-left rounded"
          >
            Create
          </button>

          {/* Categories Dropdown */}
          <div className="flex flex-col">
            <button
              onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
              className="text-blue-900 font-bold px-4 py-2 hover:text-blue-950 text-left rounded flex items-center justify-between"
            >
              Categories
              <FaChevronDown
                className={`transform transition-transform ${
                  isMobileCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isMobileCategoriesOpen && (
              <div className="flex flex-col border-t border-gray-200 text-blue-950 font-bold">
                {[
                  "Fruits",
                  "Vegetables",
                  "Electronics",
                  "Fashion",
                  "Footwear",
                ].map((Category) => (
                  <div
                    key={Category}
                    onClick={() => handleCategorySelect(Category)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {Category}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-center border-t border-gray-200 rounded bg-red-500 text-white font-bold px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
