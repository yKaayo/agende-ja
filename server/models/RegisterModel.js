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

  async validate() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) return "E-mail inválido";

    this.user = await RegisterModel.findOne({ email: this.body.email });
    console.log(this.user);

    if (this.user) return "Usuário já existe!";

    if (this.body.password.length < 1 || this.body.password.length > 8) {
      return "Senha deve ter no mínimo 1 caractér e no máximo 8 caractéres";
    }

    return true;
  }

  async register(rep) {
    const validateUser = await this.validate();
    if (validateUser !== true)
      return rep.status(400).send({ error: validateUser });

    this.body.password = await bcrypt.hash(this.body.password, 10);

    try {
      this.user = await RegisterModel.create(this.body);
      rep.status(201).send({ message: "Usuário cadastrado com sucesso!" });
    } catch (err) {
      console.error(err);
    }
  }
}

export default Register;
