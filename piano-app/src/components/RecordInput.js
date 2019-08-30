import React, { useState } from "react";

const cStyle = {
  display: "flex",
  padding: "8px 16px",
};
const inputButtonStyle = {
  height: "32px",
  display: "block",
  padding: "4px 8px",
  margin: "0 4px",
  borderRadius: "6px",
  border: "1px solid #888",
  cursor: "pointer",
};
const inputStyle = {
  height: "inherit",
  display: "block",
  padding: "0 4px",
  borderRadius: "6px",
  border: "1px solid #888",
};

function RecordInput({ playRecord, cancelPlayRecord, recordedNotes, recordings, setRecordings }) {
  const [recordName, setRecordName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);

  function handlePlayOnClick() {
    playRecord(recordedNotes);
  }

  function handleSaveOnClick() {
    if (recordName === "") {
      setIsNameValid(false);
      return;
    }

    //setRecordings(recordings.concat({ keyStrokes: recordedNotes, name: recordName }));
    setRecordings(recordName, recordedNotes);

    handleCancelOnClick();
  }

  function handleCancelOnClick() {
    cancelPlayRecord(recordedNotes);
  }

  function handleRecordNameChange({ target: { value } }) {
    setRecordName(value);
  }

  return (
    <div style={cStyle}>
      <input style={inputButtonStyle} type="button" value="▶︎" onClick={handlePlayOnClick} />
      <input
        style={{ borderColor: recordName === "" && !isNameValid && "red", ...inputStyle }}
        placeholder="Give It a Name"
        value={recordName}
        onChange={handleRecordNameChange}
        autoFocus
      />
      <input style={inputButtonStyle} type="button" value="Save" onClick={handleSaveOnClick} />
      <input style={inputButtonStyle} type="button" value="Cancel" onClick={handleCancelOnClick} />
    </div>
  );
}

export default RecordInput;
