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

// Import Topping Controller
const { 
    getTopping, 
    getToppings,
    addTopping,
    editTopping,
    deleteTopping
} = require("../controllers/topping");


// USER ROUTER
router.get("/users", getUsers);
router.get("/user/:id", auth, getUser);
router.delete("/user/:id", deleteUser);

// PRODUCT ROUTER
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.post("/product", auth, uploadFile("image"), addProduct);
router.patch("/product/:id", auth, uploadFile("image"), editProduct);
router.delete("/product/:id", auth, deleteProduct);

// TOPPING ROUTER
router.get("/toppings", getToppings);
router.get("/topping/:id", getTopping);
router.post("/topping", auth, uploadFile("image"), addTopping);
router.patch("/topping/:id",auth, uploadFile("image"), editTopping);
router.delete("/topping/:id", auth, deleteTopping);

// REGISTER & LOGIN AUTH
router.post('/register', register);
router.post('/login', login);

module.exports = router;