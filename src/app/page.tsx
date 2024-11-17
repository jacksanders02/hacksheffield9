"use client";
import React, {useEffect, useState} from "react";
import QuestionTime from "@/app/QuestionTime";
import Lobby from "@/app/Lobby";
import Leaderboard from "@/app/Leaderboard";
import EnterNamePage from "@/app/EnterName";

const RoomPage: React.FC = () => {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState("");
  const [audio, setAudio] = useState<HTMLAudioElement>();

  useEffect(() => {
    setAudio(new Audio("../soundtracks/button.mp3"));
  }, []);

  const advanceRound = () => {
    audio?.play().catch((error) => {
      console.error("Audio playback error:", error);
    });

    fetch(`/api/advance-round?roomCode=00000`).then(res => {
      if (res.status !== 200){
        throw new Error("no")
      }
      return res.text();
    }).then(data => setRound(parseInt(data)));
  }

  if (!username || !username.trim()) {
    return (
      <EnterNamePage enterName={setUsername} />
    )
  }

  return (
    <>
      {(round === 0) && (
        <Lobby
          username={username}
          nextRound={advanceRound}
        />
      )}

      {(round > 0) && (
        <QuestionTime
          username={username}
          score={score}
          addScore={(newScore: number) => setScore(score + newScore)}
          roundNumber={round}
          nextRound={advanceRound}
        />
      )}

      {(round < 0) && (
        <Leaderboard
          players={[{
            username,
            score: score,
          }]}
        />
      )}
    </>
  )
};

export default RoomPage;
