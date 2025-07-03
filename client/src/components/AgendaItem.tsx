interface AgendaItemsProps {
  date: Date;
  schedules: string[];
  onHourClick: (hour: string) => void;
}

const AgendaItem = ({ date, schedules, onHourClick }: AgendaItemsProps) => {
  const formatDate = (data: Date) =>
    data.toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    });

  return (
    <div className="card my-3">
      <div className="card-header fw-bold">{formatDate(date)}</div>
      <div className="card-body d-flex flex-wrap gap-2">
        {schedules.map((hour: string) => (
          <button
            key={hour}
            className="btn btn-outline-primary p-2 text-center"
            style={{ minWidth: 80 }}
            onClick={() => onHourClick(hour)}
          >
            {hour}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AgendaItem;
