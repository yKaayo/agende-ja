// Models
import Register from "../models/RegisterModel.js";
import Login from "../models/LoginModel.js";

export const createUser = (req, rep) => {
  const user = new Register(req.body);
  console.log(user.body);

  return user.register(rep);
};

export const loginUser = (req, rep) => {
  const user = new Login(req.body);

  return user.login(req, rep);
};
