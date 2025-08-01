interface AgendaItemsProps {
  date: Date;
  schedules: string[];
  onHourClick: (hour: string) => void;
}

const AgendaItem = ({ date, schedules, onHourClick }: AgendaItemsProps) => {
  return (
    <div className="card my-3">
      <div className="card-header fw-bold">{date.toString()}</div>
      <div className="card-body d-flex justify-content-between flex-wrap gap-2">
        {schedules.map((hour: string) => (
          <button
            key={hour}
            className="btn btn-outline-primary py-2 text-center"
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
