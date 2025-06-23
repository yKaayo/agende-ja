import { useState } from "react";
import AgendaItem from "../components/AgendaItem";

// Icon
import arrowIcon from "../assets/icons/arrow.svg";

const Agenda = () => {
  const allDays = generateDaysOfYear();
  const [currentWeek, setCurrentWeek] = useState(0);

  const daysPerWeek = 7;
  const start = currentWeek * daysPerWeek;
  const end = start + daysPerWeek;
  const currentDays = allDays.slice(start, end);

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
    <section className="container mb-3">
      {currentDays.map((date) => (
        <AgendaItem key={date.toISOString()} date={date} />
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
  );
};

export default Agenda;
