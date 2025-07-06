import axios from "axios";

// Type
import type { Schedule } from "../types/type";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export type LoginData = Pick<RegisterData, "email" | "password">;

const url = "http://localhost:3000";

// User
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

// Agenda
export const userAgenda = async (email: string) => {
  try {
    const res = await axios.get(`${url}/agenda/${email}`);

    return res.data;
  } catch (err) {
    console.error("Erro ao obter agenda do usuário:", err);

    return null;
  }
};

export const createUserSchedule = async (user: Schedule) => {
  try {
    console.log(user);
    
    const res = await axios.post(`${url}/agenda/scheduleTime`, user);

    return res.data;
  } catch (err) {
    console.error("Erro ao marcar horário:", err);

    return err?.response?.data;
  }
};
