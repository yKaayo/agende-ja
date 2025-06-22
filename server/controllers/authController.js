// Models
import ProductModel from "../models/ProductModels.js";

// ProductModel.create({
//   name: "Cama",
//   price: 229,
//   description: "Cama de casal",
// })
//   .then((data) => console.log(data))
//   .catch((e) => console.log(e));

export const getProducts = (req, rep) => {
  // req.session.user = { user: "Kaayo", logged: true };
  console.log(req.session.user);

  return rep.send({ message: "Produtos route working!", user: req.session.user });
};

export const createProducts = (req, rep) => {
  try {
    const name = req.body.name;

    rep.status(201).send({
      success: true,
      message: `Produto ${name} criado com sucesso`,
    });
  } catch (error) {
    rep.status(500).send({
      success: false,
      message: "Erro ao criar produto",
      error: error.message,
    });
  }
};
