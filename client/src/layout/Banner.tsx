// Layout
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";

// Type
import type { UserData } from "../types/type";

// Image
import banner from "../assets/images/banner.webp";

interface BannerProps {
  userData: UserData;
}

const Banner = ({ userData }: BannerProps) => {
  const isLogged = userData.status;

  return (
    <>
      <main className="banner position-relative">
        <img src={banner} className="w-100 h-100 object-fit-cover " alt="" />

        <div className="position-absolute top-0 w-100">
          <div className="container d-flex justify-content-end gap-3 mt-4">
            {isLogged ? (
              <Logout />
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </main>

      <Login />
      <Register />
    </>
  );
};

export default Banner;
