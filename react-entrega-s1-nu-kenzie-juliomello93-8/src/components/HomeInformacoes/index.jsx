import NuKenzie from "../../assets/NuKenzie.svg";
import "./index.css";

export const Infos = ({ setLogin }) => {
  const handleLogin = () => {
    setLogin(true);
  };

  return (
    <div className="containerLogin">
      <img src={NuKenzie} alt="" />
      <h2>Centralize o controle das suas finanças</h2>
      <span>De forma rápida e segura!</span>
      <button onClick={handleLogin} type="button">
        Iniciar
      </button>
    </div>
  );
};
