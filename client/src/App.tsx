import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

// Slice
import { setUser } from "./store/slices/userSlice";

// Layout
import Agenda from "./layout/Agenda";
import Banner from "./layout/Banner";
import MySchedule from "./layout/MySchedule";

// API
import { verifyLogged } from "./lib/UserApi";
import { userAgenda } from "./lib/AgendaApi";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const verifyUserLogged = async () => {
    try {
      const userStatus = await verifyLogged();
      return userStatus;
    } catch (err) {
      console.error("Erro ao verificar login:", err);
      return false;
    }
  };

  const getUserData = async (email: string) => {
    try {
      const userData = await userAgenda(email);
      if (!userData) return null;
      return userData;
    } catch (err) {
      console.error("Erro ao obter dados do usuário:", err);
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const status = await verifyUserLogged();
      if (!status.authenticated) return false;

      const data = await getUserData(status.user.email);

      dispatch(
        setUser({
          name: status.user?.name || "",
          email: status.user?.email || "",
          authenticated: status.authenticated || false,
          data: data,
        })
      );
    };

    checkAuthStatus();
  }, [dispatch]);

  return (
    <>
      <Banner />
      {user.data && <MySchedule />}
      <Agenda />
    </>
  );
};

export default App;
