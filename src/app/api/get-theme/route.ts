import {NextRequest} from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const roomCode = searchParams.get("roomCode");

  const ready = await fetch(`${process.env.PYTHON_BACKEND_URL}/room/${roomCode}/theme`, {
    method: "GET",
  }).then(r => {
    if (r.status !== 200) {
      throw new Error("Could not ready up :(");
    }

    return r.text();
  }).then(data => {
    return data
  });

  return new Response(ready, { status: 200 });
}