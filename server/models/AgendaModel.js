import mongoose from "mongoose";
import validator from "validator";

const AgendaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

export const AgendaModel = mongoose.model("Agenda", AgendaSchema);

class Agenda {
  constructor(body) {
    this.body = body;
    this.agendaItem = null;
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
        err = false;
      }
    }

    this.body = {
      name: this.body.name,
      email: this.body.email,
      date: this.body.date,
      time: this.body.time,
    };
  }

  validate(rep) {
    if (!validator.isEmail(this.body.email))
      return rep.status(400).send({ error: "E-mail inválido" });

    if (
      !validator.isDate(this.body.date, {
        format: "DD/MM/YYYY",
      })
    ) {
      return rep.status(400).send({ error: "Data em formato inválido!" });
    }

    if (!validator.isTime(this.body.time)) {
      return rep.status(400).send({ error: "Horas em formato inválido!" });
    }

    return true;
  }

  async register(rep) {
    const validateAgendaItem = this.validate(rep);
    if (validateAgendaItem !== true)
      return rep.status(400).send({ error: validateAgendaItem });

    try {
      this.agendaItem = await RegisterModel.create(this.body);
      rep.status(201).send({
        message: `Horário marcado para o dia ${this.body.date} ás ${this.body.time} horas com sucesso!`,
      });
    } catch (err) {
      throw new Error("Erro ao marcar horário!", 500);
    }
  }
}

export default Agenda;
