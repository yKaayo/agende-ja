import mongoose from "mongoose";
import validator from "validator";

const RegisterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const RegisterModel = mongoose.model("Register", RegisterSchema);

class Register {
  constructor(body) {
    this.body = body;
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

  validate() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) {
      return "E-mail inválido";
    }

    if (this.body.password.length < 1 || this.body.password.length > 8) {
      return "Senha deve ter no mínimo 1 caractér e no máximo 8 caractéres";
    }

    return "Usuário válido";
  }
}

export default Register;
