const express = require("express");
const router = express.Router();
const Data = require("../../Modal/Products");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../../cloudniary");

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'recipes',
        allowed_formats: ['jpg', 'jpeg', 'png'],
    },
});

const upload = multer({ storage: storage });

router.put('/userPut/:id', upload.single('image'), async (req, res) => {
    try {
        console.log(req.body,'frontend data'); // this should now show your fields

        const { title, category, description, cost, editorName } = req.body;
        const id = req.params.id;

        const updatedFields = {
            Title: title,
            Category: category,
            Description: description,
            Cost: cost,
            EditorName: editorName,
        };

        if (req.file && req.file.path) {
            updatedFields.image = req.file.path;
        }

        console.log(updatedFields, "updatedFields");

        const updatedProduct = await Data.findByIdAndUpdate(
            id,
            updatedFields,
            { new: true }
        );

        console.log(updatedProduct, "updatedProduct");

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating product" });
    }
});

module.exports = router;
