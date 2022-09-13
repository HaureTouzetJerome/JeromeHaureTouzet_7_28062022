// Importer	middleware multer
const multer = require("multer");

// Préparer	dico mime_type - extension
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Créer obj de config pour multer
const storage = multer.diskStorage({
  // Créer obj de config pour multer
  destination: (req, file, callback) => {
    // Informer	dossier de destination
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    let name = file.originalname.split(" ").join("_"); // Remplacer	espace des fichiers par _
    name = name.substring(0, name.lastIndexOf(".")); // Supprimer l'extension
    const extension = MIME_TYPES[file.mimetype]; // Récupérer extension du fichier
    callback(null, name + Date.now() + "." + extension); // Créer nom du fichier, timeStamp + extension
  },
});

// Exporter	middleware multer
module.exports = multer({ storage: storage }).single("image");
