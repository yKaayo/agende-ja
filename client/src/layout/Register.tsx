import React, { useRef, useState } from "react";
import { registerUser } from "../lib/api.js";

// Boostrap
import Modal from "bootstrap/js/dist/modal";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const modalRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const { passwordConfirm, ...userData } = formData;
      const data = await registerUser(userData);
      alert(data?.message);

      if (modalRef) {
        const modal = modalRef.current!;
        const modalInstance = Modal.getInstance(modal) || new Modal(modal);

        modal.addEventListener(
          "hidden.bs.modal",
          () => {
            document.body.classList.remove("modal-open");
            const backdrop = document.querySelector(".modal-backdrop");
            if (backdrop) backdrop.remove();
          },
          { once: true }
        );
        modalInstance.hide();
      }

      setFormData({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <div
      className="modal fade "
      id="registerModal"
      tabIndex={-1}
      aria-labelledby="registerModalLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Cadastrar</h2>
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
                <label htmlFor="registerName" className="form-label">
                  Digite seu nome:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="registerName"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="registerEmail" className="form-label">
                  Digite um email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="registerEmail"
                  placeholder="email@email.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="registerPassword" className="form-label">
                  Digite uma senha:
                </label>
                <input
                  type="password"
                  className="form-control"
                  max={8}
                  min={1}
                  id="registerPassword"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="registerPasswordAgain" className="form-label">
                  Digite novamente sua senha:
                </label>
                <input
                  type="password"
                  max={8}
                  min={1}
                  className="form-control"
                  id="registerPasswordAgain"
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
