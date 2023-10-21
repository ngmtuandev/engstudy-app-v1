const userController = require("../controllers/blog");
const express = require("express");
const verifyToken = require("../middeware/verifyToken");
const verifyAdmin = require("../middeware/verifyAdmin");
const router = express.Router();

router.post("/new-post", verifyToken, userController.createPost);
router.get("/all-post", userController.getAllPost);
router.get("/:idPost", userController.getOnePost);
router.delete("/:idPost", verifyToken, userController.deletePost);
router.put("/like/:idPost", verifyToken, userController.likePost);


module.exports = router;
