import { useState } from "react";
import "./index.css";

export const Cadastro = ({ addTransaction }) => {
  const [description, setDescription] = useState("");
  const [valor, setValor] = useState(0);
  const [type, setType] = useState("entrada");

  return (
    <div className="containerForm">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTransaction(description, valor, type);
          setDescription("");
          setValor("");
        }}
      >
        <p>Descrição</p>
        <input
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          value={description}
          type="text"
          placeholder="* Digite aqui sua descrição"
        />
        <span>Ex: Compra de Roupas</span>
        <div className="container">
          <div className="containerValor">
            <p>Valor</p>
            <input
              onChange={(event) => {
                setValor(event.target.value);
              }}
              value={valor}
              type="number"
              placeholder="* R$"
            />
          </div>
          <div className="containerSelect">
            <p>Tipo de Valor</p>
            <select
              onChange={(event) => {
                setType(event.target.value);
              }}
              value={type}
              name=""
              id=""
            >
              <option value="entrada">Entrada</option>
              <option value="saída">Deposito</option>
            </select>
          </div>
        </div>
        <button type="submit">Inserir Valor</button>
      </form>
    </div>
  );
};
