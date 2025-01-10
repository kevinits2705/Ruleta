export const Participants = ({
  handleResetParticipants,
  participants,
}: any) => {
  return (
    <>
      <div className="col-12 col-md-3">
        <div className="d-flex justify-content-center align-items-center">
          <button
            className="btn btn-danger"
            onClick={handleResetParticipants}
            disabled={participants.length === 0}
          >
            Reiniciar lista
          </button>
        </div>
        <div className="mt-4">
          <div
            className={`card mt-3 ${participants.length !== 0 ? "" : "d-none"}`}
          >
            <div className="card-header bg-primary text-white">
              <h3 className="card-title">Participantes</h3>
            </div>
            <div className="card-body">
              <div className="row">
                {participants.map((participant: any, index: any) => (
                  <div key={index} className="col-md-6 mb-2">
                    <div className="list-group-item">
                      {" "}
                      <b> {participant.option}</b>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
