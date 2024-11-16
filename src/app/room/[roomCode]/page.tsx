"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Conversation from "@/components/Conversation";

const RoomPage = () => {
  const [username, setUsername] = useState("");
  
  const roomCode = usePathname().replace("/room/", ""); // remove room/... from the path
 
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
