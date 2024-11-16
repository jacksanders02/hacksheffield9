"use client";  // Explicitly mark this as a Client Component

import React, { useEffect, useState } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Send } from "lucide-react";
import Message from "./Message";
import { pusherClient } from "@/lib/pusher";
import { sendMessage } from "@/actions/message.action";

// Add username and roomCode as props
type ConversationProps = {
  username: string;
  roomCode: string;
};

const Conversation: React.FC<ConversationProps> = ({ username, roomCode }) => {
  const [messages, setMessages] = useState<{ message: string; username: string }[]>([]);
  const [message, setMessage] = useState<string>("");

  const onSendMessageHandler = async () => {
    await sendMessage(message, username, roomCode);
    setMessage(""); // Clear input field
  };

  const uniqueMessages = messages.filter(
    (value, index, self) => self.indexOf(value) === index
  );

  useEffect(() => {
    // Subscribe to the room's channel using roomCode
    pusherClient.subscribe(roomCode);
  
    pusherClient.bind("upcoming-message", (data: { message: string, username: string, roomCode: string }) => {
      // Append message along with username
      setMessages((prev) => [...prev, { message: data.message, username: data.username }]);
      setMessage(""); // Clear input field
    });
  
    // Clean up the subscription when the component unmounts
    return () => pusherClient.unsubscribe(roomCode);
  }, [roomCode]); // Re-run the effect if roomCode changes
  

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="size-[500px] bg-slate-200 rounded-md shadow-lg flex flex-col justify-between">
        <h1 className="p-4 bg-white border">User Profile: {username}</h1>
        <div className="w-full h-full overflow-y-auto p-4 flex flex-col gap-y-4">
          {uniqueMessages.length ? (
            uniqueMessages.map((msg, index) => (
              <div key={index}>
                <Message message={msg.message} username={msg.username} />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No messages yet</div>
          )}
        </div>

        <div className="flex items-center gap-x-2 bg-white border h-[60px] ">
          <Input
            placeholder="type your message here ..."
            value={message}
            className="w-full flex-1 bg-transparent h-full  border-none rounded-none"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            onClick={onSendMessageHandler}
            className="rounded-none h-full "
          >
            <Send size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
