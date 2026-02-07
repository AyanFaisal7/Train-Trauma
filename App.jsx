import { useState, useEffect } from 'react'
import './App.css'

let arr = [1, 0, 1, 1, 0, 0, 0, 1]


function Game() {
  let [count, setCount] = useState(0)
  let [gasMask, setGasMask] = useState(5)
  let [isDisabled, setIsDisabled] = useState(false);
  let [stopBtn, setStopBtn] = useState(0)
  let [gasMaskUsed, setGasMaskUsed] = useState(false)
  let [enteredCompartment, setEnteredCompartment] = useState(0)
  let [phase, setPhase] = useState("playing")
  const [countdown, setCountdown] = useState(3);
  const [countdownGas, setCountdownGas] = useState(0);

  // console.log(enteredCompartment)

  useEffect(() => {
    if (gasMask < 0) {
      setIsDisabled(true);
    }
  }, [gasMask])

  useEffect(() => {
    if (phase !== "countdown") return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(timer);
          setPhase("result");
          alert(countdownGas === 1 ? "poison" : "normal");
          return 3;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  // console.log(arr.length)
  const gasType = arr[count]
  // console.log(gasType)
  return (
    <>
      <div>
        <div className={`game ${phase === "countdown" ? "blur" : ""}`}>
          {/* normal game UI here */}
          {/* TRAIN COMPARTMENTS */}
          {stopBtn >= 1 ? <h1>Compartment {stopBtn}</h1> : null}
          {stopBtn < 8 ? <button
            onClick={() => {
              const currentGas = arr[count];
              setIsDisabled(gasMask > 0 ? false : true);
              setStopBtn(prev => prev + 1)
              // console.log(stopBtn)
              setCount(prev => prev + 1)
              setGasMaskUsed(false)
              setEnteredCompartment(prev => prev + 1)
              setPhase("countdown")
              console.log(
                gasType === 1 && gasMaskUsed
                  ? "bachaw ap safe ho"
                  : gasType === 0
                    ? "bachaw ap safe ho cuz normal gas"
                    : "bachaw apki fielding set hai"
              );
              // console.log(
              //  gasType === 1 && !gasMaskUsed ? "bachaw u lost" : null
              // ) (losing condition)
                setCountdownGas(currentGas); 
            }}
            disabled={stopBtn === 8}
          >move to compartment {stopBtn + 1}</button> : <button
            disabled={stopBtn === 8} >end of game</button>}


          {/* USER */}
          <p>you have {gasMask} gas masks left . If u want to use the gas mask for the next compartment pls click the button below</p>

          <button
            onClick={() => {
              setIsDisabled(true)
              if (gasMask === 0) return;
              setGasMask(prev => prev - 1)
              setGasMaskUsed(true)
            }}
            disabled={isDisabled}
          >use gas mask</button>
          {/* {console.log(gasMask)} */}
        </div>
        {phase === "countdown" && (
          <div className="overlay">
            <h1>Gas is releasing in {countdown}</h1>
          </div>)}
      </div>
    </>
  )
}

function App() {
  const [start, setStart] = useState(false);
  return (
    <>
      {!start && (
        <>
          <h1>TRAIN TRAUMA</h1>
          <p>  welcome to the game of train trauma inspired by alice in borderland season 3 . Read this before you start the game <br /> first you will be outside of the very first compartment to go in the compartment you must choose wether u want to wear a gas mask or no because in every compartment there will be a gas released which can be either poisonous or completely safe <br /> u will have total of 5 gas masks and the poisonous air will be released in only 4 of the total 8 compartments so make your choice wisely <br />if u use ur gas masks wisely n reach till the 8th compartment u will succeed but if u run out of ur gas masks or do not use gas mask when the poison gas will release its a game over for u <br />
            <b>In order to start the game pls press the button below </b> </p>
          <button onClick={() => setStart(true)}>Start the game</button>
        </>
      )}

      {start && <Game />}
    </>
  );
}
export default App
