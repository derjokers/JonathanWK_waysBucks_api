const express = require("express");
const router = express.Router();

// Import Authentification
const { register, login } = require("../controllers/auth");

// Import User Controller
const {
    getUsers,
    getUser,
    addUser,
    deleteUser,
} = require("../controllers/user");

// Import Product Controller

// USER ROUTER
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.post("/user", addUser);
router.delete("/user/:id", deleteUser);

// Register
router.post('/register', register);
router.post('/login', login);

module.exports = router;