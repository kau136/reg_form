const express = require("express");
const router = express.Router();


const {
  getProduct,
  postProduct,
  deleteProduct,
  updateProduct,
  getProductId,
} = require("../controllers/product");

router.post("/post", postProduct);
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);
router.get("/get", getProduct);
router.get("/getId/:id", getProductId);



module.exports = router;
