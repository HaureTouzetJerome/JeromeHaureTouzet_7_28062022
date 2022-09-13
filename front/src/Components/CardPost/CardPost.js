// Librairies
import React from "react";
import "./CardPost.css";
import axios from "../../config/axios";
import { Link } from "react-router-dom";
import routes from "../../config/routes";

import { useState } from "react";

// Images
import like from "../../images/like.png";
import photoPost from "../../images/photoPost.jpg";

// Fonctions
const deleteClickedHandler = (idPost) => {
  //Suppression d'une publication avec axios
  axios
    .delete("/posts/" + idPost + ".json")
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });

  window.location.reload();
};

const modifyClickedHandler = (post) => {
  //Modification d'une publication avec axios
};

export default function CardPost({ post }) {
  // On affiche l'image de la publication uniquement si elle existe
  let image;
  if (post.imageURL) {
    image = (
      <img
        className="cardPost-photoPost"
        src={post.imageURL}
        alt="photo du post"
      />
    );
  }

  return (
    <div className="cardPost">
      <div className="cardPost-title">
        <h2> {post.title} </h2>
      </div>

      <div className="cardPost-description">
        <p>{post.description}</p>
      </div>

      {image}

      <div className="cardPost-contentLike">
        <div className="footerCard">
          <img className="cardPost-like" src={like} alt="like du post" />
          <p> {post.likes} </p>
          <div className="btnContainer">
            <Link
              to={{
                pathname: routes.MANAGE_POST,
                state: { post: post },
              }}
            >
              <button
                className="btnCard"
                onClick={() => modifyClickedHandler(post)}
              >
                Modifier
              </button>
            </Link>

            <button
              className="btnCard"
              onClick={() => deleteClickedHandler(post.id)}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
