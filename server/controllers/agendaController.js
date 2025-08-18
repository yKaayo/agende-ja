// Model
import Agenda, { AgendaModel } from "../models/AgendaModel.js";

export const generateSchedule = async (req, rep) => {
  try {
    const today = new Date();

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

    const getYesterday = () => {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    };

    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }

    const agendaItems = await AgendaModel.find();

    const formatDateToISO = (ptBR) => {
      const [day, month, year] = ptBR.split("/");
      return new Date(`${year}-${month}-${day}`);
    };

    const lateAgendaItems = agendaItems.filter((item) => {
      const itemDate = formatDateToISO(item.date);
      return itemDate <= getYesterday();
    });

    const deleteAgendaItem = async (id) => {
      await AgendaModel.deleteOne({ _id: id });
    };

    lateAgendaItems.map((item) => deleteAgendaItem(item._id));

    const available = days.map((day) => {
      const formattedDay = day.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      const schedulesOfTheDay = agendaItems
        .filter((item) => {
          return item.date === formattedDay;
        })
        .map((item) => item.time);

      const availableTimes = schedules.filter(
        (hora) => !schedulesOfTheDay.includes(hora)
      );

      return {
        date: formattedDay,
        availableTimes,
      };
    });

    return rep.status(200).send({
      schedule: available,
    });
  } catch (error) {
    console.error(error);
    return rep.status(500).send({ error: "Erro ao gerar agenda." });
  }
};

export const allSchedules = async (req, rep) => {
  try {
    const agendaItems = await AgendaModel.find().sort({
      date: 1,
      time: 1,
    });

    const userAgenda = [];
    agendaItems.forEach((item) => {
      const { _id, date, time } = item;
      userAgenda.push({ _id, date, time });
    });

    return rep.status(200).send(userAgenda);
  } catch (error) {
    return rep.status(500).send({ error: "Erro ao buscar agenda do usuário." });
  }
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

    const userAgenda = [];
    agendaItems.forEach((item) => {
      const { _id, date, time } = item;
      userAgenda.push({ _id, date, time });
    });

    return rep.status(200).send(userAgenda);
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
  console.log(id);

  if (!id || typeof id !== "string") {
    return rep.status(400).send({ error: "Agendamento não informado!" });
  }

  try {
    const agenda = await AgendaModel.findOneAndDelete({ _id: id });

    if (!agenda) {
      return rep.status(404).send({ error: "Horário não encontrado!" });
    }

    return rep.status(200).send({ message: "Horário cancelado com sucesso!" });
  } catch (error) {
    return rep.status(500).send({ error: "Erro ao cancelar o horário." });
  }
};
