"use client"; // Ensure client-side rendering

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Bar {
  id: number;
  height: number;
  offset: number;
  alpha: number; // Added alpha value for opacity control
}

const HomePage = () => {
  const [roomCode, setRoomCode] = useState<string>(""); // Room code as string
  const [bars, setBars] = useState<Bar[]>([]); // State for bars with explicit type
  const router = useRouter();

  // This useEffect ensures bars are set only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") { // Check if running on client
      const newBars: Bar[] = Array.from({ length: 10 }, (_, index) => ({
        id: index,
        height: Math.floor(Math.random() * (200) + 50), // Random height
        offset: Math.random() * 2, // Random offset for animation timing
        alpha: Math.random() * 0.3 + 0.1, // Random alpha between 0.1 and 0.4
      }));
      setBars(newBars);
    }
  }, []); // Empty dependency array ensures it runs only once after initial render

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
      alert("Please enter a valid 5-digit room code.");
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Container for the bars */}
      <div className="bar-container absolute left-0 right-0 flex flex-row z-0 items-end">
        {/* Bars with different heights and offsets */}
        {bars.map((bar) => (
          <div
            key={bar.id}
            className="bar flex-1"
            style={{
              height: `${bar.height}px`, // Random height
              animationName: "moveUpDown", // Define animation name explicitly
              animationDuration: "2s", // Animation duration
              animationTimingFunction: "ease-in-out", // Timing function
              animationDelay: `${bar.offset}s`, // Random offset for each bar
              animationIterationCount: "infinite", // Infinite looping
              backgroundColor: `rgba(0, 0, 0, ${bar.alpha})`, // Set background color with varying alpha
            }}
          ></div>
        ))}
      </div>

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
    </main>
  );
};

export default HomePage;
