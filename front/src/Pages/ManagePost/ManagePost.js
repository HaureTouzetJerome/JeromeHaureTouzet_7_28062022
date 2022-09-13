// Librairie
import React, { useState } from "react";
import "./ManagePost.css";
import axios from "../../config/axios";

// Composants
import Input from "../../Components/UI/Input/Input";
import routes from "../../config/routes";

export default function AddPost(props) {
  const [inputs, setInputs] = useState({
    // States
    title: {
      id: "Titre",
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Sans titre",
        name: "title",
      },
      value:
        props.location.state && props.location.state.post
          ? props.location.state.post.title
          : "",
      isValid: props.location.state && props.location.state.post ? true : false,
      validationRules: {
        required: true,
      },
      errorMessage: "Le titre est obligatoire",
    },
    description: {
      id: "Description",
      elementType: "textarea",
      elementConfig: {
        placeholder: "Laissez libre cours à votre imagination ici...",
        name: "description",
      },
      value:
        props.location.state && props.location.state.post
          ? props.location.state.post.description
          : "",
      isValid: props.location.state && props.location.state.post ? true : false,
      validationRules: {
        required: true,
      },
      errorMessage: "La description est obligatoire",
    },
    imageURL: {
      id: "Image",
      elementType: "img",
      elementConfig: {
        alt: "",
        name: "imageURL",
      },
      src: "",
      value:
        props.location.state && props.location.state.post
          ? props.location.state.post.imageURL
          : "",
      isValid: true,
    },
    fileUpload: {
      id: "Fichier-Upload",
      elementType: "inputFile",
      elementConfig: {
        id: "file",
        type: "file",
        accept: "image/*",
        name: "image",
      },
      isValid: true,
      validationRules: {
        required: false,
      },
    },
  });

  // Validité du formulaire
  const [valid, setValid] = useState(
    props.location.state && props.location.state.post ? true : false
  );

  const [file, setFile] = useState(null);

  // Fonctions
  const checkValidity = (value, validationRules) => {
    let isValid = true;

    if (validationRules.required) {
      isValid = value.trim() !== "";
    }

    return isValid;
  };

  // ** upload de l'image **
  const handlePicture = (event) => {
    const file = event.target.files[0];

    setFile(file); // Le state ne fonctionne pas

    if (file) {
      // Capturer l'image
      const fileReader = new FileReader();

      // Transformer le fichier en Base64 URL
      fileReader.readAsDataURL(file);

      fileReader.addEventListener("load", () => {
        // on convertit l'image en une chaîne de caractères base64
        const newInputs = { ...inputs };
        newInputs["imageURL"].value = fileReader.result;
        setInputs(newInputs);
      });
    }
  };

  const inputChangedHandler = (event, id) => {
    // Changer la valeur
    const newInputs = { ...inputs };

    if (newInputs[id].id !== "Fichier-Upload") {
      newInputs[id].value = event.target.value;
    } else {
      // Chargement de la photo en prévisualisation
      handlePicture(event);
    }

    // Vérification de la valeur
    newInputs[id].isValid = checkValidity(
      event.target.value,
      newInputs[id].validationRules
    );
    setInputs(newInputs);

    // Vérification du formulaire
    let formIsValid = true;
    for (let input in newInputs) {
      formIsValid = newInputs[input].isValid && formIsValid;
    }
    setValid(formIsValid);
  };

  // Supprimer l'image
  const inputClickedHandler = (id) => {
    // Changer la valeur
    const newInputs = { ...inputs };
    newInputs[id].value = null;
    setInputs(newInputs);
  };

  // ** Envoie du formulaire **
  const formHandler = (event) => {
    event.preventDefault();

    // Format spécifique pour envoyer la publication en base de donnée
    const formData = new FormData();
    formData.append("title", inputs.title.value);
    formData.append("description", inputs.description.value);

    // On récupère le fichier de l'image
    let postFile = document.getElementById("file").files[0];
    console.log("POSTFILE: ", postFile);

    // Si il n'y a pas d'image dans l'url on reset le fichier image
    if (inputs.imageURL.value) {
      formData.append("image", postFile);
    } else {
      formData.set("image", null);
    }

    console.log("TITRE: ", formData.get("title"));
    console.log("DESCRIPTION: ", formData.get("description"));
    console.log("IMAGE: ", formData.get("image"));

    // Envoie du formulaire en base de donnée avec axios
    if (props.location.state && props.location.state.post) {
      axios
        .put("posts/" + props.location.state.post.id, formData)
        .then((res) => {
          console.log(res.data);
          // Redirection
          props.history.replace(routes.HOME);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post("posts", formData)
        .then((res) => {
          console.log(res.data);
          // Redirection
          props.history.replace(routes.HOME);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Variables
  const formElementsArray = [];
  for (let element in inputs) {
    formElementsArray.push({
      id: element,
      config: inputs[element],
    });
  }

  // On retourne du JSX
  let formAddPost = (
    <div className="addPost-container">
      <form className="addPost-formAddPost" onSubmit={(e) => formHandler(e)}>
        {/* Les champs du formulaire */}
        {formElementsArray.map((formElement) => (
          // On définit nos props
          <Input
            key={formElement.id}
            value={formElement.config.value}
            type={formElement.config.elementType}
            config={formElement.config.elementConfig}
            changed={(e) => inputChangedHandler(e, formElement.id)}
            clicked={() => inputClickedHandler(formElement.id)}
            isValid={formElement.config.isValid}
            errorMessage={formElement.config.errorMessage}
            name={formElement.config.name}
          />
        ))}

        {/* Bouton publier */}
        <input
          className="addPost-submitPost"
          type="submit"
          value="Publier"
          disabled={!valid}
        />
      </form>
    </div>
  );

  return (
    <>
      {/* Si on a un state post */}
      {props.location.state && props.location.state.post ? (
        <h1 className="addPost-title">Modifier une publication</h1>
      ) : (
        <h1 className="addPost-title">Création d'une nouvelle publication</h1>
      )}

      {formAddPost}
    </>
  );
}
