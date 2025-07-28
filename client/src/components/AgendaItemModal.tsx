import { useSelector } from "react-redux";

// Type
import type { Schedule } from "../types/type";

// API
import { createUserSchedule } from "../lib/AgendaApi";

interface AgendaItemModalProps {
  date: Date;
  hour: string;
  onClose: () => void;
}

const AgendaItemModal = ({ date, hour, onClose }: AgendaItemModalProps) => {
  const user = useSelector((state) => state.user);

  const handleCta = async () => {
    if (user.authenticated && user) {
      const scheduleData: Schedule = {
        name: user.name,
        email: user.email,
        date: date,
        time: hour,
      };

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
            <p>{date}</p>
            <p>{hour}</p>

            <button
              className="btn btn-primary"
              disabled={!user.authenticated}
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
