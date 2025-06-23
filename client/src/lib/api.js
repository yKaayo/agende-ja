import axios from "axios";

const url = "http://127.0.0.1:3000";

export const registerUser = async (data) => {
  await axios
    .post(`${url}/autenticar/cadastrar`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("Erro ao cadastrar!:", err);
    });
};
