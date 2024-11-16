"use server";

import { pusherServer } from "../lib/pusher";

export const sendMessage = async (message: string) => {
    try {
        // pushServer.trigger(channelName, eventName, data)
        pusherServer.trigger("chat-app", "upcoming-message", {
            message, 
        });
    } catch (error: any) {
        throw new Error(error);
    }
}
