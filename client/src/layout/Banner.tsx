import { useEffect, useState } from "react";

// Layout
import Login from "./Login";
import Register from "./Register";

// Image
import banner from "../assets/images/banner.webp";

// API
import { verifyLogged } from "../lib/api";

const Banner = () => {
  const [isLogged, setIsLogged] = useState(false);

  const verifyUserLogged = async () => {
    try {
      const userStatus = await verifyLogged();
      return userStatus.authenticated;
    } catch (err) {
      console.error("Erro ao verificar login:", err);
      return false;
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const status = await verifyUserLogged();
      setIsLogged(status);
    };

    checkAuthStatus();
  }, []);

  return (
    <>
      <main className="banner position-relative">
        <img src={banner} className="w-100 h-100 object-fit-cover " alt="" />

        {!isLogged && (
          <div className="position-absolute top-0 w-100">
            <div className="container d-flex justify-content-end gap-3 mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                Entrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#registerModal"
              >
                Cadastrar
              </button>
            </div>
          </div>
        )}
      </main>

      <Login />
      <Register />
    </>
  );
};

export default Banner;
