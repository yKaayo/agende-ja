const AgendaItem = ({ date }: { date: Date }) => {
  const collapseId = `collapse-${date.toISOString().split("T")[0]}`;
  const label = date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
  });

  return (
    <div className="my-3">
      <button
        className="btn btn-primary w-100 text-start"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#${collapseId}`}
        aria-expanded="false"
        aria-controls={collapseId}
      >
        {label}
      </button>

      <div className="collapse" id={collapseId}>
        <div className="card card-body">Horários disponíveis para {label}</div>
      </div>
    </div>
  );
};

export default AgendaItem;
