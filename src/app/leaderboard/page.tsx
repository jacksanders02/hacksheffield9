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

  return (
    <>
      <div className="relative min-h-[100dvh] overflow-hidden flex flex-col items-center justify-center gap-y-4">
        <BarBackground />
        <h1 className="text-4xl text-white text-shadow-effect mb-11">Results</h1>
        <div className="result bg-gray-900 w-[90%] h-20 flex items-center text-white text-4xl px-4">
          <div className="w-1/6 text-left">1st</div>
          <div className="w-2/3 text-center truncate">jackb</div>
          <div className="w-1/6 text-right">£300</div>
        </div>
        <div className="result bg-gray-900 w-[90%] h-20 flex items-center text-white text-4xl px-4">
          <div className="w-1/6 text-left">2nd</div>
          <div className="w-2/3 text-center truncate">james march</div>
          <div className="w-1/6 text-right">£300</div>
        </div>
        <div className="result bg-gray-900 w-[90%] h-20 flex items-center text-white text-4xl px-4">
          <div className="w-1/6 text-left">3rd</div>
          <div className="w-2/3 text-center truncate">jack sn</div>
          <div className="w-1/6 text-right">£300</div>
        </div>
      </div>
    </>
  );
};

export default EnterNamePage;
