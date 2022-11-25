import { useForm } from "react-hook-form";
import { Form } from "../../Components/Form";
import { DivBtnCadastrar, HeaderLogin, LinkStyled } from "./style";
import Logo from "../../assets/Logo.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

export interface iLogin {
  email: string;
  password: string;
}

export const Login = () => {
  const { onSubmit } = useContext(UserContext);

  const formSchema = yup.object().shape({
    email: yup.string().required("Email obrigatório"),
    password: yup.string().required("Senha Obrigatória"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iLogin>({
    resolver: yupResolver(formSchema),
  });

  return (
    <>
      <HeaderLogin>
        <img src={Logo} alt="" />
      </HeaderLogin>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Digite seu email"
          {...register("email")}
        />
        <p>{errors.email?.message}</p>

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          placeholder="Digite sua senha"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>

        <button type="submit">Entrar</button>
      </Form>

      <DivBtnCadastrar>
        <span>Ainda não possui uma conta ?</span>
        <LinkStyled to={"/cadastro"}>Cadastre-se</LinkStyled>
      </DivBtnCadastrar>
    </>
  );
};
