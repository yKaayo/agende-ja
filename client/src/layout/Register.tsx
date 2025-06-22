const Register = () => {
  return (
    <div
      className="modal fade"
      id="registerModal"
      tabIndex={-1}
      aria-labelledby="registerModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
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
            <form>
              <div className="mb-3">
                <label htmlFor="registerName" className="form-label">
                  Digite seu nome:
                </label>
                <input type="text" className="form-control" id="registerName" />
              </div>

              <div className="mb-3">
                <label htmlFor="registerEmail" className="form-label">
                  Digite um email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="registerEmail"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="registerPassword" className="form-label">
                  Digite uma senha:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="registerPassword"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="registerPasswordAgain" className="form-label">
                  Digite novamente sua senha:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="registerPasswordAgain"
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
