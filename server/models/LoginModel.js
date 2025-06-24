import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

// Model
import { RegisterModel } from "./RegisterModel.js";

class Login {
  constructor(body) {
    this.body = body;
    this.user = null;
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
        err = false;
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }

  async validate() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) return "E-mail inválido";

    this.user = await RegisterModel.findOne({ email: this.body.email });
    if (!this.user) return "Usuário não existe!";

    if (this.body.password.length < 1 || this.body.password.length > 8)
      return "Senha deve ter no mínimo 1 caractér e no máximo 8 caractéres";

    const passwords = await bcrypt.compare(
      this.body.password,
      this.user.password
    );
    if (!passwords) return "Senha Incorreta!";

    return true;
  }

  async login(req, rep) {
    this.cleanUp();

    const validateUser = await this.validate();
    if (validateUser !== true)
      return rep.status(400).send({ error: validateUser });

    req.session.userId = this.user._id;

    return rep.status(201).send({ message: "Você entrou!" });
  }
}

export default Login;
