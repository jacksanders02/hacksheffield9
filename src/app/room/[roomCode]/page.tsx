"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BarBackground } from "@/components/barBackground";
import QuestionForm from "@/components/QuestionForm";

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
    <>
        <BarBackground />
        <h1>Room: {roomCode}</h1>
        <p>Username: {username}</p>
        <QuestionForm />
    </>
  );
};

export default RoomPage;
