// Controllers
import {
  getProducts,
  createProducts,
} from "../controllers/authController.js";
import {} from "../controllers/userController.js";

// Middlewares
import exampleMiddleware from "../middlewares/exampleMiddleware.js";

export async function auth(fastify) {
  fastify.route({
    method: "GET",
    url: "/entrar",
    handler: async (req, rep) => {
      return getProducts(req, rep);
    },
    preHandler: exampleMiddleware,
  });
  fastify.post("/cadastrar", createProducts);
}
