import React from "react";
import Logo from "../../Assets/logo-burguer.png";
import { StyledHeader } from "./style";
import { AiOutlineSearch } from "react-icons/ai";

//import "./style.css";

export const Header = ({ productsFiltered }) => {
  return (
    <StyledHeader>
      <img src={Logo} alt="" />
      <div>
        <input
          onChange={productsFiltered}
          type="text"
          placeholder="Digitar Pesquisa"
        />
        <AiOutlineSearch className="iconSearch" />
      </div>
    </StyledHeader>
  );
};
