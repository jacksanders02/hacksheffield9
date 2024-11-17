import React, {useEffect, useRef, useState} from "react";
import { useRouter} from "next/navigation";
import {BarBackground} from "@/components/barBackground";

interface JudgeAnswer {
  response: string;
  value: string;
  loaded: boolean;
  moneyAdded: boolean;
}

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>(() => {});

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const judges = [
  "countess",
  "dave",
  "child",
  "sue"
]

const judgeProperNames = [
  "Countess of Crookes",
  "Dave O' Pub",
  "Tiny Tim",
  "Sue-Stainability",
]

export default function QuestionTime({
  username,
  score,
  addScore,
  roundNumber,
  nextRound
}: {
  username: string;
  score: number;
  addScore: (newScore: number) => void;
  roundNumber: number;
  nextRound: () => void;
}){
  const [judge, setJudge] = useState(0);
  const [theme, setTheme] = useState("loading...");
  const [time, setTime] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState(""); // State for the textarea content
  const [moneyAudio, setMoneyAudio] = useState<HTMLAudioElement>();

  useEffect(() => {
    setMoneyAudio(new Audio("../soundtracks/gain_money.mp3"));
  }, []);

  const baseArray = Array(4).fill(undefined).map(() => ({
    response: "",
    value: "",
    loaded: false,
    moneyAdded: false,
  }));
  const [answers, setAnswers] = useState<JudgeAnswer[]>(baseArray);
  const router = useRouter();

  const submitAnswer = (inferenceJudge: number) => {
    setSubmitted(true);
    fetch('/api/submit-answer', {
      method: "POST",
      body: JSON.stringify({
        judge: judges[inferenceJudge],
        theme,
        plan: response,
      })
    }).then(response => response.json())
      .then(json => {
        const { response, value } = json;
        const newAnswers = [...answers];
        newAnswers[inferenceJudge].response = response;
        newAnswers[inferenceJudge].value = value;
        newAnswers[inferenceJudge].loaded = true;
        setAnswers(newAnswers);
        if (inferenceJudge < judges.length - 1) {
          submitAnswer(inferenceJudge + 1);
        }
      });
  }

  const incrementJudge = () => {
    moneyAudio?.play().catch((error) => {
      console.error("Audio playback error:", error);
    });
    setJudge(judge + 1);
  }

  useEffect(() => {
    fetch(`/api/get-theme?roomCode=00000`)
    .then(res => res.text())
      .then(setTheme)

    setTime(0)
    setSubmitted(false)
    const baseArray = Array(4).fill(undefined).map(() => ({
      response: "",
      value: "",
      loaded: false,
      moneyAdded: false,
    }));
    setAnswers(baseArray);
    setJudge(0)
    setResponse("")
  }, [roundNumber, router]);

  useEffect(() => {
    if (answers[judge].loaded && !answers[judge].moneyAdded) {
      addScore(parseInt(answers[judge].value))
      answers[judge].moneyAdded = true;
    }
  }, [answers, judge]);

  useInterval(() => {
    setTime(time + 100);
  }, 100)
  const maxCharacters = 140;

  return (
    <>
      <div className="relative min-h-[100dvh] overflow-hidden flex flex-col">
        <BarBackground />
        <div className="w-full bg-black p-5 bg-opacity-50 flex flex-row items-center justify-between min-h-[96px]">
          <h1 className="text-4xl text-white text-shadow-effect">prompt: {theme.toLowerCase()}</h1>
        </div>
        {!submitted && (
          <>
            {/* Progress bar placed below the header with transparent background and white bar */}
            <div className="w-full h-1 bg-transparent overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${(time / 30_000) * 100}%` }}
              >
              </div>
            </div>
            {/* Center the textarea */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="w-[90%] flex justify-end text-white text-shadow-effect text-3xl">
                {response.length}/{maxCharacters}
              </div>
              <textarea
                className="p-4 text-4xl w-[90%] h-[300px] resize-none"
                placeholder="your response"
                spellCheck={false}
                value={response}
                onChange={(e) => {
                  // Restrict to maximum characters
                  if (e.target.value.length <= maxCharacters) {
                    setResponse(e.target.value);
                  }
                }}
              ></textarea>
              <button
                className="bg-gray-900 text-white text-4xl px-4 py-2"
                onClick={() => submitAnswer(judge)}
              >
                Submit
              </button>
            </div>
          </>
        )}
        {submitted && !answers[judge].loaded && (
          <>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-white text-shadow-effect text-3xl">loading judgement...</p>
            </div>
          </>
        )}
        {submitted && answers[judge].loaded && (
          <>
            <div className="flex flex-row w-full">
              {/* Absolute positioning for user-status-list */}
              <div className="user-status-list absolute top-26 left-0 p-4 z-10 opacity-70 sm:opacity-100">
                <div className="user-status">
                  <div className="text-white text-shadow-effect text-3xl flex items-center justify-start">
                    <img className="h-[20px] max-w-full object-contain mr-2" src="/conn_status.png"/>
                    {username}
                  </div>
                  <div className="text-4xl text-yellow-500 text-shadow-effect pl-[28px]">£{score}</div>
                </div>
              </div>

              {/* Judge Output */}
              <div className="judge-output ml-2 p-4 z-0 sm:ml-32 md:ml-32 lg:ml-36 xl:ml-auto">
                <div className="p-4 w-full max-w-[600px]">
                  <div className="speech-bubble sm:min-h-[500px] p-4 bg-white speech-box flex flex-col">
                    <div className="text-base sm:text-2xl flex-grow">
                      {judgeProperNames[judge]} says... {answers[judge].response}
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <img src={`/characters/${judges[judge]}.png`} className="h-[60px] sm:h-[120px]"/>
                      <div className="ml-auto text-6xl text-yellow-500 text-shadow-effect">£{answers[judge].value}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="user-prompt p-8 hidden lg:block xl:mr-auto">
                <img src="/clipboard.png" className="mx-auto -m-4 block h-[56px]"/>
                <div className="clipboard-border w-[300px] p-4 h-96 text-2xl text-center">
                  <span>{username}&#39;s business plan</span>
                  <hr className="bg-[#606384] h-[3px] my-2"/>
                  {response}
                </div>
              </div>
            </div>

            {/* Next Button - Align to the far right on lg screens and up */}
            <div className="p-4 w-full justify-center flex mt-4">
              {judge < judges.length - 1 ? (
                <button
                  className="bg-gray-900 text-white text-4xl px-4 py-2"
                  onClick={incrementJudge}
                >
                  Next Judge
                </button>
              ) : (
                <button
                  className="bg-gray-900 text-white text-4xl px-4 py-2"
                  onClick={nextRound}
                >
                  Next Theme
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};