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

    console.log("Deu certo");
    

    try {
      this.agendaItem = await AgendaModel.create(this.body);

      rep.status(201).send({
        message: `Horário marcado para o dia ${this.body.date} ás ${this.body.time} horas com sucesso!`,
      });
    } catch (err) {
      throw new Error("Erro ao marcar horário!", 500);
    }
  }

  async edit(req, rep) {
    this.cleanUp();

    const validateAgendaItem = this.validate(rep);
    if (validateAgendaItem !== true)
      return rep.status(400).send({ error: validateAgendaItem });

    const { id } = req.params;

    try {
      this.agendaItem = await AgendaModel.findOneAndUpdate(
        { _id: id },
        this.body,
        {
          new: true,
        }
      );

      if (!this.agendaItem) {
        return rep.status(404).send({ error: "Horário não encontrado!" });
      }

      return rep.status(200).send({
        message: `Horário editado para o dia ${this.body.date} às ${this.body.time} horas com sucesso!`,
      });
    } catch (err) {
      throw new Error("Erro ao editar horário!", 500);
    }
  }
}

export default Agenda;
