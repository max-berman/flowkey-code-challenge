import React from "react";

function RecordButton({
  isRecording,
  setIsRecording,
  setRecordedNotes,
  setActiveNotes,
  cancelAllPlayRecords,
  isPianoLoaded,
}) {
  const style = {
    display: "flex",
    padding: "8px 16px",
    borderRadius: 6,
    border: "1px solid #888",
    lineHeight: 1,
    cursor: "pointer",
    backgroundColor: isRecording ? "#fff" : "#fff",
    color: isRecording ? "red" : "#000",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    outline: "none",
    margin: 8,
  };

  const label = isRecording ? "■" : "●";
  function handleOnClick() {
    cancelAllPlayRecords();
    if (!isRecording) setRecordedNotes([]);
    setIsRecording(!isRecording);
    setActiveNotes([]);
  }
  return (
    isPianoLoaded && (
      <input
        type="button"
        disabled={!isPianoLoaded}
        value={label}
        style={style}
        onClick={handleOnClick}
      />
    )
  );
}

export default RecordButton;
