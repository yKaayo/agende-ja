import { useSelector } from "react-redux";
import { useState } from "react";

// Type
import type { Schedule } from "../types/type";

// API
import { editUserSchedule } from "../lib/AgendaApi";

interface EditScheduleModalProps {
  userData: Schedule;
  onClose: () => void;
}

const EditScheduleModal = ({ userData, onClose }: EditScheduleModalProps) => {
  const user = useSelector((state) => state.user);

  const formatDateToInput = (date: string) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  const [scheduleData, setScheduleData] = useState({
    date: formatDateToInput(userData.date),
    time: userData.time,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "time") {
      const [hour, minute] = value.split(":");
      if (minute !== "00") return;
      if (value < "08:00" || value > "17:00") return;
    }

    setScheduleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const date = new Date(scheduleData.date).toLocaleDateString("pt-BR");

    const res = await editUserSchedule({
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      date: date,
      time: scheduleData.time,
    });

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
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column gap-1">
                <label htmlFor="date">Data</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={scheduleData.date}
                  min={new Date().toISOString().split("T")[0]}
                  max={
                    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex flex-column gap-1">
                <label htmlFor="time">Hora</label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  value={scheduleData.time}
                  min="08:00"
                  max="17:00"
                  step="3600"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              className="btn btn-primary mt-4"
              disabled={!user.authenticated}
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditScheduleModal;
