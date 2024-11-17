import {NextRequest} from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  const requestBody = await request.json();
  const { username, roomCode } = requestBody;

  const url = `${process.env.PYTHON_BACKEND_URL}/room/${roomCode}/user/${username}`;

  fetch(url, {
    method: "POST",
  }).then(res => {
    if (res.status !== 200) {
      throw new Error("Failed to join");
    } else {
      console.log("User joined");
    }
  })

  return new Response(null, { status: 200 });
}