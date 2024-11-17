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
            <div className="text-white text-shadow-effect text-3xl flex items-center justify-center">
              <img className="h-[20px] max-w-full object-contain mr-2" src="/conn_status.png" />
              jackb
            </div>
            <div className="text-white text-shadow-effect text-3xl flex items-center justify-center">
              <img className="h-[20px] max-w-full object-contain mr-2" src="/conn_status.png" />
              jackb
            </div>
            <div className="text-white text-shadow-effect text-3xl flex items-center justify-center">
              <img className="h-[20px] max-w-full object-contain mr-2" src="/conn_status.png" />
              jackb
            </div>
            <div className="text-white text-shadow-effect text-3xl flex items-center justify-center">
              <img className="h-[20px] max-w-full object-contain mr-2" src="/conn_status.png" />
              jackb
            </div>
            <div className="text-white text-shadow-effect text-3xl flex items-center justify-center">
              <img className="h-[20px] max-w-full object-contain mr-2" src="/conn_status.png" />
              jackb
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomPage;
