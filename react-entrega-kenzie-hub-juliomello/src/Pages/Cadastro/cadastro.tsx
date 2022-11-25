import { useForm } from "react-hook-form";
import { Form } from "../../Components/Form";
import { BtnForward, Header } from "../../Components/Header";
import Logo from "../../assets/Logo.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./style.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

export interface iRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio: string;
  contact: string;
  course_module: string;
}

export const Home = () => {
  const { handleRegister } = useContext(UserContext);

  const formSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    password: yup
      .string()
      .required("Senha Obrigatória")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\.*])(?=.{8,})/,
        "8 dígitos, letra Maiúscula, letra Minúscula e Caractere especial"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas não conferem")
      .required("Confirmar senha obrigatório"),
    bio: yup.string().required("Bio obrigatória"),
    contact: yup.string().required("Contato obrigatório"),
    course_module: yup.string().required("Módulo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iRegister>({
    resolver: yupResolver(formSchema),
  });

  return (
    <>
      <Header>
        <img src={Logo} alt="" />
        <BtnForward to={"/"}>Voltar</BtnForward>
      </Header>
      <div className="containerForm">
        <Form onSubmit={handleSubmit(handleRegister)}>
          <h2>Crie sua conta</h2>
          <span>Rápido e grátis, vamos nessa</span>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            placeholder="Digite aqui seu nome"
            {...register("name")}
          />
          <p>{errors.name?.message}</p>

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Digite aqui seu email"
            {...register("email")}
          />
          <p>{errors.email?.message}</p>

          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            placeholder="Digite aqui sua senha"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>

          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <input
            id="confirmarSenha"
            type="password"
            placeholder="Confirmar senha"
            {...register("confirmPassword")}
          />
          <p>{errors.confirmPassword?.message}</p>

          <label htmlFor="bio">Bio</label>
          <input
            id="bio"
            type="text"
            placeholder="Fale sobre você"
            {...register("bio")}
          />
          <p>{errors.bio?.message}</p>

          <label htmlFor="contato">Contato</label>
          <input
            id="contato"
            type="text"
            placeholder="Opção de contato"
            {...register("contact")}
          />
          <p>{errors.contact?.message}</p>

          <label htmlFor="modulo">Selecionar Módulo</label>
          <select id="modulo" {...register("course_module")}>
            <option value="Primeiro módulo (Introdução ao Frontend)">
              Primeiro módulo (Introdução ao Frontend)
            </option>
            <option value="Segundo módulo (Frontend Avançado)">
              Segundo módulo (Frontend Avançado)
            </option>
            <option value="Terceiro módulo (Introdução ao Backend)">
              Terceiro módulo (Introdução ao Backend)
            </option>
            <option value="Quarto módulo (Backend Avançado)">
              Quarto módulo (Backend Avançado)
            </option>
          </select>
          <p>{errors.course_module?.message}</p>

          <button type="submit">Cadastrar</button>
        </Form>
      </div>
    </>
  );
};
