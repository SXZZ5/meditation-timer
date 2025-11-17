import { useState, useRef } from "react";
import "./App.css";

function App() {
    return <>
      <h2>Legendary meditation timer</h2>
      <h6>Because ek interval bell ke liye paisa maang rhe hain app waale</h6>
      <Timer />
    </>;
}

function Timer() {
    const remseconds = useRef(0);
    const targetModSeconds = useRef(0);
    const [displayTime, setDisplayTime] = useState("00:00")
    const [displayBellInterval, setDisplayBellInteval] = useState(5);
    const intervalId = useRef(-1);
    const [playing, setPlaying] = useState(false);
    const bellInterval = useRef(300);

    function prepareDisplayTime(rem) {
      // debugger;
      const minutes = Math.floor(rem/60);
      const seconds = rem%60;
      let minuteString = (minutes < 10) ? "0" : "";
      minuteString += minutes.toString();
      let secondString = (seconds < 10) ? "0" : "";
      secondString += seconds.toString();
      setDisplayTime(minuteString + ":" + secondString)
      console.log(minuteString + ":" + secondString)
    }

    function pauseTimer() {
      console.assert(intervalId.current >= 0);
      clearInterval(intervalId.current);
      setPlaying(false);
    }
    function startTimer(){
      intervalId.current = setInterval(() => {
        remseconds.current = remseconds.current - 1;
        if(remseconds.current < 0) {
          debugger;
          playExitSounds();
          pauseTimer();
        } else {
          prepareDisplayTime(remseconds.current)
          const curMod = remseconds.current % bellInterval.current;
          if(curMod === targetModSeconds.current && remseconds.current >= 3) {
            playChime();
          }
        }
      }, 1000)
      setPlaying(true);
      playExitSounds();
    }
    function updateRemseconds(e){
      debugger;
      if(playing) return;
      const minutesTime = Number(e.target.value);
      remseconds.current = minutesTime * 60;
      targetModSeconds.current = remseconds.current % bellInterval.current;
      prepareDisplayTime(remseconds.current);
      e.stopPropagation();
    }

    function updateBellInterval(e){
      if(playing) return;
      const minutesTime = Number(e.target.value);
      setDisplayBellInteval(minutesTime);
      bellInterval.current = minutesTime * 60;
      targetModSeconds.current = remseconds.current % bellInterval.current;
      e.stopPropagation();
      return;
    }

    return (
        <>
            <h1>{displayTime}</h1>
            <h5>Bell every {displayBellInterval} minutes</h5>
            <input type="text" placeholder="Input Time in minutes" onChange={updateRemseconds}/>
            <br></br>
            <br></br>
            <button onClick={startTimer}>Play</button>
            <sp>             </sp>
            <button onClick={pauseTimer}>Pause</button>
            <br></br>
            <br></br>
            <input type="text" placeholder="Bell every ___ minutes" onChange={updateBellInterval}/>
        </>
    );
}

function playExitSounds(){
  const sound = new URL("./assets/sounds/start_stop_bell.mp3", import.meta.url)
  new Audio(sound.href).play()
}
function playChime(){
  const sound = new URL("./assets/sounds/interval_bell.mp3", import.meta.url)
  new Audio(sound.href).play()
}


export default App;
