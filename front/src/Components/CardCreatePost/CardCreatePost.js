import React from 'react'
import './CardCreatePost.css'

// Components
import ModalWritePost from '../Modal/ModalWritePost'
import photoUser from '../../images/photoUser.png'
import photo from '../../images/icoPhoto.png'

export default function CardCreatePost() {
  return (
    <div className='cardCreatePost'>
      <h2> Création d'une nouvelle publication </h2>
      
      {/* Création d'un post depuis une modale */}
      <div className='cardCreatePost-content'>
        <img className='cardCreatePost-photoUser' src={photoUser} alt="Ma photo de profil"/>
        <ModalWritePost />
      </div>

      {/* Création d'un post uniquement avec une photo */}
      <div className='cardCreatePost-contentBtnPhoto'>
        <button className='cardCreatePost-btnPhoto'>
          <img className='cardCreatePost-icoPhoto' src={photo} alt="icône photo"/>
          <p> photo </p>
        </button>
      </div>

    </div>
  )
}

