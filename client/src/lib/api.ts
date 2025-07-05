import axios from "axios";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

const url = "http://localhost:3000";

export const verifyLogged = async () => {
  const res = await axios.get(`${url}/autenticar`, { withCredentials: true });

  return res.data;
};

export const registerUser = async (data: RegisterData) => {
  try {
    const res = await axios.post(`${url}/autenticar/cadastrar`, data);
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
