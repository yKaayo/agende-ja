import { useSelector } from "react-redux";
import { useState } from "react";

// Icons
import trashIcon from "../assets/icons/trash.svg";

// Component
import DeleteScheduleModal from "../components/DeleteScheduleModal";

const MySchedule = () => {
  const user = useSelector((state) => state.user);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectId, setSelectId] = useState("");

  const handleDelete = (id: string) => {
    setSelectId(id);
    setShowDeleteModal(true);
  };

  return (
    <>
      <div className="container d-flex justify-content-between">
        {user.data.map((schedule) => (
          <div key={`${schedule.date}-${schedule.time}`}>
            <div className="">
              <p>{`Nome: ${user.name}`}</p>
              <p>{`Email: ${user.email}`}</p>
              <p>{`Data: ${schedule.date}`}</p>
              <p>{`Hora: ${schedule.time}`}</p>
            </div>

            <button onClick={() => handleDelete(schedule.id)}>
              <img src={trashIcon} alt="Deletar" />
            </button>
          </div>
        ))}
      </div>

      {showDeleteModal && (
        <DeleteScheduleModal
          id={selectId}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export default MySchedule;
