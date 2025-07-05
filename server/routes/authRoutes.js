// Controllers
import {
  verifyLogged,
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";

// Middlewares
import { verifyUser } from "../middlewares/AuthMiddleware.js";

export async function auth(fastify) {
  fastify.get("/", { preHandler: verifyUser }, verifyLogged);
  fastify.post("/entrar", loginUser);
  fastify.post("/cadastrar", createUser);
  fastify.get("/sair", { preHandler: verifyUser }, logoutUser);
}
