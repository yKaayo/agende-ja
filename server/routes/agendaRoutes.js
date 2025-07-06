// Controllers
import { schedule, userAgenda, scheduleTime } from "../controllers/agendaController.js";

export async function agenda(fastify) {
  fastify.get("/", schedule);
  fastify.get("/:email", userAgenda);
  fastify.post("/scheduleTime", scheduleTime);
}
