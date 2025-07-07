import { useEffect, useState } from "react";

// Layout
import Agenda from "./layout/Agenda";
import Banner from "./layout/Banner";
import MySchedule from "./layout/MySchedule";

// API
import { verifyLogged } from "./lib/UserApi";
import { userAgenda } from "./lib/AgendaApi";

const App = () => {
  const [userData, setUserData] = useState({
    status: false,
    data: null,
  });
  const [user, setUser] = useState({
    name: "",
    email: "",
    authenticated: false,
  });

  const verifyUserLogged = async () => {
    try {
      const userStatus = await verifyLogged();

      setUser((prev) => ({
        ...prev,
        name: userStatus.user?.name || "",
        email: userStatus.user?.email || "",
        authenticated: userStatus.authenticated || false,
      }));

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

      return setUserData((prev) => ({
        ...prev,
        status: status.authenticated,
        data: data,
      }));
    };

    checkAuthStatus();
  }, []);

  return (
    <>
      <Banner userData={userData} />
      {userData.data && (
        <MySchedule userSchedule={userData.data} isLogged={userData.status} />
      )}
      <Agenda user={user} />
    </>
  );
};

export default App;
