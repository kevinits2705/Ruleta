import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "./routers/mainRouter";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </>
  );
};

export default App;
