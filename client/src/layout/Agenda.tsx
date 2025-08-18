import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState, AppDispatch } from "../store";

// Components
import AgendaItem from "../components/AgendaItem";
import AgendaItemModal from "../components/AgendaItemModal";

// Slice Thunk
import { getAllAgenda } from "../store/slices/scheduleSlice";

const Agenda = () => {
  const [modalData, setModalData] = useState<{
    date: Date | null;
    hour: string | null;
  }>({ date: null, hour: null });
  const [showModal, setShowModal] = useState(false);

  const { loading, schedules } = useSelector(
    (state: RootState) => state.schedules
  );

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAgenda());
  }, [dispatch]);
  return (
    <div data-testid="agenda">
      <section className="container my-5">
        {!loading && schedules && schedules.length > 0 ? (
          schedules.map((date, i) => (
            <AgendaItem
              key={i}
              date={date.date}
              schedules={date.availableTimes}
              onHourClick={(hour) => {
                setModalData({ date: date.date, hour });
                setShowModal(true);
              }}
            />
          ))
        ) : (
          <h2 className="text-center">Não horários disponíveis no momento</h2>
        )}
      </section>

      {showModal && modalData.date && modalData.hour && (
        <AgendaItemModal
          date={modalData.date}
          hour={modalData.hour}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Agenda;
