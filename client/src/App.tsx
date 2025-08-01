import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

// Layout
import Agenda from "./layout/Agenda";
import Banner from "./layout/Banner";
import MySchedule from "./layout/MySchedule";

// Slice Thunk
import { fetchUserAndAgenda } from "./store/slices/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const { loading, ...user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserAndAgenda());
  }, [dispatch]);

  return (
    <>
      <Banner />
      <h1 className="text-center fw-bold my-3">
        Agende já seu horário na Barber Shop!
      </h1>
      {!loading && user.data && <MySchedule />}
      <Agenda />
    </>
  );
};

export default App;
