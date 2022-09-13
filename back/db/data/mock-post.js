// On crée un tableau d'objet post que l'on exporte
const posts = [
  {
   id: 1,
   title: "Mon premier post",
   description: "Voici la description du premier post",
   likes: 0,
   dislikes: 0,
   imageURL: "https://cdn.pixabay.com/photo/2016/05/01/17/24/lake-1365288__340.jpg",
   created: new Date()
  },
  {
    id: 2,
    title: "Mon deuxième post",
    description: "Voici la description du deuxième post",
    likes: 0,
    dislikes: 0,
    imageURL: "https://cdn.pixabay.com/photo/2020/05/31/04/36/investment-5241253__340.jpg",
    created: new Date()
   }
 ];
   
 module.exports = posts