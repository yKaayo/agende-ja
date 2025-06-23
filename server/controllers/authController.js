// Models
import Login from "../models/LoginModel.js";
import Register from "../models/RegisterModel.js";

// ProductModel.create({
//   name: "Cama",
//   price: 229,
//   description: "Cama de casal",
// })
//   .then((data) => console.log(data))
//   .catch((e) => console.log(e));

export const createUser = (req, rep) => {
  const user = new Register(req.body);
  console.log(user.body);

  user.register(rep);

  return rep.status(201).send({ message: "Usuário cadastrado com sucesso!" });
};

export const loginUser = (req, rep) => {
  return rep.send({});
};

// export const getProducts = (req, rep) => {
//   // req.session.user = { user: "Kaayo", logged: true };
//   console.log(req.session.user);

//   return rep.send({ message: "Produtos route working!", user: req.session.user });
// };

// export const createProducts = (req, rep) => {
//   try {
//     const name = req.body.name;

//     rep.status(201).send({
//       success: true,
//       message: `Produto ${name} criado com sucesso`,
//     });
//   } catch (error) {
//     rep.status(500).send({
//       success: false,
//       message: "Erro ao criar produto",
//       error: error.message,
//     });
//   }
// };
