const express = require("express");
const router = express.Router();

// MIDDLEWARE
const { auth } = require("../middleware/auth");
const { uploadFile } = require("../middleware/uploadFile");

// Import Authentification
const { register, login } = require("../controllers/auth");

// Import User Controller
const {
    getUsers,
    getUser,
    deleteUser,
} = require("../controllers/user");

// Import Product Controller
const { 
    getProducts, 
    getProduct,
    addProduct,
    deleteProduct,
    editProduct
} = require("../controllers/product");


// USER ROUTER
router.get("/users", getUsers);
router.get("/user/:id", auth, getUser);
router.delete("/user/:id", deleteUser);

// PRODUCT ROUTER
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.post("/product", auth, uploadFile("image"), addProduct);
router.patch("/product/:id", auth, uploadFile("image"), editProduct);
router.delete("/product/:id", deleteProduct);

// REGISTER & LOGIN AUTH
router.post('/register', register);
router.post('/login', login);

module.exports = router;