"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BarBackground } from "@/components/barBackground";
import QuestionForm from "@/components/QuestionForm";
import { pusherClient } from "@/lib/pusher";

// Define the shape of the Member object
interface Member {
  id: string;
  info: {
    username: string;
  };
}

// Define the structure of the members object, which can loop through members
interface Members {
  each: (callback: (member: Member) => void) => void;
}

const RoomPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [members, setMembers] = useState<string[]>([]);
  const [ready, setReady] = useState<boolean>(false);

  const roomCode = usePathname().replace("/room/", ""); // Extract roomCode from the path
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") {
        return;
    }

    const storedUsername = sessionStorage.getItem("username");

    if (storedUsername) {
        setUsername(storedUsername);
    } else {
        router.push("/enter-name");
    }

    const channel = pusherClient.subscribe(`presence-${roomCode}`);

    // Listen for the successful subscription event
    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      console.log("HUGE SUCCESS!!!!!");
      const memberList: string[] = [];
      members.each((member: Member) => {
        memberList.push(member.info.username);
      });
      setMembers(memberList);
    });

    // Listen for when a new member joins
    channel.bind("pusher_internal:member_added", (member: Member) => {
      console.log("MEMBER ADDED !!!!!!!!!!!!!!!!!!!!!!");
      setMembers((prevMembers) => [...prevMembers, member.info.username]);
    });

    // Listen for when a member leaves
    channel.bind("pusher:member_removed", (member: Member) => {
      setMembers((prevMembers) =>
        prevMembers.filter((username) => username !== member.info.username)
      );
    });

    // Listen for game start event
    channel.bind("game_start", () => {
      setReady(true);
    });

    // Cleanup on component unmount
    return () => {
      pusherClient.unsubscribe(`presence-${roomCode}`);
    };
  }, [roomCode]);

  const handleStartClick = () => {
    router.push("/results"); // navigate to /results
  };

  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        <BarBackground />
        <div className="w-full bg-black p-5 bg-opacity-50 flex flex-row items-center justify-between">
          <h1 className="text-4xl text-white text-shadow-effect">room id: {roomCode}</h1>
          <button 
            onClick={handleStartClick} 
            className="bg-gray-900 text-white text-4xl px-4 py-2"
          >
            Start
          </button>
        </div>
        <div className="p-5 pb-0">
          <h1 className="text-4xl text-white text-shadow-effect">meet your judges</h1>
          <div className="flex flex-row space-x-5">

            <div className="judge-box flex flex-col items-center justify-between text-center max-w-[200px] flex-grow">
              <img className="h-[200px] max-w-full object-contain" src="/characters/countess.png" />
              <p className="text-white text-shadow-effect text-3xl">Countess Crookes</p>
              <p className="text-white text-shadow-effect text-lg break-words px-2 min-h-[85px] hidden sm:block">
                Professional and successful entrepreneur with expert knowledge
              </p>
            </div>
            <div className="judge-box flex flex-col items-center justify-between text-center max-w-[200px] flex-grow">
              <img className="h-[200px] max-w-full object-contain" src="/characters/sustainability.png" />
              <p className="text-white text-shadow-effect text-3xl">Sue Stainability</p>
              <p className="text-white text-shadow-effect text-lg break-words px-2 min-h-[85px] hidden sm:block">
                Cares about sustainability and inclusivity in business solutions
              </p>
            </div>
            <div className="judge-box flex flex-col items-center justify-between text-center max-w-[200px] flex-grow">
              <img className="h-[200px] max-w-full object-contain" src="/characters/dave.png" />
              <p className="text-white text-shadow-effect text-3xl">Dave O' Pub</p>
              <p className="text-white text-shadow-effect text-lg break-words px-2 min-h-[85px] hidden sm:block">
                Always drunk, enjoys the pub, and gives honest opinions on business ideas 
              </p>
            </div>
            <div className="judge-box flex flex-col items-center justify-between text-center max-w-[200px] flex-grow">
              <img className="h-[200px] max-w-full object-contain" src="/characters/child.png" />
              <p className="text-white text-shadow-effect text-3xl">Tiny Tim</p>
              <p className="text-white text-shadow-effect text-lg break-words px-2 min-h-[85px] hidden sm:block">
                Very naive and enjoys humour in business solutions
              </p>
            </div>

          </div>
        </div>
        <div className="p-5">
          <h1 className="text-4xl text-white text-shadow-effect">players (0)</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
            { members.map((member) => (
              <div key={member} className="text-white text-shadow-effect text-3xl flex items-center justify-center">
                <img className="h-[20px] max-w-full object-contain mr-2" src="/conn_status.png" alt="good connection"/>
                {member}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomPage;
