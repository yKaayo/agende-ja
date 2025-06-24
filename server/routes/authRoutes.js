// Controllers
import { createUser, loginUser } from "../controllers/authController.js";

export async function auth(fastify) {
  fastify.post("/entrar", loginUser);
  fastify.post("/cadastrar", createUser);
}
