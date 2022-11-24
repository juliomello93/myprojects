import { TotalCart } from "./style";

export const CartTotal = ({ currentSale, setCurrentSale }) => {
  //const [cartTotal, setCartTotal] = useState(0)
  console.log(currentSale);
  const somaTotal = currentSale.reduce((acc, valoratual) => {
    return acc + valoratual.price;
  }, 0);

  return (
    <TotalCart>
      <div className="containerTotalValor">
        <p>Total</p>
        <span>R${somaTotal.toFixed(2)}</span>
      </div>
      <button onClick={() => setCurrentSale([])}>Remover Todos</button>
    </TotalCart>
  );
};
