import styled from "styled-components";

export const TotalCart = styled.div`
    background-color: #F5F5F5;
    width: 325px;
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    margin-bottom: 30px;
    border-top: 2px solid #E0E0E0;
    padding: 15px;
    border-radius: 0px 0px 8px 8px;

    .containerTotalValor {
        display: flex;
        justify-content: space-between;
        margin-bottom:10px;
    }

    .containerTotalValor > p {
        font-size: 14px;
        color: #333333;
        font-weight: 600;
    }

    .containerTotalValor > span {
        color: #828282;
        font-weight: 600;
        font-size: 14px;
    }

    button {
        border: 2px solid #E0E0E0;
        border-radius: 8px;
        padding: 15px;
        margin-top: 10px;
        margin-bottom: 10px;
        cursor: pointer;
    }
`