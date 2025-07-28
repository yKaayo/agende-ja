import axios from "axios";

// Type
import type { Schedule } from "../types/type";

const url = "http://localhost:3000";

export const getGenerateSchedules = async () => {
  try {
    const res = await axios.get(`${url}/agenda/`);
    return res.data;
  } catch (err) {
    console.error("Erro ao obter agenda do usuário:", err);

    return null;
  }
};

export const getAllSchedules = async () => {
  try {
    const res = await axios.get(`${url}/agenda/todos`);
    return res.data;
  } catch (err) {
    console.error("Erro ao obter agenda do usuário:", err);

    return null;
  }
};

export const userAgenda = async (email: string) => {
  try {
    const res = await axios.get(`${url}/agenda/${email}`, {
      withCredentials: true,
    });

    const filteredData = res.data.map((item: Schedule) => ({
      id: item._id,
      date: item.date,
      time: item.time,
    }));

    return filteredData;
  } catch (err) {
    console.error("Erro ao obter agenda do usuário:", err);

    return null;
  }
};

export const createUserSchedule = async (user: Schedule) => {
  try {
    const res = await axios.post(`${url}/agenda/scheduleTime`, user, {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.error("Erro ao marcar horário:", err);

    return err?.response?.data;
  }
};

export const editUserSchedule = async (user: Schedule) => {
  const formatData: Schedule = {
    name: user.name,
    email: user.email,
    date: user.date,
    time: user.time,
  };

  try {
    const res = await axios.put(
      `${url}/agenda/scheduleTime/${user._id}`,
      formatData,
      { withCredentials: true }
    );

    return res.data;
  } catch (err) {
    console.error("Erro ao editar horário:", err);

    return err?.response?.data;
  }
};

export const deleteUserSchedule = async (id: string) => {
  try {
    const res = await axios.delete(`${url}/agenda/scheduleTime/${id}`, {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.error("Erro ao cancelar horário:", err);

    return err?.response?.data;
  }
};
