import {NextRequest} from "next/server";
import { userReady } from "@/lib/gameLoop";

export async function POST(request: NextRequest): Promise<Response> {
  const requestBody = await request.json();
  const username = requestBody.username;
  const room = requestBody.room;

  userReady(room, username);

  return new Response(null, { status: 200 });
}