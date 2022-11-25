import { useContext, useEffect, useState } from "react";
import Logo from "../../assets/Logo.svg";
import { ContainerInfos, ContainerTechs, HeaderDash } from "./style";
import { Api } from "../../Services/Axios/Api.js";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { ModalContext } from "../../contexts/TechContext";
import "./style.css";
import { Form } from "../../Components/Form";
import { Modal } from "../../Components/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import "animate.css";
import { toast } from "react-toastify";

interface iTechs {
  title: string;
  status?: string;
}

interface iTechsComplete {
  id: string;
  title: string;
  status?: string;
}

interface iUserState {
  name: string;
  course_module: string;
}

export interface iAxiosGet {
  avatar_url: null | string;
  bio: string;
  contact: string;
  course_module: string;
  created_at: string;
  email: string;
  id: string;
  name: string;
  techs: iTechsArray[];
  updated_at: string;
  works: [];
}

interface iTechsArray {
  created_at: string;
  id: string;
  status: string;
  title: string;
  updated_at: string;
}

interface iAxiosUserId {
  id: string;
}

interface iAxiosPostTech {
  created_at: string;
  id: string;
  status: string;
  title: string;
  updated_at: string;
  user: iAxiosUserId;
}

export const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("@token:KenzieHub");
  const [user, setUser] = useState({} as iUserState);
  const [techs, setTechs] = useState([] as iTechsComplete[]);
  const { isModalOpen, openModal, closeModal } = useContext(ModalContext);

  const formSchema = yup.object().shape({
    title: yup.string().required("Nome obrigatório"),
  });

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<iTechs>({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    Api.get<iAxiosGet>("/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setUser(res.data);
        setTechs(res.data.techs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function exitPage() {
    localStorage.clear();
    navigate("/");
  }

  function onSubmit(data: iTechs) {
    Api.post<iAxiosPostTech>("/users/techs", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        setTechs((previousTech) => {
          toast.success("Tecnologia cadastrada!", {
            toastId: 1,
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return [...previousTech, res.data];
        });
        closeModal(), resetField("title");
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

  function excluirTechs(id: string) {
    Api.delete(`/users/techs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        toast.success("Tecnologia removida!", {
          toastId: 1,
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const filtro = techs.filter((tech) => id !== tech.id);
        setTechs(filtro);
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

  return token ? (
    <>
      <HeaderDash>
        <img src={Logo} alt="" />
        <button onClick={exitPage}>Sair</button>
      </HeaderDash>
      <ContainerInfos>
        <h3>Olá, {user.name}</h3>
        <p>{user.course_module}</p>
      </ContainerInfos>
      <ContainerTechs>
        <div className="headerTechs">
          <h3>Tecnologias</h3>
          <button onClick={openModal} className="openModal">
            +
          </button>
          {isModalOpen ? (
            <Modal className="animate__fadeInRight">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">Nome</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Digite a tecnologia"
                  {...register("title")}
                />
                <p>{errors.title?.message}</p>
                <label htmlFor="status">Selecionar status</label>
                <select id="status" {...register("status")}>
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>

                <button type="submit">Cadastrar Tecnologia</button>
              </Form>
            </Modal>
          ) : (
            <></>
          )}
        </div>

        {techs.length > 0 ? (
          <ul>
            {techs.map((tech) => (
              <li key={tech.id}>
                <p>{tech.title}</p>
                <div>
                  <span>{tech.status}</span>
                  <button onClick={() => excluirTechs(tech.id)}>
                    <BsTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </ContainerTechs>
    </>
  ) : (
    <>{window.location.replace("/")}</>
  );
};
