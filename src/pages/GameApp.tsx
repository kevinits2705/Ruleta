import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Participants } from "../components/Participants";
import { FormGameParticipans } from "../components/FormGameParticipans";
import { Footer } from "../components/Footer";

interface IParticipant {
  option: string;
}

export const GameApp = () => {
  //   const [participants, setParticipants] = useState<IParticipant[]>(() => {
  //     const savedData = localStorage.getItem("participants");
  //     return savedData ? JSON.parse(savedData) : [];
  //   });
  const savedData = localStorage.getItem("isActive");
  const isActive = savedData !== null ? JSON.parse(savedData) : false;

  const savedParticipants = localStorage.getItem("participants");
  const initialParticipants = savedParticipants
    ? JSON.parse(savedParticipants)
    : [];

  const [participants, setParticipants] =
    useState<IParticipant[]>(initialParticipants);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [fixedWinnerEnabled, setFixedWinnerEnabled] = useState(isActive); // Flag para ganador fijo

  const [newParticipant, setNewParticipant] = useState(""); // Control del input para añadir usuarios

  const handleSpinClick = () => {
    if (participants.length === 0) {
      alert("Por favor, añade participantes antes de girar la ruleta.");
      return;
    }

    let newPrizeNumber;
    const getWinner = localStorage.getItem("winner");
    const winner = getWinner !== null ? JSON.parse(getWinner) : "";
    if (fixedWinnerEnabled) {
      // Busca el índice de "Pepito"
      newPrizeNumber = participants.findIndex(
        (participant) => participant.option === winner.toUpperCase()
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

  useEffect(() => {
    localStorage.setItem("participants", JSON.stringify(participants));
  }, [participants]);

  const handleResetParticipants = () => {
    localStorage.removeItem("participants");
    setParticipants([]);
    console.log("Participantes eliminados");
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
    <div
      className="container mt-2"
      style={
        participants.length === 0 ? { height: "100vh" } : { height: "auto" }
      }
    >
      <h1 className="text-center">Ruleta de la Suerte</h1>

      <FormGameParticipans
        handleAddParticipant={handleAddParticipant}
        newParticipant={newParticipant}
        setNewParticipant={setNewParticipant}
      />

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
      <Footer />
    </div>
  );
};
