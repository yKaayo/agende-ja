// Models
import Register from "../models/RegisterModel.js";
import Login from "../models/LoginModel.js";
import { RegisterModel } from "../models/RegisterModel.js";

export const verifyLogged = async (req, rep) => {
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

export const logoutUser = (req, rep) => {
  req.session.destroy((err) => {
    if (err) {
      return rep.status(500).send({ error: "Erro ao encerrar sessão" });
    }

    return rep.send({ message: "Usuário saiu com sucesso!" });
  });
};
