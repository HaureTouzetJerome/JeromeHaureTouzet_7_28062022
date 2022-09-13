// Librairies
import React, { useState } from "react";
import "./Auth.css";
import axios from "../../config/axios";

// Composant
import Input from "../../Components/UI/Input/Input";
import routes from "../../config/routes";

export default function SignIn(props) {
  // States
  const [inputs, setInputs] = useState({
    email: {
      id: "Titre",
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email",
      },
      value: "",
      label: "Adresse email",
      isValid: false,
      validationRules: {
        required: true,
        email: true,
      },
      errorMessage: "L'adresse email n'est pas valide",
    },
    password: {
      id: "Titre",
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Mot de passe",
      },
      value: "",
      label: "Mot de passe",
      isValid: false,
      validationRules: {
        required: true,
      },
      errorMessage: "Le mot de passe doit être renseigné.",
    },
  });

  // Validité du formulaire
  const [valid, setValid] = useState(false);

  // Fonctions
  const checkValidity = (value, validationRules) => {
    let isValid = true;

    if (validationRules.required) {
      isValid = value.trim() !== "";
    }

    if (validationRules.email) {
      const regEx =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = regEx.test(value);
    }

    return isValid;
  };

  const inputChangedHandler = (event, id) => {
    // Changer la valeur
    const newInputs = { ...inputs };
    newInputs[id].value = event.target.value;

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

  // Inscription
  const registerClickedHandler = (e) => {
    e.preventDefault();
    const user = {
      email: inputs.email.value,
      password: inputs.password.value,
    };

    console.log(user);

    // Connection à l'API
    axios
      .post("auth/signup", user)
      .then((res) => {
        console.log(res.data);
        // Redirection
        //props.history.replace(routes.HOME);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Connexion
  const loginClickedHandler = (e) => {
    e.preventDefault();
    const user = {
      email: inputs.email.value,
      password: inputs.password.value,
    };

    console.log(user);

    // Connection à l'API
    axios
      .post("auth/login", user)
      .then((res) => {
        console.log(res.data);
        // Redirection
        //props.history.replace(routes.HOME);
      })
      .catch((error) => {
        console.log(error);
      });

    // Redirection
    //props.history.push(routes.HOME);
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
  let formSignIn = (
    <div className="signIn-container">
      <form className="signIn-form">
        {/* Les champs du formulaire */}
        {formElementsArray.map((formElement) => (
          // On définit nos props
          <Input
            key={formElement.id}
            value={formElement.config.value}
            type={formElement.config.elementType}
            config={formElement.config.elementConfig}
            changed={(e) => inputChangedHandler(e, formElement.id)}
            isValid={formElement.config.isValid}
            errorMessage={formElement.config.errorMessage}
            name={formElement.config.name}
          />
        ))}

        {/* Bouton Inscription et Connexion */}
        <button
          onClick={registerClickedHandler}
          disabled={!valid}
          className="signIn-button"
        >
          Inscription
        </button>
        <button
          onClick={loginClickedHandler}
          disabled={!valid}
          className="signIn-button"
        >
          Connexion
        </button>
      </form>
    </div>
  );

  return (
    <>
      {/* Titre principal de la page connection */}
      <h1 className="signIn-title">Connectez-vous avec votre adresse e-mail</h1>
      {formSignIn}
    </>
  );
}
