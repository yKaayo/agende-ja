// Controllers
import {
  verifyLogged,
  createUser,
  loginUser,
} from "../controllers/authController.js";

export async function auth(fastify) {
  fastify.get("/", verifyLogged);
  fastify.post("/entrar", loginUser);
  fastify.post("/cadastrar", createUser);
}
