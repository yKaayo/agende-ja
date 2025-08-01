import { useDispatch, useSelector } from "react-redux";

// API
import { deleteUserSchedule } from "../services/AgendaApi";

// Slice Thunk
import { getAllAgenda } from "../store/slices/scheduleSlice";

interface DeleteScheduleModal {
  id: string;
  onClose: () => void;
}

const DeleteScheduleModal = ({ id, onClose }: DeleteScheduleModal) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await deleteUserSchedule(id);

    dispatch(getAllAgenda());
    alert(res.message);
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Alterar horário</h2>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit} className="modal-body">
            <h3>Tem certeza que deseja cancelar seu horário?</h3>

            <div className="d-flex align-items-center">
              <button
                className="btn btn-danger mt-4"
                disabled={!user.authenticated}
              >
                Deletar
              </button>
              <button
                onClick={onClose}
                type="button"
                className="btn btn-primary mt-4"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteScheduleModal;
