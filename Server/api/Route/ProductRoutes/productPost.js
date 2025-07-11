const express = require("express");
const router = express.Router();
const multer = require("multer");
const products = require("../../Modal/Products");

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../../cloudniary");

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "recipes",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

cloudinary.config();
console.log(cloudinary.config());


const upload = multer({ storage });

router.post("/productPost", upload.single("image"), async (req, res) => {
  try {
    const { Title, Category, Description, Cost, EditorName } = req.body;
    const file = req.file;

    console.log(file, "fledx");

    if (!file || !Title || !Category || !Description || !Cost || !EditorName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const imageUrl = file.path;

    const newProduct = new products({
      image: imageUrl,
      Title,
      Category,
      Description,
      Cost,
      EditorName,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Created Successfully", product: newProduct });
  } catch (error) {
    console.error("❌ Error saving product:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
