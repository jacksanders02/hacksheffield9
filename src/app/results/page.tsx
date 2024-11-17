"use client";  // Explicitly mark this as a Client Component

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BarBackground } from "@/components/barBackground";

const EnterNamePage = () => {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const router = useRouter();

  useEffect(() => {
    const roomCode = sessionStorage.getItem("roomCode");  // Retrieve room code from session storage

    if (roomCode === null) {
      router.push("/");
      return;
    }

    setRoomCode(roomCode);
  }, []);

  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        <BarBackground />
        <div className="w-full bg-black p-5 bg-opacity-50 flex flex-row items-center justify-between min-h-[96px]">
          <h1 className="text-4xl text-white text-shadow-effect">prompt: a bank for bears</h1>
        </div>
        <div className="flex flex-row w-full">
          {/* Absolute positioning for user-status-list */}
          <div className="user-status-list absolute top-26 left-0 p-4 z-10">
            <div className="user-status">
              <div className="text-white text-shadow-effect text-3xl flex items-center justify-start">
                <img className="h-[20px] max-w-full object-contain mr-2" src="/conn_status.png" />
                jackb
              </div>
              <div className="text-4xl text-yellow-500 text-shadow-effect pl-[28px]">£0</div>
            </div>
            <div className="user-status">
              <div className="text-white text-shadow-effect text-3xl flex items-center justify-start">
                <img className="h-[20px] max-w-full object-contain mr-2" src="/conn_status.png" />
                jamesm
              </div>
              <div className="text-4xl text-yellow-500 text-shadow-effect pl-[28px]">£0</div>
            </div>
            <div className="user-status">
              <div className="text-white text-shadow-effect text-3xl flex items-center justify-start">
                <img className="h-[20px] max-w-full object-contain mr-2" src="/conn_status.png" />
                kushb
              </div>
              <div className="text-4xl text-yellow-500 text-shadow-effect pl-[28px]">£0</div>
            </div>
          </div>

          {/* Judge Output */}
          <div className="judge-output ml-32 p-4 z-0 sm:ml-32 md:ml-32 lg:ml-36 xl:ml-auto">
            <div className="p-4 w-full max-w-[600px]">
              <div className="speech-bubble min-h-[500px] p-4 bg-white speech-box flex flex-col">
                <div className="text-2xl flex-grow">
                  Countess of Crookes says... A most chilling proposition indeed! Were I to helm a bank for polar bears, I’d ensure their paw-sessions are safe by introducing ice vaults, while every igloo would have access to a local branch. An Arctic Gold savings plan would be essential, with fish-backed bonds and snow equity investments. Naturally, we'd also launch the Bear Necessities Rewards Program—because even polar bears deserve a frost-class financial experience!
                </div>
                <div className="flex flex-row justify-between items-center">
                  <img src="/characters/countess.png" className="h-[120px]" />
                  <div className="ml-auto text-6xl text-yellow-500 text-shadow-effect">£300</div>
                </div>
              </div>
            </div>
          </div>

          <div className="user-prompt p-8 hidden lg:block xl:mr-auto">
            <img src="/clipboard.svg" className="mx-auto -m-4 block h-[56px]"/>
            <div className="clipboard-border w-[300px] p-4 h-96 text-2xl text-center">
              <span>jack b business plan</span>
              <hr className="bg-[#606384] h-[3px] my-2" />
              "Offer ice-cold savings accounts, invest in snow futures, and add a fish rewards program. 'Bear' necessities for financial success!"
            </div>
          </div>
        </div>

        {/* Next Button - Align to the far right on lg screens and up */}
        <div className="p-4 w-full justify-center flex mt-4">
          <button className="bg-gray-900 text-white text-4xl px-4 py-2">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default EnterNamePage;