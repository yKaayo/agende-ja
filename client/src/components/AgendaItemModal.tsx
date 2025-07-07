// Type
import type { User, Schedule } from "../types/type";

// API
import { createUserSchedule } from "../lib/AgendaApi";

interface AgendaItemModalProps {
  isLogged: boolean;
  user: User | null;
  date: Date;
  hour: string;
  onClose: () => void;
}

const AgendaItemModal = ({
  isLogged,
  user,
  date,
  hour,
  onClose,
}: AgendaItemModalProps) => {

  
  const formatDate = date.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });

  const handleCta = async () => {
    if (isLogged && user) {
      const scheduleData: Schedule = {
        name: user.name,
        email: user.email,
        date: date.toLocaleDateString("pt-BR"),
        time: hour,
      };

      console.log(scheduleData);
      

      const res = await createUserSchedule(scheduleData);
      alert(res.message);
      onClose();
    } else {
      alert("Usuário não está logado.");
    }
  };

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
              onClick={handleCta}
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
