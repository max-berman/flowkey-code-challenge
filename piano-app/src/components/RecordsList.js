import React from "react";

const ulStyle = {
  display: "flex",
  padding: 0,
  flexDirection: "column",
};
const liStyle = {
  margin: 0,
  padding: "0 4px",
  listStyle: "none",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: 16,
  height: 36,
};

function RecordsList({ recordings, playRecord, cancelAllPlayRecords, isRecording, isPianoLoaded }) {
  function handlePlayOnClick(notes) {
    cancelAllPlayRecords();
    playRecord(notes);
  }
  const showList = recordings.length > 0 && !isRecording && isPianoLoaded;

  return (
    <div style={{ width: "50%" }}>
      {showList && (
        <div>
          <h4>Records List</h4>
          <ul style={ulStyle}>
            {recordings.map(({ keyStrokes, title }, i) => (
              <li
                key={i}
                style={{
                  backgroundColor: i % 2 === 0 ? "#f6f5f3" : "transparent",
                  ...liStyle,
                }}
              >
                <div>{title === "" ? "default" : title}</div>
                <input
                  type="button"
                  value="Play"
                  onClick={() => {
                    handlePlayOnClick(keyStrokes);
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecordsList;
