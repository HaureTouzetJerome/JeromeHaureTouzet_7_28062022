const { User } = require('../db/')
const fs = require('fs')
const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)
const { uploadErrors } = require('../utils/errors')

module.exports.uploadImageUser = async(req, res) => {
  // Vérification sur le format et la taille de l'image
  try {
    if( req.file.detectedMimeType !== "image/jpg" &&
        req.file.detectedMimeType !== "image/jpeg" &&
        req.file.detectedMimeType !== "image/png"
    )
      throw Error('invalid file')
    
    if(req.file.size > 500000) throw Error('max size')  
  } catch(error) {
    const errors = uploadErrors(error)
    return  res.status(201).json(errors)
  }

  const fileName = req.body.firstName + '_' + req.body.name + '.jpg'

  // Sauvegarde de l'image dans le dossier 'images' du serveur
  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../images/${fileName}`
    )
  )

  // Mettre à jour imageURL dans la BD avec le chemin relatif au dossier: 'images'
  try{
    await User.update({ imageURL: "./images/" + fileName }, {
      where: {
        id: req.body.id 
      }
    })
    .then(() => res.status(201).json({ message: 'Utilisateur modifié !' }))
    .catch(error => res.status(400).json({ error }))
  } catch (error){
    return res.status(500).send({ message: error })
  }
}





























// const { User } = require('../db/')
// const fs = require('fs')
// const { promisify } = require('util')
// const { uploadErrors } = require('../utils/errors')
// const pipeline = promisify(require('stream').pipeline)

// // Enregistrer l'image du user dans le dossier: 'images'
// module.exports.uploadImageUser = async (req, res) => {
//   try{
//     if(
//       req.file.detectedMimeType != "image/jpg" &&
//       req.file.detectedMimeType != "image/jpeg" &&
//       req.file.detectedMimeType != "image/png"
//     )
//       throw Error("invalid file")
    
//     if (req.file.size > 500000) throw Error("max size")
//   } catch(error){
//     const errors = uploadErrors(error)
//     return res.status(201).json( {errors} )
//   }

//   const fileName = req.body.firstName + '_' + req.body.name + ".jpg"

//   await pipeline(
//     req.file.stream,
//     fs.createWriteStream(
//       `${__dirname}/../images/${fileName}`
//     )
//   )
  
//   // Mettre à jour imageURL avec le chemin relatif au dossier: 'images'
//   try{
//     await User.update({ imageURL: "./images/" + fileName }, {
//       where: {
//         id: req.body.id 
//       }
//     })
//     .then(() => res.status(201).json({ message: 'Utilisateur modifié !' }))
//     .catch(error => res.status(400).json({ error }))
//   } catch (error){
//     return res.status(500).send({ message: error })
//   }
// }
