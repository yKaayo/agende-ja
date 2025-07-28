import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Components
import AgendaItem from "../components/AgendaItem";
import AgendaItemModal from "../components/AgendaItemModal";

// Icon
import { getGenerateSchedules } from "../lib/AgendaApi";

// Slice
import { setSchedules } from "../store/slices/scheduleSlice";

const Agenda = () => {
  const [modalData, setModalData] = useState<{
    date: Date | null;
    hour: string | null;
  }>({ date: null, hour: null });
  const [showModal, setShowModal] = useState(false);

  const schedules = useSelector((state) => state.schedules);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSchedules = async () => {
      const data = await getGenerateSchedules();
      dispatch(setSchedules(data.schedule));
    };

    getSchedules();
  }, [dispatch]);

  return (
    <>
      <section className="container mb-3">
        {schedules.map((date, i) => (
          <AgendaItem
            key={i}
            date={date.date}
            schedules={date.availableTimes}
            onHourClick={(hour) => {
              setModalData({ date: date.date, hour });
              setShowModal(true);
            }}
          />
        ))}
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
