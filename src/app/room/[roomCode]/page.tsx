"use client";

import React, {useEffect, useRef, useState} from "react";
import { usePathname, useRouter } from "next/navigation";
import { BarBackground } from "@/components/barBackground";
import { pusherClient } from "@/lib/pusher";
import {Channel} from "pusher-js";
import { Judge } from "@/components/Judge";

// Define the shape of the Member object
interface Member {
  id: string;
  info: {
    username: string;
  };
}

interface UIMember {
  username: string;
  ready: boolean;
}

// Define the structure of the members object, which can loop through members
interface Members {
  each: (callback: (member: Member) => void) => void;
}

const RoomPage: React.FC = () => {
  const [members, setMembers] = useState<UIMember[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const [roomReady, setRoomReady] = useState<boolean>(false);
  const [username, setUsername] = useState<string>();
  const [channel, setChannel] = useState<Channel>();

  const roomCode = usePathname().replace("/room/", ""); // Extract roomCode from the path
  const router = useRouter();

  const startListener = () => {
    if (!username || !channel) {
      return;
    }

    fetch(`/api/ready-up?username=${username}&roomCode=presence-${roomCode}`, {
      method: "POST",
    }).then(r => {
      if (r.status !== 200) {
        throw new Error("Could not ready up :(");
      }

      return r.json();
    }).then(data => {
      setReady(data);
      channel.trigger('client-member_ready', { memberUsername: username, readyStatus: data });
      members.find((member) => member.username === username)!.ready = data;
    });
  }

  useEffect(() => {
    const channel = pusherClient.subscribe(`presence-${roomCode}`);
    setChannel(channel);
  
    // Listen for the successful subscription event
    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      const memberList: UIMember[] = [];
      members.each((member: Member) => {
        memberList.push({
          username: member.info.username,
          ready: false
        });
      });
      setMembers(memberList);
    });
  
    // Listen for when a new member joins
    channel.bind("pusher:member_added", (member: Member) => {
      console.log("New member added: ", member.info.username);
      setMembers((prevMembers) => [
        ...prevMembers,
        {
          username: member.info.username,
          ready: false
        }
      ]);
    });
  
    // Listen for when a member leaves
    channel.bind("pusher:member_removed", (member: Member) => {
      console.log("Member removed: ", member.info.username);
      setMembers((prevMembers) =>
        prevMembers.filter(({ username }) => username !== member.info.username)
      );
    });
  
    // Listen for game start event
    channel.bind("game_start", () => {
      setRoomReady(true);
    });

    // Listen for ready event
    channel.bind("client-member_ready", ({ memberUsername, readyStatus }: {
      memberUsername: string;
      readyStatus: boolean;
    }) => {
      members.find((member) => member.username === memberUsername)!.ready = readyStatus;
    });

    const username = sessionStorage.getItem("username");
    if (username === null) {
      return;
    }
    setUsername(username);
    // Cleanup on component unmount
    return () => {
      pusherClient.unsubscribe(`presence-${roomCode}`);
    };
  }, [roomCode]);

  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        <BarBackground />
        <div className="w-full bg-black p-5 bg-opacity-50 flex flex-row items-center justify-between">
          <h1 className="text-4xl text-white text-shadow-effect">room id: {roomCode}</h1>
          <button 
            onClick={startListener}
            className="bg-gray-900 text-white text-4xl px-4 py-2"
          >
            {ready ? "Un-ready" : "Ready Up!"}
          </button>
        </div>
        <div className="p-5 pb-0">
          <h1 className="text-4xl text-white text-shadow-effect">meet your judges</h1>
          <div className="flex flex-row space-x-5">
            <Judge name="Countess Crookes" description="Professional and successful entrepreneur with expert knowledge" imgLink="countess.png" />
            <Judge name="Sue Stainability" description="Cares about sustainability and inclusivity in business solutions" imgLink="sustainability.png" />
            <Judge name="Dave O' Pub" description="Always drunk, enjoys the pub, and gives honest opinions on business ideas" imgLink="dave.png" />
            <Judge name="Tiny Tim" description="Very naive and enjoys humour in business solutions" imgLink="child.png" />
          </div>
        </div>
        <div className="p-5">
          <h1 className="text-4xl text-white text-shadow-effect">players ({members.length})</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
            { members.map((member) => (
              <div key={member.username} className="text-white text-shadow-effect text-3xl flex items-center justify-center">
                <img className="h-[20px] max-w-full object-contain mr-2" src="/conn_status.png" alt="good connection"/>
                {member.username} {member.ready ? " (Ready)" : ""}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomPage;
