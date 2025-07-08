const express =  require("express");
const Products = require("../../Modal/Products");
// const Products = require("../Modal/Products");

const router= express.Router()
  router.delete('/userDelete/:id', async (req, res) => {
  try {
    const id = req.params.id;

    console.log(id)
    const deletedProduct = await Products.findByIdAndDelete(id);
    console.log(deletedProduct,'deletedProduct')
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Deleted Successfully", deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error deleting product", error: error.message });
  }
});

module.exports=router;