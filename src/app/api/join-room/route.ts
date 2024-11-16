import {NextRequest} from "next/server";
import {addUser, userReady} from "@/lib/gameLoop";

export async function POST(request: NextRequest): Promise<Response> {
  const requestBody = await request.json();
  const { username, roomCode } = requestBody;

  addUser(username, roomCode);

  return new Response(null, { status: 200 });
}