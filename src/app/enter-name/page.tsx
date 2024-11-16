// app/enter-name/page.tsx
"use client";  // Explicitly mark this as a Client Component

import React, {useState, useEffect, useRef} from "react";
import { useRouter } from "next/navigation";
import { BarBackground } from "@/components/barBackground";

const EnterNamePage = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const enterNameBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const roomCode = sessionStorage.getItem("roomCode");  // Retrieve room code from session storage

    if (!roomCode) {
      router.push("/");
    }

    if (enterNameBtnRef.current === null) {
      return;
    }

    enterNameBtnRef.current.addEventListener('click', () => {
      if (username.trim()) {
        sessionStorage.setItem("username", username);  // Store the username in session storage
        router.push(`/room/${roomCode}`);  // Redirect to the room page
      } else {
        alert("Please enter a username.");
      }
    });
  }, [router, username]);

  return (
    <>
        <BarBackground />
        <h1 className="text-4xl text-white text-shadow-effect mb-11">Enter Your Name</h1>
        <div className="flex gap-1 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <input
            type="text"
            className="p-2 mr-2 text-4xl w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
            spellCheck={false}
            />
            <button
            className="bg-gray-900 text-white text-4xl px-4 py-2"
            ref={enterNameBtnRef}
            >
            Submit
            </button>
        </div>
    </>
  );
};

export default EnterNamePage;
