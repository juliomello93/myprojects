import "./totalMoney.css";

export const TotalMoney = ({ listTransactions }) => {
  const total = listTransactions.reduce((acc, transaction) => {
    return transaction.type === "entrada"
      ? acc + Number(transaction.value)
      : acc - Number(transaction.value);
  }, 0);

  return listTransactions.length > 0 ? (
    <div className="divTotal">
      <div className="containerTotal">
        <h3>Valor Total:</h3>
        <p>R$ {total}</p>
      </div>
      <span>o valor se refere ao saldo</span>
    </div>
  ) : (
    <></>
  );
};
