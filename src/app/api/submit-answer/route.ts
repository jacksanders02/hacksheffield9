import {NextRequest} from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  const requestBody = await request.json();
  console.log(requestBody);
  return new Response(JSON.stringify({ message: "hello world!" }), { status: 200 });
}