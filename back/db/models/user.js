module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // firstName: {
    //   type: DataTypes.STRING(50),
    //   allowNull: false,
    //   validate: {
    //     notEmpty: { msg: 'Veuillez renseigner le prénom'},
    //     validateFirstName(value){
    //       const resultat = /^[a-zA-Z\u00C0-\u00FF]*$/.test(value)
    //       if (!resultat) {
    //         throw new Error('Le prénom est invalide, seule les lettres sont acceptées');
    //       }
    //     },
    //     notNull:  { msg: 'Le prénom est obligatoire.'}
    //   }
    // },
    // name: {
    //   type: DataTypes.STRING(50),
    //   allowNull: false,
    //   validate: {
    //     notEmpty: { msg: 'Veuillez renseigner le nom'},
    //     isAlpha:  { msg: 'Le nom ne peut pas contenir de chiffre'},
    //     notNull:  { msg: 'Le nom est obligatoire.'}
    //   }
    // },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: {
        msg: "Cette email est déjà pris.",
      },
      validate: {
        notEmpty: { msg: "Veuillez renseigner l'email" },
        isEmail: { msg: "Le format de l'email est invalide" },
        notNull: { msg: "L'email est obligatoire." },
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Veuillez renseigner un mot de passe" },
        notNull: { msg: "Le mot de passe est obligatoire." },
      },
    },
    // imageURL: {
    //   type: DataTypes.STRING(100),
    //   // validate: {
    //   //   isUrl: { msg: 'Veuillez renseigner une URL pour l\'image d\'un utilisateur'}
    //   // }
    // }
  });
  return User;
};
