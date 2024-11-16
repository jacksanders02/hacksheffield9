"use server";

import { pusherServer } from "../lib/pusher";

export const sendMessage = async (message: string, username: string, roomCode: string) => {
    try {
        // Include the username in the data sent to Pusher
        await pusherServer.trigger(roomCode, "upcoming-message", {
            message, 
            username,  // Add username here
            roomCode,  // Optionally, include the roomCode if needed on the client
        });
    } catch (error: any) {
        throw new Error(error);
    }
};
