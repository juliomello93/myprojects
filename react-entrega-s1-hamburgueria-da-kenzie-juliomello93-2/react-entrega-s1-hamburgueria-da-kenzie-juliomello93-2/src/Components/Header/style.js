import styled from "styled-components"

export const StyledHeader = styled.header`
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

img {
    width: 150px;
 }

div {
  width: 100%;
}

div > input {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
}

.iconSearch {
  position: absolute;
  top: 55px;
  right: 20px;
}

div > button {
  position: absolute;
  top: 48px;
  right: 17px;
  background: #27ae60;
  border: 1px solid #27ae60;
  border-radius: 8px;
  width: 80px;
  height: 30px;
  color: white;
  font-size: 14px;
}


@media (min-width: 768px){
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  div {
    position: relative;
    width: 350px;
  }
  
  div > button {
    position: absolute;
    top: 15px;
    right: 10px;
  }
  
  .iconSearch {
  position: absolute;
  top: 20px;
  right: 20px;
}
}
`

