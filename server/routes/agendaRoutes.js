// Controllers
import { scheduleTime } from "../controllers/agendaController.js";

export async function agenda(fastify) {
  fastify.get("/", scheduleTime);
  fastify.post("/scheduleTime", scheduleTime);
}
