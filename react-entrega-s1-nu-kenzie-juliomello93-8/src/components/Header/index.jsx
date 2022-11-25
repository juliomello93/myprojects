import NuKenzie from "../../assets/logo.svg";
import "./index.css";

export const Header = ({ setLogin }) => {
  const handleExit = () => {
    setLogin(false);
  };

  return (
    <div className="divHeader">
      <header>
        <img src={NuKenzie} alt="" />
        <button onClick={handleExit} className="btnGeral">
          Inicio
        </button>
      </header>
    </div>
  );
};
