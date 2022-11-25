import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RoutesMain } from "./routes";
import { UserProvider } from "./contexts/userContext";
import { ModalProvider } from "./contexts/TechContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <ModalProvider>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <RoutesMain />
        </ModalProvider>
      </UserProvider>
    </div>
  );
}

export default App;
