// const multer = require('multer')
// const upload = multer()

// Importer	express
const express = require("express");

// Créer routeur
const router = express.Router();

// Importer	controleur
const userCtrl = require("../controllers/user");
// const uploadCtrl = require('../controllers/upload')

// Créer route signup
router.post("/signup", userCtrl.signup);

// Créer route login
router.post("/login", userCtrl.login);

// Créer route upload
// router.post('/upload', upload.single('image'), uploadCtrl.uploadImageUser)

// Exporter	routeur
module.exports = router;
