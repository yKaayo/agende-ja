import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const RegisterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const RegisterModel = mongoose.model("User", RegisterSchema);

class Register {
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
      name: this.body.name,
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
      if (this.user)
        return rep.status(409).send({ error: "Usuário já existe!" });
    } catch (err) {
      throw new Error("Erro ao buscar usuário!");
    }

    if (
      !validator.isStrongPassword(this.body.password, {
        minLength: 1,
      }) ||
      this.body.password.length > 8
    ) {
      return "Senha deve ter no mínimo 1 caractér e no máximo 8 caractéres";
    }

    return true;
  }

  async register(rep) {
    const validateUser = await this.validate(rep);
    if (validateUser !== true)
      return rep.status(400).send({ error: validateUser });

    try {
      this.body.password = await bcrypt.hash(this.body.password, 10);
    } catch (err) {
      throw new Error("Erro ao criptografar a senha!");
    }

    try {
      this.user = await RegisterModel.create(this.body);
      rep.status(201).send({ message: "Usuário cadastrado com sucesso!" });
    } catch (err) {
      throw new Error("Erro ao criar usuário!");
    }
  }
}

export default Register;
