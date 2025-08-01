import { useDispatch } from "react-redux";
// API
import { logoutUser } from "../services/UserApi";
import { logout } from "../store/slices/userSlice";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await logoutUser();

    if (res?.error) return alert(res?.error);
    if (res?.message) alert(res?.message);

    dispatch(logout());
  };

  return (
    <button onClick={handleLogout} type="button" className="btn btn-secondary">
      Sair
    </button>
  );
};

export default Logout;
