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

  async validate(rep) {
    this.cleanUp();

    if (!validator.isEmail(this.body.email))
      return rep.status(400).send({ error: "E-mail inválido" });

    try {
      this.user = await RegisterModel.findOne({ email: this.body.email });
      if (!this.user)
        return rep.status(404).send({ error: "Usuário não existe!" });
    } catch (err) {
      throw new Error("Erro ao buscar dados do usuário!", 400);
    }

    if (this.body.password.length < 1 || this.body.password.length > 8)
      return rep.status(400).send({
        error: "Senha deve ter no mínimo 1 caractér e no máximo 8 caractéres",
      });

    try {
      const passwords = await bcrypt.compare(
        this.body.password,
        this.user.password
      );
      if (!passwords)
        return rep.status(401).send({
          error: "Senha Incorreta!",
        });
    } catch (err) {
      throw new Error("Erro ao acessar a conta!", 500);
    }

    return true;
  }

  async login(req, rep) {
    this.cleanUp();

    try {
      const validateUser = await this.validate(rep);
      if (validateUser !== true)
        return rep.status(400).send({ error: validateUser });
    } catch (err) {
      throw err;
    }

    req.session.userId = this.user._id.toString();
    req.session.userEmail = this.user.email;

    return rep.status(201).send({ message: "Você entrou!" });
  }
}

export default Login;
