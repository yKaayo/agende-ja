import { useEffect, useState } from "react";

// API
import { verifyLogged } from "../lib/api";

interface AgendaItemModalProps {
  date: Date;
  hour: string;
  onClose: () => void;
}

const AgendaItemModal = ({ date, hour, onClose }: AgendaItemModalProps) => {
  const [isLogged, setIsLogged] = useState(false);

  const formatDate = date.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });

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
    <div className="modal show d-block" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Agendar horário</h2>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>{formatDate}</p>
            <p>{hour}</p>

            <button
              className="btn btn-primary"
              disabled={!isLogged}
              onClick={onClose}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaItemModal;
