module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Veuillez renseigner le titre'},
        notNull:  { msg: 'Le titre est obligatoires.'}
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'La description est obligatoire.'}
      }
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt:   { msg: 'Utilisez uniquement des entiers pour les likes.'},
      },
      defaultValue: 0
    },
    dislikes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt:   { msg: 'Utilisez uniquement des entiers pour les dislikes.'},
      },
      defaultValue: 0
    },
    imageURL: {
      type: DataTypes.STRING(100),
      allowNull: true
      // validate: {
      //   isUrl:   { msg: 'Veuillez renseigner une URL pour l\'image d\'un post'}
      // }
    }
  }
)}