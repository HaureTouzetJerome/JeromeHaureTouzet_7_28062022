// Importer	package de cryptage
const bcrypt = require("bcrypt");

// Importer	package token
const jwt = require("jsonwebtoken");

const { User } = require("../db/");

// Exporter	fonction d'enregistrement des user
exports.signup = (req, res) => {
  print(req.body);

  bcrypt
    .hash(req.body.password, 10) // Hacher mot de passe
    .then((hash) => {
      const user = new User({
        // Créer	user avec mot de passe crypté
        email: req.body.email,
        password: hash,
      });
      user
        .save() // Enregistrer	user dans la BD
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res) => {
  print(req.body.email);

  User.findOne({ where: { email: req.body.email } }) //Trouver user dans BD en fct de email
    .then((user) => {
      print(user);

      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password) // Comparer	mot de passe
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            // Renvoyer obj JSON avec userID et un token
            userId: user._id,
            email: emailMask(user.email),
            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

function emailMask(email) {
  let maskedEmail = "";
  for (let i = 0, l = email.length; i < l; i++) {
    if (i < l / 2) {
      maskedEmail += "*";
    } else {
      maskedEmail += email[i];
    }
  }
  return maskedEmail;
}

function print(thing) {
  console.log("@@ " + thing, thing);
}
