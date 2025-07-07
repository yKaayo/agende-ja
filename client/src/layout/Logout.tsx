// API
import { logoutUser } from "../lib/UserApi";

const Logout = () => {
  const handleLogout = async () => {
    const res = await logoutUser();

    if (res?.error) return alert(res?.error);
    if (res?.message) alert(res?.message);
  };

  return (
    <button onClick={handleLogout} type="button" className="btn btn-secondary">
      Sair
    </button>
  );
};

export default Logout;
