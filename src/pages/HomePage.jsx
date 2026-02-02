import flipACoin from "../utils/flipACoin";
import { useRef, useState, useEffect } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import "../styles/HomePage.css";

function HomePage() {
  const [phase, setPhase] = useState("idle");
  const [result, setResult] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [userChoice, setUserChoice] = useState(null);

  const timeRef = useRef(null);

  const startChoosing = () => {
    setPhase("choosing");
    setUserChoice(null);
    setResult(null);
    setCountdown(5);

    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
    timeRef.current = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

  };

  const revealResult = (c) => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }

    setUserChoice(c);

    const coinResult = flipACoin(c);
    setResult(coinResult);
    setPhase("result");
  };

  useEffect(() => {
    if (phase === "choosing" && countdown === 0) {
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }

      const coinResult = flipACoin();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResult(coinResult);
      setPhase("result");
    }
  }, [countdown, phase]);


  const handlePick = (c) => {
    if (phase !== "choosing") return;
    setUserChoice(c);
    revealResult(c);
  }

  const reset = () => {
    if (timeRef.current) clearInterval(timeRef.current);
    setPhase("idle");
    setResult(null);
    setUserChoice(null);
    setCountdown(5);
  };


  return (
    <div className="page-container">
      <div className="page-header">
        <h1>FlipIt</h1>
      </div>
      <div className="form-container">
        <p className="subtitle">Toss a Coin to a Witcher ! 🪙</p>

        <div className="animation-container">

          {result === null ? (
            <DotLottieReact
              src={
                phase === "idle"
                  ? "/animation/homeflip.lottie"
                  : "/animation/continousflip.lottie"
              }
              loop
              autoplay
            />
          ) : (
            <img className="final-coin"
              src={result === "heads" ? "/heads_img.png" : "/tails_img.png"}
              alt="Coin Result"
            />
          )}

        </div>

        {phase === "choosing" && (
          <>
            <p className="subtitle" style={{ marginTop: 10, opacity: 0.8 }}>
              Pick within <b>{countdown}</b> seconds!
            </p>
            <div className="choice-row">
              <button className="btn btn-glass" value={"heads"} onClick={() => { handlePick("heads") }} >HEADS</button>

              <button className="btn btn-glass" value={"tails"} onClick={() => { handlePick("tails") }} >TAILS</button>
            </div>
          </>
        )}

        {phase === "result" && (
          <div className="result-container">
            <div style={{ marginTop: 15, textAlign: "center" }}>
              {userChoice === null ? (
                <p className="subtitle">
                  ⏳ You didn’t pick in time… But it landed on {" "}<b>{result?.toUpperCase()}</b>!
                </p>
              ) : userChoice === result ? (
                <p className="subtitle">
                  🎉 You picked <b>{userChoice.toUpperCase()}</b> and it landed on {" "}<b>{result?.toUpperCase()}</b>! You win!
                </p>
              ) : (
                <p className="subtitle">
                  😞 You picked <b>{userChoice.toUpperCase()}</b> but it landed on {" "}<b>{result?.toUpperCase()}</b>. You lose!
                </p>
              )}

              <button className="btn btn-glass purple" style={{ marginTop: 10 }} onClick={reset}> Try Again</button>
            </div>
          </div>
        )}

        {phase === "idle" && (
          <div className="flip-container">
            <button
              className="btn btn-glass-purple"
              onClick={() => {
                startChoosing()
              }}
            >
              Flip a Coin
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default HomePage;
