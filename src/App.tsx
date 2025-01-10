import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import "bootstrap/dist/css/bootstrap.min.css";
import { Participants } from "./components/Participants";
import Swal from "sweetalert2";

const App = () => {
  const [participants, setParticipants] = useState<{ option: string }[]>([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [fixedWinnerEnabled, setFixedWinnerEnabled] = useState(true); // Flag para ganador fijo
  const [newParticipant, setNewParticipant] = useState(""); // Control del input para añadir usuarios

  const handleSpinClick = () => {
    if (participants.length === 0) {
      alert("Por favor, añade participantes antes de girar la ruleta.");
      return;
    }

    let newPrizeNumber;

    if (fixedWinnerEnabled) {
      // Busca el índice de "Pepito"
      newPrizeNumber = participants.findIndex(
        (participant) => participant.option === "PEPITO"
      );
      if (newPrizeNumber === -1) {
        alert('No se encontró "Pepito" en los participantes.');
        return;
      }
    } else {
      // Selecciona un ganador al azar
      newPrizeNumber = Math.floor(Math.random() * participants.length);
    }

    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleAddParticipant = (event: any) => {
    event.preventDefault();
    if (newParticipant.trim() === "") {
      alert("El nombre del participante no puede estar vacío.");
      return;
    }
    if (participants.some((p) => p.option === newParticipant.toUpperCase())) {
      alert("Este participante ya está en la lista.");
      return;
    }

    setParticipants([
      ...participants,
      { option: newParticipant.toUpperCase() },
    ]);
    setNewParticipant(""); // Limpia el campo de texto
  };

  const handleResetParticipants = () => {
    setParticipants([]);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    Swal.fire({
      title: "¡El ganador es!",
      text: participants[prizeNumber].option,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="container mt-2">
      <h1 className="text-center">Ruleta de la Suerte</h1>
      <div className="d-flex justify-content-center">
        <form
          onSubmit={handleAddParticipant}
          className="d-flex justify-content-center"
        >
          <div className="form-group me-2">
            <input
              type="text"
              className="form-control"
              placeholder="Añadir participante"
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
            />
          </div>
          <button className="btn btn-success me-2" type="submit">
            Añadir
          </button>
        </form>
      </div>
      <div className="row">
        <div className="col-12 col-md-9">
          <div className="mt-4 d-flex flex-column align-items-center">
            {participants.length > 0 ? (
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={participants}
                outerBorderColor="black"
                outerBorderWidth={10}
                innerRadius={15}
                radiusLineColor="white"
                radiusLineWidth={2}
                textColors={["#000"]}
                fontSize={15}
                backgroundColors={["#FFCCB6", "#FF6666", "#6A9AE2", "#FFD700"]}
                onStopSpinning={handleStopSpinning}
              />
            ) : (
              <p className="text-center mt-4">
                Por favor, añade participantes para iniciar.
              </p>
            )}
            <button
              className="btn btn-primary mt-3"
              onClick={handleSpinClick}
              disabled={mustSpin || participants.length === 0}
            >
              Girar
            </button>
            <div className="form-check mt-3 d-none">
              <input
                className="form-check-input"
                type="checkbox"
                id="fixedWinner"
                checked={fixedWinnerEnabled}
                onChange={() => setFixedWinnerEnabled(!fixedWinnerEnabled)}
              />
              <label className="form-check-label" htmlFor="fixedWinner">
                Siempre ganar "Pepito"
              </label>
            </div>
          </div>
        </div>
        <Participants
          handleResetParticipants={handleResetParticipants}
          participants={participants}
        />
      </div>
      <div className="text-center mt-4">
        <h3>Creado por Team SIT </h3>
        <h3>2025</h3>
      </div>
    </div>
  );
};

export default App;
