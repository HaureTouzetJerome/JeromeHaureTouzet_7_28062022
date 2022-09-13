// Librairie
import React, { useState, useEffect } from "react";

// Composants
import CardPost from "../../Components/CardPost/CardPost";

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts/")
      .then((response) => response.json())
      .then((result) => {
        setPosts(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Eviter le rechargement infini de la page

  return (
    <>
      <h2> Mes publications </h2>
      <div className="PostsList">
        {posts.map((post) => (
          <CardPost key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

export default PostsList;
