import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../toolkit/ProductSliceRoutes/CreationSliceRoute";
import { FaPlus } from "react-icons/fa";

const CreationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login?.user);
  const { status, error } = useSelector((state) => state.creation) || {};

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    cost: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const categories = [
    "Fruits",
    "Vegetables",
    "Electronics",
    "Fashion",
    "Footwear",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleImageBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image");
      return;
    }
    const editorName = user?.username || "Pavani";

    try {
      await dispatch(createProduct({ formData, image, editorName })).unwrap();
      alert("Product created successfully!");
      setFormData({ title: "", category: "", description: "", cost: "" });
      setImage(null);
      setPreview(null);
      navigate("/products");
    } catch (err) {
      console.error(err);
      alert(`Error creating product: ${err}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-2xl rounded-lg m-10 mt-35">
      <h2 className="text-3xl font-bold mb-8 text-center text-orange-500">
        Create Product
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Image Upload */}
        <div
          className="border-2 border-dashed border-gray-400 rounded-lg flex justify-center items-center w-[200px] h-[200px] mx-auto cursor-pointer hover:bg-gray-50 transition relative"
          onClick={handleImageBoxClick}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="object-contain h-full w-full rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <FaPlus className="text-4xl mb-2" />
              <p className="text-sm text-center">Click to upload image</p>
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

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-800"
            required
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-800"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="border rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-800"
            required
          />
        </div>

        {/* Cost */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-medium">Cost</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
              ₹
            </span>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              className="border rounded-lg p-3 pl-8 focus:outline-none focus:ring-1 focus:ring-blue-800 w-full"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className={`bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition font-semibold ${
            status === "loading" ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {status === "loading" ? "Creating..." : "Create Product"}
        </button>

        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default CreationPage;
