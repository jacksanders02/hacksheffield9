import React from "react";
import {BarBackground} from "@/components/barBackground";
import {Judge} from "@/components/Judge";

export default function Lobby({
  username,
  nextRound
}: {
  username: string;
  nextRound: () => void
}) {
  return (
    <>
      <div className="relative min-h-[100dvh] overflow-hidden">
        <BarBackground/>
        <div className="w-full bg-black p-5 bg-opacity-50 flex flex-row items-center justify-end">
          <button
            onClick={nextRound}
            className="bg-gray-900 text-white text-4xl px-4 py-2"
          >
            {"start game"}
          </button>
        </div>
        <div className="p-5 pb-0">
          <h1 className="text-4xl text-white text-shadow-effect">meet your judges</h1>
          <div className="flex flex-row space-x-5">
            <Judge name="Countess Crookes" description="Professional and successful entrepreneur with expert knowledge"
                   imgLink="countess.png"/>
            <Judge name="Sue Stainability"
                   description="Cares about sustainability and inclusivity in business solutions"
                   imgLink="sue.png"/>
            <Judge name="Dave O' Pub"
                   description="Always drunk, enjoys the pub, and gives honest opinions on business ideas"
                   imgLink="dave.png"/>
            <Judge name="Tiny Tim" description="Very naive and enjoys humour in business solutions"
                   imgLink="child.png"/>
          </div>
        </div>
        <div className="p-5">
          <h1 className="text-4xl text-white text-shadow-effect">players (1)</h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
            <div className="text-white text-shadow-effect text-3xl flex items-center justify-center">
              <img className="h-[20px] max-w-full object-contain mr-2" src="/conn_status.png" alt="good connection"/>
              {username}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}