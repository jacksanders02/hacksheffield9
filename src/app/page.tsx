"use client"; // Ensure client-side rendering

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BarBackground } from "@/components/barBackground";


const HomePage = () => {
  const [roomCode, setRoomCode] = useState<string>(""); // Room code as string
  const router = useRouter();

  const handleJoin = () => {
    if (roomCode.length === 5) {
      // Store the room code in session storage or pass via query
      sessionStorage.setItem("roomCode", roomCode);
      router.push("/enter-name"); // Redirect to the name input page
    } else {
      alert("Please enter a valid 5-digit room code.");
    }
  };

  return (
    
    <>
      <BarBackground />

      <div className="mb-1 z-10">
        <img src="growth_logo.png" alt="Growth Logo" className="h-[320px] max-w-full px-5 object-contain" />
      </div>

      {/* Input for room code */}
      <div className="flex gap-1 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl z-10">
        <input
          type="text"
          className="p-2 mr-2 text-4xl w-full"
          maxLength={5}
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder="Enter room code"
          spellCheck={false}
        />
        <button
          className="bg-gray-900 text-white text-4xl px-4 py-2"
          onClick={handleJoin}
        >
          Join
        </button>
      </div>
      <p className="text-3xl text-white text-shadow-effect z-10">or</p>
      <div className="flex gap-1 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl z-10">
        <button className="bg-gray-900 text-white text-4xl px-4 py-2 w-full">
          Create Game (TODO)
        </button>
      </div>
      <div className="mt-11 mb-11 z-10">
        <img src="hacksheffield_logo.png" alt="Made for Hacksheffield9" className="h-[45px] w-auto" />
      </div>
    </>
  );
};

export default HomePage;
