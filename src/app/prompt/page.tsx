"use client";  // Explicitly mark this as a Client Component

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BarBackground } from "@/components/barBackground";

const EnterNamePage = () => {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const router = useRouter();

  useEffect(() => {
    const roomCode = sessionStorage.getItem("roomCode");  // Retrieve room code from session storage

    if (roomCode === null) {
      router.push("/");
      return;
    }

    setRoomCode(roomCode);
  }, []);

  // You can modify the progress as needed, here it's a fixed example
  const progress = 50;  // Represents 50% progress for demo purposes

  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        <BarBackground />
        <div className="w-full bg-black p-5 bg-opacity-50 flex flex-row items-center justify-between min-h-[96px]">
          <h1 className="text-4xl text-white text-shadow-effect">prompt: a bank for bears</h1>
        </div>
        {/* Progress bar placed below the header */}
        <div className="w-full h-1 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex flex-row w-full">
          {/* Additional content goes here */}
        </div>
      </div>
    </>
  );
};

export default EnterNamePage;
