import "./resumo.css";

export const Resumo = ({ arrayTodos, setListTransactions }) => {
  
  function filterTodos() {
    return setListTransactions(arrayTodos);
  }

  function filterEnter() {
    return setListTransactions(
      arrayTodos.filter((transacao) => transacao.type === "entrada")
    );
  }

  function filterSaida() {
    return setListTransactions(
      arrayTodos.filter((transacao) => transacao.type === "saída")
    );
  }

  return (
    <div className="containerResumo">
      <p>Resumo Financeiro</p>
      <div className="divButtons">
        <button id="btnTodos" onClick={filterTodos}>
          Todos
        </button>
        <button id="btnEntrada" onClick={filterEnter}>
          Entrada
        </button>
        <button id="btnSaida" onClick={filterSaida}>
          Despesas
        </button>
      </div>
    </div>
  );
};
