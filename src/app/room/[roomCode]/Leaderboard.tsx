import {BarBackground} from "@/components/barBackground";
import React from "react";

interface PlayerScores {
  username: string;
  score: number;
}

export default function Leaderboard({
  players
}: {
  players: PlayerScores[]
}) {
  players.sort((a, b) => a.score - b.score);
  return (
    <>
      <div className="relative min-h-[100dvh] overflow-hidden flex flex-col items-center justify-center gap-y-4">
        <BarBackground />
        <h1 className="text-4xl text-white text-shadow-effect mb-11">Results</h1>
        <div className="result bg-gray-900 w-[90%] h-20 flex items-center text-white text-4xl px-4">
          <div className="w-1/6 text-left">1st</div>
          <div className="w-2/3 text-center truncate">{players[0].username}</div>
          <div className="w-1/6 text-right">£{players[0].score}</div>
        </div>
        {(players.length > 1) && (
          <div className="result bg-gray-900 w-[90%] h-20 flex items-center text-white text-4xl px-4">
            <div className="w-1/6 text-left">2nd</div>
            <div className="w-2/3 text-center truncate">{players[1].username}</div>
            <div className="w-1/6 text-right">£{players[1].score}</div>
          </div>
        )}
        {(players.length > 2) && (
          <div className="result bg-gray-900 w-[90%] h-20 flex items-center text-white text-4xl px-4">
            <div className="w-1/6 text-left">3rd</div>
            <div className="w-2/3 text-center truncate">{players[2].username}</div>
            <div className="w-1/6 text-right">£{players[2].score}</div>
          </div>
        )}
      </div>
    </>
  )
}