import { useState, useEffect } from "react";
import { Api } from "./Components/Axios/axios";
import "./App.css";
import { Cart } from "./Components/Cart/cart";
import { Header } from "./Components/Header/header";
import { Productlist } from "./Components/ProductList/productlist";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentSale, setCurrentSale] = useState([]);

  useEffect(() => {
    Api.get("products")
      .then((res) => {
        setFilteredProducts(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function addToCart(nome, categoria, preco, imagem, id) {
    const findIndex = currentSale.findIndex((produto) => {
      return produto.id === id;
    });
    if (findIndex !== -1) {
      toast.warn("Produto já adicionado", {
        toastId: 1,
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
      return;
    }

    setCurrentSale([
      ...currentSale,
      {
        name: nome,
        category: categoria,
        price: preco,
        img: imagem,
        id: id,
      },
    ]);
  }

  function removeCart(produto) {
    setCurrentSale(currentSale.filter((item) => item !== produto));
  }

  function productsFiltered(pesquisa) {
    const produtosFiltrados = products.filter((produto) => {
      if (
        produto.name.toLowerCase().includes(pesquisa.target.value.toLowerCase())
      ) {
        return produto;
      }
    });
    setFilteredProducts(produtosFiltrados);
  }

  return (
    <div className="App">
      <Header productsFiltered={productsFiltered} />
      <div className="containerMain">
        <ToastContainer />
        <Productlist products={filteredProducts} addToCart={addToCart} />
        <Cart
          currentSale={currentSale}
          removeCart={removeCart}
          setCurrentSale={setCurrentSale}
        />
      </div>
    </div>
  );
}

export default App;
