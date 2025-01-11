import { useState } from "react";
import Swal from "sweetalert2";

export const UseGame = () => {
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
  return {
    participants,
    setParticipants,
    mustSpin,
    setMustSpin,
    prizeNumber,
    setPrizeNumber,
    fixedWinnerEnabled,
    setFixedWinnerEnabled,
    newParticipant,
    setNewParticipant,
    handleSpinClick,
    handleAddParticipant,
    handleResetParticipants,
    handleStopSpinning,
  };
};
