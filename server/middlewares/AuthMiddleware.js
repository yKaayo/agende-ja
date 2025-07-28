export const verifyUser = async (req, rep) => {
  console.log(req.session);
  if (!req.session.userId) {
    return rep.status(401).send({ error: "Não autenticado" });
  }
};
