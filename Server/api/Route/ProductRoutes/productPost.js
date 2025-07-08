const express = require('express');
const router = express.Router();
const multer = require('multer');
const Products = require('../../Modal/Products');

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../../cloudniary');

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'recipes',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
    },
});

// Multer with Cloudinary
const upload = multer({ storage });

// POST route to create product
router.post('/userPost', upload.single('image'), async (req, res) => {
    try {
        const { title, category, description, cost, editorName } = req.body;
        const file = req.file;

        if (!file || !title || !category || !description || !cost || !editorName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const imageUrl = file.path;

        const newProduct = new Products({
            image: imageUrl,
            Title: title,
            Category: category,
            Description: description,
            Cost: cost,
            EditorName: editorName
        });

        await newProduct.save();

        res.status(201).json({ message: "Created Successfully", product: newProduct });
    } catch (error) {
        console.error("❌ Error saving product:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;
