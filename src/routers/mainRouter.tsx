import { Navigate, Route, Routes } from "react-router-dom";
import { GameApp } from "../pages/GameApp";
import { Winner } from "../pages/Winner";

export const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<GameApp />} />
        <Route path="/winner" element={<Winner />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
