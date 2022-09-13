import React, { useState } from "react";
import "./ModalWritePost.css";

export default function () {
  // Par défaut la modal n'est pas visible
  const [modal, setModal] = useState(false);

  // Au clic de btn-modal, on affiche la modal
  const toggleModal = () => {
    setModal(!modal);
  };

  // Focus

  return (
    <div>
      <button onClick={toggleModal} className="modal-btnWrite">
        Écrivez quelques chose... 
      </button>

      {modal && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-content">
              <h2>Créer une publication</h2>
              <textarea autofocus="" placeholder="Écrivez quelques chose..." className="modal-createPost">

              </textarea>
              {/* <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                est libero facilis cum quo, odio veniam perspiciatis provident
                tempora voluptatibus, omnis ex quis ipsam laudantium ullam totam
                eum suscipit nobis exercitationem ea voluptate quod voluptas
                dolorum? Eius blanditiis a ipsum eum molestiae repellendus quo
                molestias, eaque dolor accusamus dolore veniam.
              </p> */}
              <button onClick={toggleModal} className="close-modal">
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
