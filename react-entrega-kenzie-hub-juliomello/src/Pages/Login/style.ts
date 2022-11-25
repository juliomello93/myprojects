import { Link } from "react-router-dom";
import styled from "styled-components";

export const LinkStyled = styled(Link)`
    background: #868E96;
    border: 1.2182px solid #868E96;
    border-radius: 5px;
    text-decoration: none;
    padding: 8px;
    cursor: pointer;
    margin-bottom: 30px;
    color: #F8F9FA;
    width: 250px;

    &:hover{
        text-decoration: none;
        background: #343B41;
        color: #F8F9FA;
    }
`

export const DivBtnCadastrar = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #212529;
gap: 20px;
width: 320px;
margin: auto;

span {
    color: #868E96;
    font-size: 10px;

}

a{
    text-align: center;
}




`
export const HeaderLogin = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 60px;

    img {

    }
`

