// On crée un tableau d'objet user que l'on exporte
const users = [
  {
   id: 1,
   firstName: "Swiffer",
   name: "Gaumond",
   email: "user1@gmail.com",
   password: "123456",
   imageURL: "https://cdn.pixabay.com/photo/2016/07/10/21/47/cat-1508613__340.jpg",
   created: new Date()
  },
  {
    id: 2,
    firstName: "Symba",
    name: "Suarez",
    email: "user2@gmail.com",
    password: "654321",
    imageURL: "https://cdn.pixabay.com/photo/2017/11/06/09/53/tiger-2923186__340.jpg",
    created: new Date()
   }
 ];
   
 module.exports = users