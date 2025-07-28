import { useDispatch } from "react-redux";
import { useRef, useState } from "react";

// API
import { loginUser } from "../lib/UserApi";

// Slice
import { setUser } from "../store/slices/userSlice";

// Boostrap
import { Modal } from "bootstrap";

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const modalRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      if (data?.error) return alert(data?.error);
      if (data?.message) {
        dispatch(
          setUser({
            authenticated: true,
          })
        );
        alert(data?.message);
      }

      if (modalRef?.current) {
        const modal = modalRef.current;
        const modalInstance = Modal.getInstance(modal);

        modalInstance.hide();
      }

      setFormData({
        email: "",
        password: "",
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex={-1}
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
      ref={modalRef}
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
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">
                  Digite seu email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="loginEmail"
                  name="email"
                  placeholder="email@email.com"
                  onChange={handleChange}
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
                  name="password"
                  placeholder="senha123"
                  onChange={handleChange}
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
