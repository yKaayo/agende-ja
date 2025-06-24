export async function home(fastify) {
  fastify.get("/home", async (req, rep) => {
    if (!req.session.userId) {
      return rep.status(401).send({ error: "Acesso negado. Faça login." });
    }

    const user = await RegisterModel.findById(req.session.userId);
    return rep.send({ message: "Bem-vindo!", user });
  });
}
