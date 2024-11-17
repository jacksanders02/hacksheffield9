## Inspiration
Inspired by online games such as Jackbox and Death by AI, we wanted to put our "growth" spin on simultaneous multiplayer answering games while improving our networking, web dev and LLM prompt-engineering skills!

## What it does
Our project presents you with a bizarre project proposal, and you must come up with the best way to implement and **grow** the company. You will be judged against the opinion of 4 diverse investors, from a greedy immoral capitalist Baroness to Dave, a regular at your local pub. Each investor will put up to £1000 into your project and you must try to get as much funding as possible over all rounds. 

The game originally featured online multiplayer, where you would compete against your friends to get as much funding as possible. However, we did not end up having enough time to fully implement this, instead staying partially implemented on a branch :)

## How we built it
We built the project on a [Next.js](https://nextjs.org/) frontend, and a Python backend using [FastAPI](https://fastapi.tiangolo.com/) running on one of our PCs connected over a [ngrok](https://ngrok.com/) gateway, running a local instance of the [Gemma2 LLM](https://ollama.com/library/gemma2:27b) implemented over [Ollama](https://docs.llamaindex.ai/en/stable/examples/llm/ollama/) and our custom API for accessing persistent data. Websocket-like functionality was done (reluctantly) over [Pusher](https://pusher.com/), and the project was hosted on a [Vercel](https://vercel.com/) serverless instance. The mockups were done in [Figma](https://www.figma.com/) and the music was created in [Garageband](https://apps.apple.com/us/app/garageband/id408709785).

## Challenges we ran into
Getting socket functionality to work took a lot of effort as Socket.io, the tool we had experience in, was not compatible with Vercel. Pusher took a while to get used to syntax-wise and implementing rooms capable of running a full Jackbox-style game took MANY hours of tinkering and frustration. One specific challenge for this was getting the users' usernames into a room, as the Pusher subscribe function only accepts the room name. To get around not being able to access the username server-side, we made a custom API that stores the username in the Python backend on one of our PCs, before retrieving it server-side with a fetch call to use inside the Pusher user authentication code. In the end, we didn't implement PVP multiplayer as we ran out of time, but we have built the backend for it!

Another key challenge was translating designs created in Figma to the actual page, with components such as SVGs and CSS animations being difficult to convert. Our frontend designer had not used TailwindCSS before this and so the learning process took him out of his comfort zone, especially for creating custom classes.

Finally, the LLM should ensure that it adopts the role of an investor and responds in a specific format that can be parsed as a JSON. For example, making the LLM stay on-topic and provide investments within the specified ranges tailored to each business growth solution.

## Accomplishments that we're proud of
- Varied, personality-driven LLM responses that give well-structured, humorous and relevant answers to prompts.
- Dynamic CSS backgrounds based on the hash of our most recent GitHub commit (for your consideration for Most Creative use of GitHub)
- Polished and stylised retro-themed UI, with animated backgrounds and elements.
- Complete mobile feature parity and optimised layouts
- Asynchronous multiplayer lobbies through Pusher sockets
- Fully original art and soundtrack all created during the hackathon!

## What we learned
- Using Pusher with Next.js to simulate web sockets over a serverless host.
- Creating a web-based game loop that can be reset and replayed.
- Efficiently translating Figma designs to TailwindCSS
- Using Ollama hosted on a remote machine to give LLM responses served over a custom API
- James is terrible at werewolf

## What's next for Growth - Business Simulator?
- Full online multiplayer support
- Implementation of the LLM over a third-party service, so we don't expose our own system and can improve response times!
- More judges and more prompts!
