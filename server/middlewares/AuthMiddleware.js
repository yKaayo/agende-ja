export const verifyUser = async (req, rep) => {
  if (!req.session.userId) {
    return rep.status(401).send({ error: "Não autenticado" });
  }
};
