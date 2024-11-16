// app/page.tsx
"use client";  // Need to use client for useRouter navigation

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [roomCode, setRoomCode] = useState("");
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // assuming rn the code has to be 5 chars long (like burkes mockups)
  const handleJoin = () => {
    if (roomCode.length === 5) {
      // Store the room code in session storage or pass via query
      sessionStorage.setItem("roomCode", roomCode);
      router.push("/enter-name"); // Redirect to the name input page
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.error("Failed to play music:", err);
        });
      }
    } else {
      alert("Please enter a valid 5-digit room code."); // change to in page error later
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-6 items-center justify-center space-y-2">
      
      <div>
        <audio ref={audioRef} src="/soundtracks/loading_menu.mp3" autoPlay loop hidden />
      </div>

      <h1 className="text-4xl font-bold">Growth!</h1>
      <p className="text-lg">Enter a room code or create a new room :D</p>

      {/* Input for room code */}
      <div className="flex gap-1">
        <input
          type="text"
          className="border border-gray-300 rounded p-2 mr-2"
          maxLength={5}
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleJoin}
        >
          Join
        </button>
      </div>


      {/* TODO Button to create a new game */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Game (TODO)
      </button>
    </main>
  );
};

export default HomePage;
