import React from "react";
import Carrinho from "../../Assets/Frame 122.svg";
import { CartTotal } from "../CartTotal/cartotal";
import { CartProducts, ContainerCart } from "./style";

export const Cart = ({ currentSale, removeCart, setCurrentSale }) => {
  return (
    <>
      {currentSale.length === 0 ? (
        <ContainerCart>
          <p>Carrinho de compras</p>
          <img src={Carrinho} alt="" />
        </ContainerCart>
      ) : (
        <>
          <div className="cartRender">
            <ContainerCart>
              <p>Carrinho de compras</p>
            </ContainerCart>
            {currentSale.map((item, index) => (
              <CartProducts key={index}>
                <div className="containerItem">
                  <img src={item.img} alt="" />
                  <div className="containerItemInfos">
                    <h4>{item.name}</h4>
                    <p>{item.category}</p>
                  </div>
                  <div className="containerItemButton">
                    <button onClick={() => removeCart(item)}>Remover</button>
                  </div>
                </div>
              </CartProducts>
            ))}
            <CartTotal
              currentSale={currentSale}
              setCurrentSale={setCurrentSale}
            />
          </div>
        </>
      )}
    </>
  );
};
