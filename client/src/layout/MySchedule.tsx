import { useSelector } from "react-redux";
import { useState } from "react";

// Icons
import pencilIcon from "../assets/icons/pencil.svg";
import trashIcon from "../assets/icons/trash.svg";

// Type
import type { Schedule } from "../types/type";

// Component
import EditScheduleModal from "../components/EditScheduleModal";
import DeleteScheduleModal from "../components/DeleteScheduleModal";

const MySchedule = () => {
  const user = useSelector((state) => state.user);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editSelectSchedule, setEditSelectSchedule] = useState<Schedule>({
    _id: "",
    name: "",
    email: "",
    date: "",
    time: "",
  });
  const [selectId, setSelectId] = useState("");

  const handleEdit = (schedule: Schedule) => {
    setEditSelectSchedule({
      _id: schedule._id,
      name: schedule.name,
      email: schedule.email,
      date: schedule.date,
      time: schedule.time,
    });

    setShowEditModal(true);
  };

  const handleDelete = (id: string) => {
    setSelectId(id);
    setShowDeleteModal(true);
  };

  return (
    <>
      <div className="container d-flex justify-content-between">
        {user.data.map((schedule: Schedule) => (
          <div key={`${schedule.date}-${schedule.time}`}>
            <div className="">
              <p>{`Nome: ${user.name}`}</p>
              <p>{`Email: ${user.email}`}</p>
              <p>{`Data: ${schedule.date}`}</p>
              <p>{`Hora: ${schedule.time}`}</p>
            </div>

            <button onClick={() => handleEdit(schedule)}>
              <img src={pencilIcon} alt="Editar" />
            </button>
            <button
              onClick={() => handleDelete(schedule._id ? schedule._id : "")}
            >
              <img src={trashIcon} alt="Deletar" />
            </button>
          </div>
        ))}
      </div>

      {showEditModal && (
        <EditScheduleModal
          userData={editSelectSchedule}
          onClose={() => setShowEditModal(false)}
        />
      )}

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
