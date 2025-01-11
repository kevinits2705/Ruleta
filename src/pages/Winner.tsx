import { useEffect } from "react";
import { UseForm } from "../hooks/UseForm";

export const Winner = () => {
  const getWinner = localStorage.getItem("winner");
  const winners = getWinner !== null ? JSON.parse(getWinner) : "";

  const savedData = localStorage.getItem("isActive");
  const isActiveL = savedData !== null ? JSON.parse(savedData) : false;

  const initialState = {
    winner: winners,
    isActive: isActiveL,
  };
  const { winner, handleInputChange, isActive } = UseForm(initialState);

  useEffect(() => {
    localStorage.setItem("isActive", isActive);
  }, [isActive]);

  useEffect(() => {
    localStorage.setItem("winner", JSON.stringify(winner));
  }, [winner]);

  return (
    <>
      <div className="container" style={{ height: "100vh" }}>
        <div className="card mt-2">
          <div className="card-body">
            <form className="form">
              <div className="d-flex justify-content-center">
                <h1>Usuario Ganador!</h1>
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre del Ganador</label>
                <input
                  type="text"
                  className="form-control"
                  name="winner"
                  aria-describedby="emailHelp"
                  value={winner}
                  onChange={handleInputChange}
                />
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="isActive"
                    checked={isActive}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">Activar Ganador</label>
                </div>
                <div id="emailHelp" className="form-text">
                  Por favor, ingrese el nombre del usuario que será designado
                  como ganador. Asegúrese de activar la casilla de verificación,
                  ya que es un requisito indispensable para que el usuario sea
                  considerado ganador
                </div>
                <a href="/" className="btn btn-primary mt-4">
                  REGRESAR
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
