import React from 'react'
import './Home.css'

// Components
import CardCreatePost from '../../Components/CardCreatePost/CardCreatePost'
import PostsList from '../../Containers/PostList/PostsList'

export default function Home() {
  return (
    <>
      {/* Titre principal de la page d'accueil */}
      <h1 className='home-title'>Nouvelles publications</h1>

      <div className='home-cards'>

        {/* Création d'une publication */}
        <CardCreatePost />

        {/* Affichage des publications */}
        <PostsList />

      </div>
    </>
  )
}

