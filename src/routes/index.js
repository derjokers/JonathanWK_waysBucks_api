const express = require("express");
const router = express.Router();

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


module.exports = router;