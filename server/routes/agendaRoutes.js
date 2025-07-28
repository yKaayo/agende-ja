// Controllers
import {
  generateSchedule,
  userAgenda,
  scheduleTime,
  editScheduleTime,
  deleteScheduleTime,
  allSchedules,
} from "../controllers/agendaController.js";

// Middlewares
import { verifyUser } from "../middlewares/AuthMiddleware.js";

export async function agenda(fastify) {
  fastify.get("/", generateSchedule);
  fastify.get("/todos", allSchedules);
  fastify.get("/:email", { preHandler: verifyUser }, userAgenda);
  fastify.post("/scheduleTime", { preHandler: verifyUser }, scheduleTime);
  fastify.put(
    "/scheduleTime/:id",
    { preHandler: verifyUser },
    editScheduleTime
  );
  fastify.delete(
    "/scheduleTime/:id",
    { preHandler: verifyUser },
    deleteScheduleTime
  );
}
