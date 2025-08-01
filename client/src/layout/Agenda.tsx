import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Components
import AgendaItem from "../components/AgendaItem";
import AgendaItemModal from "../components/AgendaItemModal";

// Slice Thunk
import { getAllAgenda } from "../store/slices/scheduleSlice.js";

// Types
import type { Schedule } from "../types/type.js";

const Agenda = () => {
  const [modalData, setModalData] = useState<{
    date: Date | null;
    hour: string | null;
  }>({ date: null, hour: null });
  const [showModal, setShowModal] = useState(false);

  const { loading, schedules } = useSelector((state) => state.schedules);
  console.log(schedules);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAgenda());
  }, [dispatch]);
  return (
    <>
      <section className="container my-5">
        {!loading && schedules && schedules.length > 0 ? (
          schedules.map((date: Schedule, i: number) => (
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
    </>
  );
};

export default Agenda;
