import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreationPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        cost: '',
    });
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            alert('Please select an image');
            return;
        }

        const data = new FormData();
        data.append('image', image);
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('description', formData.description);
        data.append('cost', formData.cost);
        data.append('editorName', 'Admin');

        try {
            await axios.post('http://localhost:3000/api/userPost', data);
            alert('Product created successfully!');
            setFormData({ title: '', category: '', description: '', cost: '' });
            setImage(null);
            navigate('/products'); 
        } catch (error) {
            console.error(error);
            alert('Error creating product.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Create Product</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="number"
                    name="cost"
                    placeholder="Cost"
                    value={formData.cost}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-sky-600 text-white p-2 rounded hover:bg-sky-700 transition"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default CreationPage;


