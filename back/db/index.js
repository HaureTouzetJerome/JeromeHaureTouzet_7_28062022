let users = require("./data/mock-user.js"); // On importe notre tableau d'objet user
let posts = require("./data/mock-post.js"); // On importe notre tableau d'objet post

// Importer	package de cryptage
const bcrypt = require("bcrypt");

// Base de donnée  --------------------------------------------------------------------
const dbConfig = require("../db.config.js");
// 1) Importer le module sequelize
const { Sequelize, DataTypes } = require("sequelize");

// 2) Cette instance représente la connection à la BD (voir db.config.js)
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});
// 3) Se connecter
sequelize
  .authenticate()
  .then((_) => console.log("Connection BD OK "))
  .catch((error) => console.log(`Connection BD ERREUR: ${error}`));

// 5) Création des tables via models
const PostModel = require("./models/post.js");
const Post = PostModel(sequelize, DataTypes);

const UserModel = require("./models/user.js");
const User = UserModel(sequelize, DataTypes);

const LikeModel = require("./models/like.js");
const Like = LikeModel(sequelize, DataTypes);

const DislikeModel = require("./models/dislike.js");
const Dislike = DislikeModel(sequelize, DataTypes);

Post.belongsTo(User, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Like.belongsTo(User, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Like.belongsTo(Post, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Dislike.belongsTo(User, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Dislike.belongsTo(Post, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// 7) On crée un module db que l'on exportera
const initDb = () => {
  // 4) Synchonisation avec bd sql
  return sequelize
    .sync({ force: true })
    .then(() => {
      console.log("Synchonisation BD OK");

      // 6) Création des données via mock-user.js et mock-post.js
      // users.map((user) => {
      //   bcrypt
      //     .hash(user.password, 10) // Hacher mot de passe
      //     .then((hash) => {
      //       User.create({
      //         firstName: user.firstName,
      //         name: user.name,
      //         email: user.email,
      //         password: hash,
      //         imageURL: user.imageURL,
      //       })
      //         .then((user) => console.log(user.toJSON()))
      //         .catch((error) => {
      //           console.log(error);
      //         });
      //     });
      // });

      // posts.map((post) => {
      //   Post.create({
      //     title: post.title,
      //     description: post.description,
      //     likes: post.likes,
      //     dislikes: post.dislikes,
      //     imageURL: post.imageURL,
      //   }).then((post) => console.log(post.toJSON()));
      // });
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  initDb,
  Post,
  User,
};
