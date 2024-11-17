import {NextRequest} from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  const requestBody = await request.json();
  console.log(requestBody);
  const response = await fetch(`${process.env.PYTHON_BACKEND_URL}/response`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody),
  }).then(r => r.json());

  return new Response(JSON.stringify(response), { status: 200 });
}