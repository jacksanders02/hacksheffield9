"use client";
import React, {useEffect, useState} from "react";
import { usePathname, useRouter } from "next/navigation";
import { pusherClient } from "@/lib/pusher";
import {Channel} from "pusher-js";
import QuestionTime from "@/app/room/[roomCode]/QuestionTime";
import Lobby from "@/app/room/[roomCode]/Lobby";
import Leaderboard from "@/app/room/[roomCode]/Leaderboard";

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
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);

  const roomCode = usePathname().replace("/room/", ""); // Extract roomCode from the path

  const advanceRound = () => {
    fetch(`/api/advance-round?roomCode=presence-${roomCode}`).then(res => {
      if (res.status !== 200){
        throw new Error("no")
      }
      return res.text();
    }).then(data => setRound(parseInt(data)));
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
    channel.bind("client-member_ready", ({ memberUsername, readyStatus }: { memberUsername: string; readyStatus: boolean }) => {
      console.log("Member ready: ", memberUsername, readyStatus);

      setMembers((prevMembers) => 
        prevMembers.map((member) => 
          member.username === memberUsername
            ? { ...member, ready: readyStatus } // Update the ready status immutably
            : member
        )
      );
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
      {(round === 0) && (
        <Lobby
          nextRound={advanceRound}
        />
      )}

      {(round > 0 && round < 6) && (
        <QuestionTime
          score={score}
          addScore={(newScore: number) => setScore(score + newScore)}
          roundNumber={round}
          nextRound={advanceRound}
        />
      )}

      {(round < 0) && (
        <Leaderboard
          players={[{
            username: "You!",
            score: score,
          }]}
        />
      )}
    </>
  )
};

export default RoomPage;
