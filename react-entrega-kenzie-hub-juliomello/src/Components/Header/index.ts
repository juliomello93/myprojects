import styled from "styled-components";
import { Link } from "react-router-dom";

export const Header = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  align-items: center;
  min-width: 320px;
  max-width: 400px;
  margin: auto;
`;

export const BtnForward = styled(Link)`
  background: #212529;
  border: 1px solid #212529;
  border-radius: 5px;
  padding: 3px;
  width: 70px;
  color: #f8f9fa;
  font-size: 14px;
  text-align: center;
`;
