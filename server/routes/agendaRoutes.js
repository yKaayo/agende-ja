// Controllers
import { scheduleTime } from "../controllers/agendaController.js";

export async function agenda(fastify) {
  fastify.post("/scheduleTime", scheduleTime);
}
