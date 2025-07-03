interface AgendaItemModalProps {
  date: Date;
  hour: string;
  onClose: () => void;
}

const AgendaItemModal = ({ date, hour, onClose }: AgendaItemModalProps) => {
  const formattedDate = date.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });

  return (
    <div className="modal-backdrop-custom">
      <div className="modal show d-block" tabIndex={-1}>
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
              <p>{formattedDate}</p>
              <p>{hour}</p>
              <button className="btn btn-primary" onClick={onClose}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaItemModal;
