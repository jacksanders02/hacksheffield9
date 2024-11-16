"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Conversation from "@/components/Conversation";

type RoomPageProps = {
  params: {
    roomCode: string;
  };
};

const RoomPage = ({ params }: RoomPageProps) => {
  const [username, setUsername] = useState("");
  const { roomCode } = params; // Extract roomCode from params
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = sessionStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      } else {
        router.push("/enter-name");
      }
    }
  }, [router]);

  return (
    <main>
      <h1>Room: {roomCode}</h1>
      <p>Username: {username}</p>
      {/* Pass roomCode and username as props to Conversation component */}
      <Conversation username={username} roomCode={roomCode} />
    </main>
  );
};

export default RoomPage;
