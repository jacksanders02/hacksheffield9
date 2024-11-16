"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Conversation from "@/components/Conversation"; // Make sure this import is correct

type RoomPageProps = {
  params: {
    roomCode: string;
  };
};

const RoomPage = ({ params }: RoomPageProps) => {
  const [username, setUsername] = useState("");
  // we need to await roomCode from the params
  const { roomCode } = params;
  const router = useRouter();

  useEffect(() => {
    // Access sessionStorage only in the client-side environment
    const storedUsername = sessionStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername); // Set username from session storage
    } else {
      // If no username in sessionStorage, you could redirect or handle accordingly
      router.push("/enter-name"); // For example, redirecting to an 'Enter Name' page
    }
  }, [router]);

  return (
    <div>
      <h1>Room: {roomCode}</h1>
      <p>Username: {username}</p>
      {/* Pass roomCode and username as props to Conversation component */}
      <Conversation username={username} roomCode={roomCode} />
    </div>
  );
};

export default RoomPage;
