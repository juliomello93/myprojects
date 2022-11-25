import "./operacao.css";
import NoCard from "../../assets/NoCard.png";
import Trash from "../../assets/ButtonTrash.png";

export const Operacoes = ({ listTransactions, setListTransactions }) => {
  function handleRemove(transacao) {
    setListTransactions(listTransactions.filter((t) => t !== transacao));
  }

  return listTransactions.length > 0 ? (
    listTransactions.map((transacao, index) =>
      transacao.type === "entrada" ? (
        <div className="card" key={index}>
          <div className="cardInformation">
            <p>{transacao.description}</p>
            <span>R$ {transacao.value},00</span>
            <button onClick={() => handleRemove(transacao)}>
              <img src={Trash} alt="" />
            </button>
          </div>
          <span>{transacao.type}</span>
        </div>
      ) : (
        <div className="cardOut" key={index}>
          <div className="cardInformation">
            <p>{transacao.description}</p>
            <span>R$ {transacao.value},00</span>
            <button onClick={() => handleRemove(transacao)}>
              <img src={Trash} alt="" />
            </button>
          </div>
          <span>{transacao.type}</span>
        </div>
      )
    )
  ) : (
    <div className="containerImg">
      <img src={NoCard} alt="" />
      <img src={NoCard} alt="" />
      <img src={NoCard} alt="" />
    </div>
  );
};
