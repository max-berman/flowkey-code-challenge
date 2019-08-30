import React from "react";
import { Piano as ReactPiano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import SoundfontProvider from "./SoundfontProvider";
import "react-piano/dist/styles.css";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

const noteRange = {
    first: MidiNumbers.fromNote("c3"),
    last: MidiNumbers.fromNote("f4"),
};
const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first,
    lastNote: noteRange.last,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

function Piano({ isRecording, recordedNotes, setRecordedNotes, activeNotes, setIsPianoLoaded }) {
    // function onStopNoteInput(e, { prevActiveNotes }) {
    //     if (isRecording) {
    //         console.log(e, prevActiveNotes);
    //     }
    // }
    function onPlayNoteInput(e, { prevActiveNotes }) {
        if (isRecording) {
            setRecordedNotes(recordedNotes.concat([e]));
        }
    }
    return (
        <SoundfontProvider
            instrumentName="acoustic_grand_piano"
            audioContext={audioContext}
            hostname={soundfontHostname}
            render={({ isLoading, playNote, stopNote, stopAllNotes }) => {
                if (!isLoading) {
                    setIsPianoLoaded(true);
                }
                return isLoading ? (
                    <div>Piano is Loading...</div>
                ) : (
                    <div>
                        <ReactPiano
                            disabled={isLoading}
                            noteRange={noteRange}
                            playNote={playNote}
                            stopNote={stopNote}
                            width={1000}
                            activeNotes={activeNotes}
                            keyboardShortcuts={isRecording ? keyboardShortcuts : []}
                            onPlayNoteInput={onPlayNoteInput}
                            //onStopNoteInput={onStopNoteInput}
                        />
                    </div>
                );
            }}
        />
    );
}

export default Piano;
