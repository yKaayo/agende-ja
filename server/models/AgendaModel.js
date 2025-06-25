import mongoose from "mongoose";

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
  }
}

export default Agenda;
