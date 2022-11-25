import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  gap: 5px;
  background: #212529;
  padding: 20px;
  width: 280px;

  h2 {
    align-self: center;
    font-size: 14px;
  }

  span {
    font-size: 10px;
    color: #868e96;
    text-align: center;
  }

  label {
    text-align: start;
    font-size: 10px;
  }

  input {
    background: #343b41;
    padding: 10px;
    border: 1px solid #343b41;
    border-radius: 5px;
    color: #868e96;
  }

  input:focus {
    background: #343b41;
    color: white;
  }

  select {
    background: #343b41;
    padding: 10px;
    border: 1px solid #343b41;
    border-radius: 5px;
    margin-bottom: 15px;
    color: #868e96;
  }

  button {
    background: #59323f;
    border: 1.2182px solid #59323f;
    border-radius: 5px;
    padding: 10px;
  }

  button:hover {
    background: #ff577f;
    cursor: pointer;
  }

  p {
    margin-top: -8px;
    font-size: 11px;
    text-align: start;
    color: red;
    height: 15px;
  }
`;
