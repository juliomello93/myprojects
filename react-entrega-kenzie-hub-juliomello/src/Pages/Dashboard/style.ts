import styled from "styled-components";

export const HeaderDash = styled.div`
    display: flex;
    justify-content: space-between;    
    border-bottom: 1px solid #212529;    
    padding: 20px;
    margin: 0 auto;

    img{
        //margin-left: 10px;
    }

    button {
        width: 60px;
        background: #212529;
        border-radius: 4px;
        border: 1px solid transparent;
        height: 35px;
        text-align: center;        
        cursor: pointer;
        margin-right: 10px;
    }
     

`

export const ContainerInfos = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #212529;
    margin: 0 auto;
    
    h3{
        color: #F8F9FA;
    }

    p {
        color: #868E96;
    }


    @media (min-width: 768px){
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 auto;


    }
`

export const ContainerTechs = styled.div`
    .headerTechs{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding:20px;
        width: 86%;
        margin: 0 auto;
        
        h3{
            color: #F8F9FA;
        }

        .openModal{
            background: #212529;
            border-radius: 4px;
            height: 30px;
            width: 30px;
            border: 1px solid #212529;            
            font-size: 20px;
            cursor: pointer;
        }
    }

    @media (min-width: 768px){
        .headerTechs{
            max-width: 100%;
            width: 95%;
        }

        .openModal{
            margin-right: 20px;
        }
        
    }
`