"use client";  // Explicitly mark this as a Client Component

import React, {useState} from "react";
import { BarBackground } from "@/components/barBackground";

const EnterNamePage = ({ enterName }: { enterName: (username: string) => void }) => {
  const [username, setUsername] = useState("");

  const joinRoom = () => {
    // Button sound effect
    const audioButtonInstance = new Audio("soundtracks/button.mp3");
    document.querySelectorAll('audio').forEach(el => el.pause());
    audioButtonInstance.play().catch((error) => {
      console.error("Audio playback error:", error);
    });

    if (username !== null && username.trim()) {
      fetch('/api/join-room', {
        method: "POST",
        body: JSON.stringify({
          roomCode: "00000",
          username: username,
        }),
      }).then(() => {
        enterName(username);
      })
    } else {
      alert("enter username");
    }
  }

  return (
    <>
      <div className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
        <BarBackground/>
        <div className="mb-1">
          <img
            src="growth_logo.png"
            alt="Growth Logo"
            className="h-[320px] max-w-full px-5 object-contain"
          />
        </div>
        <h1 className="text-4xl text-white text-shadow-effect mb-11">what should we call you?</h1>
        <div className="flex gap-1 w-[90%] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <input
            type="text"
            className="p-2 mr-2 text-4xl w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your name"
            spellCheck={false}
          />
          <button
            className="bg-gray-900 text-white text-4xl px-4 py-2"
            onClick={joinRoom}
          >
            submit
          </button>
        </div>
        <div className="mt-11 mb-11">
          <img
            src="hacksheffield_logo.png"
            alt="Made for Hacksheffield9"
            className="h-[45px] w-auto"
          />
        </div>
      </div>
    </>
  );
};

export default EnterNamePage;
