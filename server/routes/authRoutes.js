// Controllers
import { createUser, loginUser } from "../controllers/authController.js";

// Middlewares
import exampleMiddleware from "../middlewares/exampleMiddleware.js";

export async function auth(fastify) {
  // fastify.route({
  //   method: "POST",
  //   url: "/entrar",
  //   handler: async (req, rep) => {
  //     return createUser(req, rep);
  //   },
  //   preHandler: exampleMiddleware,
  // });
  // fastify.post("/entrar", loginUser(req, rep));
  fastify.post("/cadastrar", createUser);
}
