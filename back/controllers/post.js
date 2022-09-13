// Modèle sequelize
const { Post } = require("../db/index.js");

// Importer	fileSystem de Node
const fs = require("fs");

// Validateur sequelize
const { ValidationError, UniqueConstraintError } = require("sequelize");

exports.getAllPosts = (req, res) => {
  Post.findAll()
    .then((posts) => {
      const message = "La liste des posts a bien été récupérée.";
      res.status(200).json({ message, data: posts });
    })
    .catch((error) => {
      const message = "La liste des posts n'a pas pu être récupérée.";
      res.status(500).json({ message, data: error });
    });
};

exports.getOnePost = (req, res) => {
  Post.findByPk(req.params.id)
    .then((post) => {
      if (post === null) {
        const message = "Le post demandé n'existe pas.";
        return res.status(404).json({ message });
      }
      const message = "Un post a bien été trouvé.";
      res.status(200).json({ message, data: post });
    })
    .catch((error) => {
      const message = "Le post n'a pas pu être récupérée.";
      res.status(500).json({ message, data: error });
    });
};

exports.createPost = (req, res) => {
  const post = req.file
    ? {
        ...req.body,
        imageURL: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...req.body,
      };

  Post.create(post)
    .then((_post) => {
      const message = `Le post ${req.body.title} a bien été crée.`;
      res.status(201).json({ message, data: _post });
    })
    .catch((error) => {
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = "Le post n'a pas pu être crée.";
      res.status(500).json({ message, data: error });
    });
};

exports.modifyPost = (req, res) => {
  Post.findByPk(req.params.id)
    .then((post) => {
      console.log("@@ IMAGE URL @@ == ", post.imageURL);
      console.log("@@ FILE IMAGE @@ == ", req.file);

      let newPost = {
        ...req.body,
        imageURL: req.file
          ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          : null,
      };

      // Modification Post
      const id = req.params.id;

      if (post.imageURL) {
        // Récupérer nom de l'image à supprimer
        const filename = post.imageURL.split("/images/")[1];

        // Supprimer l'image
        fs.unlink(`images/${filename}`, () => {
          Post.update(newPost, {
            where: { id: id },
          }).then((_) => {
            return Post.findByPk(id).then((post) => {
              if (post === null) {
                const message = "Le post demandé n'existe pas.";
                return res.status(404).json({ message });
              }
              const message = `Le post ${post.title} a bien été modifié.`;
              console.log("@@@ POST: ", post);
              res.status(200).json({ message, data: post });
            });
          });
        });
      } else {
        Post.update(newPost, {
          where: { id: id },
        }).then((_) => {
          return Post.findByPk(id).then((post) => {
            if (post === null) {
              const message = "Le post demandé n'existe pas.";
              return res.status(404).json({ message });
            }
            const message = `Le post ${post.title} a bien été modifié.`;
            console.log("@@@ POST: ", post);
            res.status(200).json({ message, data: post });
          });
        });
      }
    })
    .catch((error) => {
      const message = "Le post n'a pas pu être modifié.";
      res.status(500).json({ message, data: error });
    });
};

exports.deletePost = (req, res) => {
  Post.findByPk(req.params.id)
    .then((post) => {
      const postDeleted = post;

      // Si il y a une image
      if (post.imageURL) {
        // Accéder au system de fichier
        const filename = post.imageURL.split("/images/")[1]; // Récupérer nom de l'image à supprimer

        // Supprimer l'image
        fs.unlink(`images/${filename}`, () => {
          // Suppression Post
          return Post.destroy({
            where: { id: post.id },
          }).then((_) => {
            const message = `Le post avec l'identifiant n°${postDeleted.id} a bien été supprimé.`;
            res.status(200).json({ message, data: postDeleted });
          });
        });
      } else {
        // Suppression Post
        return Post.destroy({
          where: { id: post.id },
        }).then((_) => {
          const message = `Le post avec l'identifiant n°${postDeleted.id} a bien été supprimé.`;
          res.status(200).json({ message, data: postDeleted });
        });
      }
    })
    .catch((error) => {
      const message = "Le post n'a pas pu être supprimé.";
      res.status(500).json({ message, data: error });
    });
};

exports.likePost = async (req, res) => {
  const like = req.body.like;
  const userId = req.body.userId;
  const postId = req.params.id;

  try{
    const post = await Post.findOne({ _id: postId });

    // CAS NUMERO 1:    User SOUHAITE LIKER
    if (like == 1){

      // User N'A JAMAIS LIKER
      if(!post.usersLiked.includes(userId)){
        Post.updateOne(
          { _id:   postId},
          { 
            $inc:  { likes: 1 },
            $push: { usersLiked: userId }
          }
        )
        .then(() => res.status(200).json({ message: 'Post liker'}))
        .catch(error => res.status(400).json({ error }));
      }
    }
    // CAS NUMERO 2:    User SOUHAITE ANNULER soit son like
    else{
      if(post.usersLiked.includes(userId)){
        Post.updateOne(
          { _id:   postId},
          { $inc:  { likes: -1 },
            $pull: { usersLiked: userId }
          }
        )
        .then(() => res.status(200).json({ message: 'Post liker annulée'}))
        .catch(error => res.status(400).json({ error }));
      }
    }
  }
  catch(error){
    res.status(500).json(post);
  }
};
