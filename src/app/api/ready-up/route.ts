import {NextRequest} from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const roomCode = searchParams.get("roomCode");
  const username = searchParams.get("username");

  const ready = await fetch(`${process.env.PYTHON_BACKEND_URL}/room/${roomCode}/user/${username}/ready`, {
    method: "POST",
  }).then(r => {
    if (r.status !== 200) {
      throw new Error("Could not ready up :(");
    }

    return r.json();
  }).then(data => {
    return data
  });

  return new Response(ready, { status: 200 });
}