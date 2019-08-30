import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";

import "./App.css";
import Piano from "./components/Piano";
//import RecordTimer from "./components/RecordTimer";
import RecordButton from "./components/RecordButton";
import RecordsList from "./components/RecordsList";
import RecordInput from "./components/RecordInput";

// events: [],
// currentTime: 0,
// currentEvents: []

/* 
  key,
  time,
  span,
*/

let playTimeOut = [];
const ALL_SONGS_QUERY = gql`
  query {
    songs {
      _id
      title
      keyStrokes
    }
  }
`;

const MUTATION = gql`
  mutation AddSong($title: String, $keyStrokes: [Int]) {
    addSong(title: $title, keyStrokes: $keyStrokes) {
      _id
      title
      keyStrokes
    }
  }
`;

function App() {
  const [isPianoLoaded, setIsPianoLoaded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeNotes, setActiveNotes] = useState([]);
  const [recordedNotes, setRecordedNotes] = useState([]);
  const { loading, error, data, refetch } = useQuery(ALL_SONGS_QUERY);
  const [addSong] = useMutation(MUTATION);

  function setRecordings(title, keyStrokes) {
    addSong({ variables: { title, keyStrokes } });
    refetch();
  }

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
    recordings.forEach(({ keyStrokes }) => {
      cancelPlayRecord(keyStrokes);
    });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  const { songs: recordings } = data;
  const props_ = {
    isPianoLoaded,
    playRecord,
    cancelPlayRecord,
    recordedNotes,
    recordings,
    setRecordings,
    setRecordedNotes,
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
        <RecordInput {...props_} />
      ) : (
        <RecordButton {...props_} />
      )}
      <Piano {...props_} />
      <RecordsList {...props_} />
    </div>
  );
}

export default App;
