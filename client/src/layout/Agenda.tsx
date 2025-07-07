import { useState } from "react";

// Components
import AgendaItem from "../components/AgendaItem";
import AgendaItemModal from "../components/AgendaItemModal";

// Icon
import arrowIcon from "../assets/icons/arrow.svg";

// Type
import type { UserData } from "../types/type";

interface AgendaProps {
  userData: UserData;
}

const Agenda = ({ userData }: AgendaProps) => {
  const [modalData, setModalData] = useState<{
    date: Date | null;
    hour: string | null;
  }>({ date: null, hour: null });
  const [showModal, setShowModal] = useState(false);

  const allDays = generateDaysOfYear();
  const [currentWeek, setCurrentWeek] = useState(0);

  const daysPerWeek = 7;
  const start = currentWeek * daysPerWeek;
  const end = start + daysPerWeek;
  const currentDays = allDays.slice(start, end);

  const schedules = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  function generateDaysOfYear(year = new Date().getFullYear()) {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(year, 0, 1);

    while (date.getFullYear() === year) {
      const clone = new Date(date);
      if (clone >= today) {
        days.push(clone);
      }
      date.setDate(date.getDate() + 1);
    }

    return days;
  }

  return (
    <>
      <section className="container mb-3">
        {currentDays.map((date) => (
          <AgendaItem
            key={date.toISOString()}
            date={date}
            schedules={schedules}
            onHourClick={(hour) => {
              setModalData({ date, hour });
              setShowModal(true);
            }}
          />
        ))}

        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-secondary d-flex align-items-center gap-2"
            onClick={() => setCurrentWeek((w) => Math.max(w - 1, 0))}
            disabled={currentWeek === 0}
          >
            <img src={arrowIcon} style={{ height: 24 }} alt="Anterior" />
            <p className="text-nowrap mb-0">Semana anterior</p>
          </button>

          <button
            className="btn btn-secondary d-flex align-items-center gap-2"
            onClick={() => setCurrentWeek((w) => w + 1)}
            disabled={end >= allDays.length}
          >
            <p className="text-nowrap mb-0">Próxima semana</p>
            <img
              style={{ transform: "rotate(180deg)", height: 24 }}
              src={arrowIcon}
              alt="Próximo"
            />
          </button>
        </div>
      </section>

      {showModal && modalData.date && modalData.hour && (
        <AgendaItemModal
          isLogged={userData.status}
          userData={userData.data}
          date={modalData.date}
          hour={modalData.hour}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Agenda;
