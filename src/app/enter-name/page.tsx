// app/enter-name/page.tsx
"use client";  // Explicitly mark this as a Client Component

import React, {useState, useEffect, useRef} from "react";
import { useRouter } from "next/navigation";

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
    <main className="flex min-h-screen flex-col p-6 items-center justify-center space-y-2">
      <h1 className="text-4xl font-bold">Enter Your Name</h1>
      <p className="text-lg">Please enter your username to join the room.</p>

      <div className="flex gap-1">
        <input
          type="text"
          className="border border-gray-300 rounded p-2 mr-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          ref={enterNameBtnRef}
        >
          Submit
        </button>
      </div>
    </main>
  );
};

export default EnterNamePage;
