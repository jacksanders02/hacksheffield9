// app/enter-name/page.tsx
"use client";  // Explicitly mark this as a Client Component

import React, {useState, useEffect} from "react";
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

  useEffect(() => {
    if (username !== null && username.trim()) {
      sessionStorage.setItem("username", username);  // Store the username in session storage
    }
  }, [username]);

  const joinRoom = () => {
    // Button sound effect
    const audioButtonInstance = new Audio("soundtracks/button.mp3");
    document.querySelectorAll('audio').forEach(el => el.pause());
    audioButtonInstance.play().catch((error) => {
      console.error("Audio playback error:", error);
    });
    
    if (roomCode !== null && roomCode.trim() && username !== null && username.trim()) {
      fetch('/api/join-room', {
        method: "POST",
        body: JSON.stringify({
          roomCode: roomCode,
          username: username,
        }),
      }).then(() => {
        router.push(`/room/${roomCode}`);  // Redirect to the room page
      })
    } else {
      alert("enter username");
    }
  }

  return (
    <>
      <div className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
        <BarBackground />
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
      </div>
    </>
  );
};

export default EnterNamePage;
