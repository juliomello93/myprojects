import "./App.css";
import { Infos } from "./components/HomeInformacoes";
import illustration from "./assets/illustration.svg";
import { useState } from "react";
import { Header } from "./components/Header";
import { Cadastro } from "./components/Cadastro";
import { Resumo } from "./components/Resumo";
import { Operacoes } from "./components/Operacoes";
import { TotalMoney } from "./components/ValorTotal";

function App() {
  const [logado, setLogin] = useState(false); //mudar state para TRUE para editar a pagina!

  const [listTransactions, setListTransactions] = useState([]);
  const [arrayTodos, setArrayTodos] = useState([]);

  function addTransaction(description, valor, type) {
    if (description || valor === "") {
      return alert("*Campos obrigatórios");
    } else {
      setListTransactions([
        ...listTransactions,
        {
          description: description,
          value: valor,
          type: type,
        },
      ]);
    }

    setArrayTodos([
      ...listTransactions,
      {
        description: description,
        value: valor,
        type: type,
      },
    ]);
  }

  if (!logado) {
    return (
      <div className="App">
        <Infos setLogin={setLogin} />
        <img src={illustration} className="App-logo" alt="logo" />
      </div>
    );
  } else {
    return (
      <>
        <Header setLogin={setLogin} />
        <div className="containerMain">
          <div className="containerCadastro">
            <Cadastro addTransaction={addTransaction} />
            <TotalMoney listTransactions={listTransactions} />
          </div>
          <div>
            <Resumo
              arrayTodos={arrayTodos}
              setListTransactions={setListTransactions}
            />
            <Operacoes
              listTransactions={listTransactions}
              setListTransactions={setListTransactions}
            />
          </div>
        </div>
      </>
    );
  }
}

export default App;
