import { createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { iRegister } from "../../Pages/Cadastro/cadastro";
import { iAxiosGet } from "../../Pages/Dashboard";
import { iLogin } from "../../Pages/Login";
import { Api } from "../../Services/Axios/Api";

interface iUserContextProps {
  children: ReactNode;
}

interface iUserContext {
  onSubmit(data: iLogin): void;
  handleRegister(data: iRegister): Promise<void>;
}

export interface iAxiosGetLogin {
  token: string;
  user: iAxiosGet;
}

export const UserContext = createContext<iUserContext>({} as iUserContext);

export const UserProvider = ({ children }: iUserContextProps) => {
  const navigate = useNavigate();

  function onSubmit(data: iLogin): void {
    Api.post<iAxiosGetLogin>("/sessions", data)
      .then((res) => {
        localStorage.setItem("@token:KenzieHub", res.data.token);
        localStorage.setItem("@userID", res.data.user.id);
        toast.success("Login realizado com sucesso", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(`${err}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  async function handleRegister(data: iRegister): Promise<void> {
    await Api.post("/users", data)
      .then((res) => {
        toast.success("Usuário cadastrado com sucesso", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/");
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  return (
    <UserContext.Provider value={{ onSubmit, handleRegister }}>
      {children}
    </UserContext.Provider>
  );
};
