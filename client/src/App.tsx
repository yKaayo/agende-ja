import { useEffect } from "react";
import Agenda from "./layout/Agenda";
import Banner from "./layout/Banner";
import { verifyLogged } from "./lib/api";

const App = () => {
  useEffect(() => {
    verifyLogged();
  }, []);
  
  return (
    <>
      <Banner />
      <Agenda />
    </>
  );
};

export default App;
