// src/app/api/pusher/auth/route.ts
import { NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher'; // Import your pusherServer instance

// This will handle the POST request for Pusher auth
export async function POST(req: Request) {
    console.log(req);
  if (req.body === null) {
    return new NextResponse('Missing request body', { status: 400 });
  }
  const chunks = [];
  for await (const chunk of req.body) {
    chunks.push(typeof chunk === 'string' ? chunk : new TextDecoder().decode(chunk));
  }
  const qString = chunks.join('');

  console.log(qString);
  try {
    // Parse the request body to get the required fields
    // example qString: socket_id=200122.60896&channel_name=presence-12345
    const params = new URLSearchParams(qString);
    const socket_id = params.get('socket_id');
    const channel_name = params.get('channel_name');

    console.log(socket_id, channel_name);

    // Check if the socket_id and channel_name are present
    if (!socket_id || !channel_name) {
      return new NextResponse('Missing parameters', { status: 400 });
    }

    // You might want to get additional user info here
    const user = {
      id: "user123", // Unique user ID
      username: "username123", // You can use session or any other way to retrieve this
    };

    // Authenticate with Pusher using the socket_id and channel_name
    const authResponse = pusherServer.authenticate(socket_id, channel_name, {
      user_id: user.id,
      user_info: {
        username: user.username,
      },
    });

    // Return the authentication response
    return NextResponse.json(authResponse);
  } catch (error) {
    console.error(error);
    return new NextResponse('Failed to authenticate', { status: 500 });
  }
}
