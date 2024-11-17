"use client"; // Ensure client-side rendering

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BarBackground } from "@/components/barBackground";

let audioInstance: HTMLAudioElement | null = null; // Global variable to track the audio instance

const HomePage = () => {
  const [roomCode, setRoomCode] = useState<string>(""); // Room code as string
  const router = useRouter();

  const handleJoin = () => {
    if (roomCode.length === 5) {
      // Button sound effect
      const audioButtonInstance = new Audio("soundtracks/button.mp3");
      audioButtonInstance.play().catch((error) => {
        console.error("Audio playback error:", error);
      });

      // Store the room code in session storage or pass via query
      sessionStorage.setItem("roomCode", roomCode);
      router.push("/enter-name"); // Redirect to the name input page

      // Check if an audio instance already exists
      if (!audioInstance) {
        audioInstance = new Audio("soundtracks/loading_menu.mp3");
        audioInstance.loop = true;

        // Play audio and handle any play errors
        audioInstance.addEventListener("canplaythrough", () => {
          audioInstance?.play().catch((error) => {
            console.error("Audio playback error:", error);
          });
        });
      }
    } else {
      alert("Please enter a valid 5-digit room code.");
    }
  };

  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <BarBackground />
        <div className="mb-1">
          <img
            src="growth_logo.png"
            alt="Growth Logo"
            className="h-[320px] max-w-full px-5 object-contain"
          />
        </div>

        {/* Input for room code */}
        <div className="flex gap-1 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
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
        <p className="text-3xl text-white text-shadow-effect">or</p>
        <div className="flex gap-1 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <button className="bg-gray-900 text-white text-4xl px-4 py-2 w-full">
            Create Game (TODO)
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

export default HomePage;
