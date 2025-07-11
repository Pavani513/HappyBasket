import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postProduct } from "../../toolkit/ProductSliceRoutes/UserPostRoute";

const PostProducts = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    category: "",
    description: "",
    cost: ""
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   await dispatch(postProduct(formData));
    alert("Product Created Successfully!");
    setFormData({
      image: "",
      title: "",
      category: "",
      description: "",
      cost: ""
    });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {["image", "title", "category", "description", "cost"].map((field) =>
          field === "image" ? (
            <input
              key={field}
              name={field}
              type="file"
              onChange={handleChange}
              accept="image/*"
              className="border p-2 rounded"
              required
            />
          ) : (
            <input
              key={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              type={field === "cost" ? "number" : "text"}
              className="border p-2 rounded"
              required
            />
          )
        )}
        <button type="submit" className="bg-sky-600 text-white py-2 rounded hover:bg-sky-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostProducts;
