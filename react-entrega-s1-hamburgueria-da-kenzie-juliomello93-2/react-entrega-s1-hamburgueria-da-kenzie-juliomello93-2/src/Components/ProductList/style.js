import styled from "styled-components";

export const ContainerLista = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 15px;
    gap: 20px;
    overflow: auto;

li {
    min-width: 253px;    
    border: 2px solid #E0E0E0;
    border-radius: 5px;
}

li > img {
    min-width: 100%;
    max-height: 180px;
    background-color: #F5F5F5;
    object-fit: cover ;
}

li > h3 {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 18px;
    color: #333333;

}

li > p {
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    font-size: 12px;
    color: #828282
}

li > span {    
    margin-left: 10px;
    font-size: 14px;
    color: #27AE60;
}

li > div > button {
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px;
    background: #27AE60;
    border: 2px solid #27AE60;
    border-radius: 8px;
    color: white;
    cursor: pointer;
}

@media (min-width: 560px){
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;    
}

@media (min-width: 768px) {
    
}

@media (min-width: 1000px) {
    
}


`