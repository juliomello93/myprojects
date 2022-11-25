import { ReactNode, useContext } from "react";
import { ModalContext } from "../../contexts/TechContext";
import "./style.css";

interface iModal {
  className: string;
  children: ReactNode;
}

export const Modal = ({ children }: iModal) => {
  const { closeModal } = useContext(ModalContext);

  return (
    <div className="modal">
      <div className="container">
        <div className="headerModal">
          <span>Cadastrar Tecnologia</span>
          <button onClick={closeModal} className="closeModal">
            X
          </button>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};
