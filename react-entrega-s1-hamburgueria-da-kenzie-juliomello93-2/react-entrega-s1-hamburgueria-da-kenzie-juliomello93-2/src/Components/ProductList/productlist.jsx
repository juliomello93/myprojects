import React from "react";
import { ContainerLista } from "./style";

export const Productlist = ({ products, addToCart }) => {
  return (
    <div>
      <ContainerLista>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.img} alt="" />
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <span>R$ {product.price}</span>
            <div>
              <button
                id={product.id}
                onClick={() => {
                  addToCart(
                    product.name,
                    product.category,
                    product.price,
                    product.img,
                    product.id
                  );
                }}
              >
                Adicionar
              </button>
            </div>
          </li>
        ))}
      </ContainerLista>
    </div>
  );
};
