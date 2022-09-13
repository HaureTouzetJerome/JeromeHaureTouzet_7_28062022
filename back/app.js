require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const favicon = require ('serve-favicon')
const db = require("./db/index.js")
const postRoutes = require('./routes/post.js')
const userRoutes = require('./routes/user.js')
const path = require('path')
const PORT = process.env.PORT || 3000
const app = express()

// Base de donnée
db.initDb()

// Autorisation d'acces à l'API
app.use(express.json()) // équivalent au middleware bodyParser (transforme le body en objet JSON)
   .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
 })
   .use(favicon(__dirname + '/favicon.ico'))
   .use(morgan('dev'))  // middleware permettant d'afficher les requêtes dans la console
   .use('/images', express.static(path.join(__dirname, 'images'))) // Demander à app de servir le dossier img
   .use('/api/posts', postRoutes)
   .use('/api/auth', userRoutes)
   .use(({res}) => {
      const message = 'Impossible de trouver la ressource demandée, vous pouvez essayer une autre URL'
      res.status(404).json({message})
   })
   .use(express.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
   
   .listen(PORT, () => {
      console.log(`Notre application Node est démarrée sur: http://localhost:${PORT}`)
   })