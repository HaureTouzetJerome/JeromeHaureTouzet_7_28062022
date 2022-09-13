// Importer Express
const express = require("express");

// Créer une instance du routeur
const router = express.Router();

// Controleur
const postCtrol = require("../controllers/post.js");

// Importer	middleware auth
const auth = require("../middleware/auth");

// Importer	middleware multer (qui enregistre les images)
const multer = require("../middleware/multer");

// route Post
// router.get("/", auth, postCtrol.getAllPosts);
// router.get("/:id", auth, postCtrol.getOnePost);
// router.post("/", auth, multer, postCtrol.createPost);
// router.put("/:id", auth, multer, postCtrol.modifyPost);
// router.delete("/:id", auth, postCtrol.deletePost);

router.get("/", postCtrol.getAllPosts);
router.get("/:id", postCtrol.getOnePost);
router.post("/", multer, postCtrol.createPost);
router.put("/:id", multer, postCtrol.modifyPost);
router.delete("/:id", postCtrol.deletePost);

// Si un user like ou dislike
router.post('/:id/like', postCtrol.likePost);

module.exports = router;
