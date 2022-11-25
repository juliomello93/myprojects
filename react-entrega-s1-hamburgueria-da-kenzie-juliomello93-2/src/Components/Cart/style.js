import styled from "styled-components";

export const ContainerCart = styled.div`
    display: flex;
    flex-direction: column;
    background: #27AE60;
    width: 325px;    
    margin-left: 15px;
    margin-top: 20px;
    border-radius: 8px 8px 0px 0px;
    height: 65px;    

    
p {    
   padding: 20px;
   color: white;
   font-weight: 700;
    font-size: 18px;
}



@media (min-width: 768px) {  
   
}

`

export const CartProducts = styled.div`
    background: #F5F5F5;    
    width: 325px;
    margin-left: 15px;
    

    .containerItem{
        display: flex;
        flex-direction: row;
        padding:15px;
    }

    .containerItem > img {
        max-width: 70px;
        background: #E0E0E0;
        border-radius: 5px;
    }

    .containerItemInfos {
        margin-left: 10px;
        min-width: 150px;
    }

    .containerItemInfos > h4 {
        font-size: 16px;
    }
    .containerItemInfos > p{
        margin-top: 20px;
        font-size: 12px;
        color: #828282;
    }

    .containerItemButton > button{
        background-color: transparent;
        color: #BDBDBD;
        border: none;

        &:hover{
            cursor: pointer;
            color: #333333;
        }
    }

    @media (min-width: 560px) {
        display: flex;
        flex-direction: column;
        height: auto;
        margin-right: 20px;        
        
    }
`

