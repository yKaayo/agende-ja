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

const url = "http://127.0.0.1:3000";

export const verifyLogged = async () => {
  const res = await axios.get(url + "/home");
  console.log(res);

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
  console.log(data);

  try {
    const res = await axios.post(`${url}/autenticar/entrar`, data);
    return res.data;
  } catch (err) {
    console.error("Erro ao entrar:", err);
    return err?.response?.data;
  }
};
