"use client"; // Explicitly mark this as a Client Component

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BarBackground } from "@/components/barBackground";

const EnterNamePage = () => {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [response, setResponse] = useState(""); // State for the textarea content
  const router = useRouter();

  useEffect(() => {
    const roomCode = sessionStorage.getItem("roomCode"); // Retrieve room code from session storage

    if (roomCode === null) {
      router.push("/");
      return;
    }

    setRoomCode(roomCode);
  }, []);

  const progress = 50; // Represents 50% progress for demo purposes

  const maxCharacters = 140;

  return (
    <>
      <div className="relative min-h-[100dvh] overflow-hidden flex flex-col">
        <BarBackground />
        <div className="w-full bg-black p-5 bg-opacity-50 flex flex-row items-center justify-between min-h-[96px]">
          <h1 className="text-4xl text-white text-shadow-effect">prompt: a bank for bears das dsa dsasda </h1>
        </div>
        {/* Progress bar placed below the header with transparent background and white bar */}
        <div className="w-full h-1 bg-transparent overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {/* Center the textarea */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="w-[80%] flex justify-end text-white text-shadow-effect text-3xl">
            {response.length}/{maxCharacters}
          </div>
          <textarea
            className="p-4 text-4xl w-[80%] h-[300px] resize-none"
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
          >
          submit
          </button>
        </div>
      </div>
    </>
  );
};

export default EnterNamePage;
