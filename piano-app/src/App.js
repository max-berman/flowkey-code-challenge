import React, { useState } from "react";
import "./App.css";
import Piano from "./components/Piano";
//import RecordTimer from "./components/RecordTimer";
import RecordButton from "./components/RecordButton";
import RecordsList from "./components/RecordsList";
import RecordInput from "./components/RecordInput";

// events: [],
// currentTime: 0,
// currentEvents: []

let playTimeOut = [];

function App() {
    const [isPianoLoaded, setIsPianoLoaded] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [activeNotes, setActiveNotes] = useState([]);
    const [recordedNotes, setRecordedNotes] = useState([]);
    const [recordings, setRecordings] = useState([
        { name: "max", midiNums: [48, 50, 52, 53, 54, 57] },
        { name: "macky", midiNums: [48, 50, 52, 53, 54, 57] },
        { name: "Fill", midiNums: [48, 50, 52, 53, 54, 57] },
        { name: "Rocky", midiNums: [48, 50, 52, 53, 54, 57] },
        { name: "Smokey", midiNums: [48, 50, 52, 53, 54, 57] },
    ]);
    const status = isRecording ? (
        <span style={{ color: "red" }}> Recording</span>
    ) : (
        <span>React Piano</span>
    );

    function playRecord(notes) {
        notes.forEach((note, i) => {
            playTimeOut[i] = setTimeout(() => {
                setActiveNotes([note]);
            }, i * 500);
        });
    }
    function cancelPlayRecord(notes) {
        if (!isRecording) {
            setActiveNotes([]);
            setRecordedNotes([]);
        }
        notes.forEach((note, i) => {
            clearTimeout(playTimeOut[i]);
        });
    }
    function cancelAllPlayRecords() {
        recordings.forEach(({ midiNums }) => {
            cancelPlayRecord(midiNums);
        });
    }
    const props = {
        isPianoLoaded,
        playRecord,
        cancelPlayRecord,
        recordedNotes,
        setRecordedNotes,
        recordings,
        setRecordings,
        isRecording,
        setIsRecording,
        activeNotes,
        setActiveNotes,
        cancelAllPlayRecords,
        setIsPianoLoaded,
    };
    return (
        <div className="App">
            <h1>{status}</h1>
            {!isRecording && recordedNotes.length > 0 ? (
                <RecordInput {...props} />
            ) : (
                <RecordButton {...props} />
            )}
            <Piano {...props} />
            <RecordsList {...props} />
        </div>
    );
}

export default App;
