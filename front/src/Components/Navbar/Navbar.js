// Importation des Hooks: useState et useEffect
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import LogoGroupomania from "./images/logoGroupomania.svg";
import { Link } from 'react-router-dom';
import routes from "../../config/routes";

export default function Navbar() {
  // Ce state permet de gérer l'affichage du menu au clic du bouton burger
  const [toggleMenu, setToggleMenu] = useState(false);

  // Ce state permet de gérer l'affichage de la navigation selon la largeur de l'écran
  // car par défaut elle est masquée
  const [largeur, setLargeur] = useState(window.innerWidth);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    // Fonction qui modifie la largeur au state largeur
    const changeWidth = () => {
      setLargeur(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <nav>
      <img className="nav-logo" src={LogoGroupomania} alt="logo Groupomania" />
      {/* Lorque l'on clique ou que la largeur est inférieur à 500px,
          on "masque ou affiche" le contenu du ul*/}
      {(toggleMenu || largeur > 500) && (
        <ul className="nav-liste">
          <li>
            <Link className="nav-items" to={routes.HOME}>Accueil</Link>
          </li>
          <li>
            <Link className="nav-items" to={routes.MANAGE_POST}>Ajouter</Link>
          </li>
          <li>
            <Link className="nav-items" to={routes.AUTH}>Se connecter</Link>
          </li>
        </ul>
      )}

      <button onClick={toggleNav} className="nav-btn">
        <i className="fa-solid fa-bars"></i>
      </button>
    </nav>
  );
}
