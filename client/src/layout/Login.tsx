import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex={-1}
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Entrar</h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">
                  Digite seu email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="loginEmail"
                  placeholder="email@email.com"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">
                  Digite sua senha:
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  max={8}
                  min={1}
                  className="form-control"
                  id="loginPassword"
                  placeholder="senha123"
                />
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="loginPasswordShow"
                  onChange={() => setShowPassword((prev) => !prev)}
                />
                <label className="form-check-label" htmlFor="loginPasswordShow">
                  Mostrar senha
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
