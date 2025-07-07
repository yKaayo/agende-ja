import axios from "axios";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export type LoginData = Pick<RegisterData, "email" | "password">;

const url = "http://localhost:3000";

export const verifyLogged = async () => {
  try {
    const res = await axios.get(`${url}/autenticar`, { withCredentials: true });

    return res.data;
  } catch (err) {
    console.error("Erro ao verificar autenticação:", err);

    return { authenticated: false, user: null };
  }
};

export const registerUser = async (data: RegisterData) => {
  try {
    const res = await axios.post(`${url}/autenticar/cadastrar`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Erro ao cadastrar:", err);
    return err?.response?.data;
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const res = await axios.post(`${url}/autenticar/entrar`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Erro ao entrar:", err);
    return err?.response?.data;
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.get(`${url}/autenticar/sair`, {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.error("Erro ao sair:", err);
    return err?.response?.data;
  }
};
