// Model
import Agenda, { AgendaModel } from "../models/AgendaModel.js";

export const schedule = (req, rep) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const formattedDate = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
    days.push(formattedDate);
  }

  const schedules = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  return rep.status(200).send({ days, schedules });
};

export const userAgenda = async (req, rep) => {
  const { email } = req.params;

  if (!email) {
    return rep.status(400).send({ error: "E-mail não informado!" });
  }

  try {
    const agendaItems = await AgendaModel.find({ email: email }).sort({
      date: 1,
      time: 1,
    });

    return rep.status(200).send(agendaItems);
  } catch (error) {
    return rep.status(500).send({ error: "Erro ao buscar agenda do usuário." });
  }
};

export const scheduleTime = async (req, rep) => {
  const schedule = new Agenda(req.body);
  return await schedule.register(rep);
};

export const editScheduleTime = async (req, rep) => {
  const schedule = new Agenda(req.body);
  return await schedule.edit(req, rep);
};

export const deleteScheduleTime = async (req, rep) => {
  const { id } = req.params;

  if (!id || typeof id !== "string") {
    return rep.status(400).send({ error: "Agendamento não informado!" });
  }

  try {
    const agenda = await AgendaModel.findOneAndDelete({ _id: id });

    if (!agenda) {
      return rep.status(400).send({
        message: "Horário não encontrado!",
      });
    }

    return rep.status(200).send({
      message: "Horário cancelado com sucesso!",
    });
  } catch (error) {
    return rep.status(500).send({ error: "Erro ao buscar agenda do usuário." });
  }
};
