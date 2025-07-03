// Models
import Register from "../models/RegisterModel.js";
import Login from "../models/LoginModel.js";
import { RegisterModel } from "../models/RegisterModel.js";

export const verifyLogged = async (req, rep) => {
  if (!req.session.userId) {
    return rep.status(401).send({ error: "Não autenticado" });
  }

  const user = await RegisterModel.findById(req.session.userId);
  if (!user) {
    req.session.destroy();
    return rep.status(401).send({ error: "Usuário não encontrado" });
  }

  const userResponse = {
    _id: user._id,
    email: user.email,
    name: user.name,
  };

  return rep.send({
    authenticated: true,
    user: userResponse,
  });
};

export const createUser = (req, rep) => {
  const user = new Register(req.body);

  return user.register(rep);
};

export const loginUser = (req, rep) => {
  const user = new Login(req.body);

  return user.login(req, rep);
};
