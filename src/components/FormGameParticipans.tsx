export const FormGameParticipans = ({
  handleAddParticipant,
  newParticipant,
  setNewParticipant,
}: any) => {
  return (
    <>
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
    </>
  );
};
