// Controllers
import {
  schedule,
  userAgenda,
  scheduleTime,
  editScheduleTime,
  deleteScheduleTime
} from "../controllers/agendaController.js";

// Middlewares
import { verifyUser } from "../middlewares/AuthMiddleware.js";

export async function agenda(fastify) {
  fastify.get("/", schedule);
  fastify.get("/:email", { preHandler: verifyUser }, userAgenda);
  fastify.post("/scheduleTime", { preHandler: verifyUser }, scheduleTime);
  fastify.put("/scheduleTime/:id", { preHandler: verifyUser }, editScheduleTime);
  fastify.delete("/scheduleTime/:id", { preHandler: verifyUser }, deleteScheduleTime);
}
