// import About from '@/app/ui/about';


// export default function Page() {
//   return (
//     <main className="flex min-h-screen flex-col p-6 items-center bg-green-300">
//       <About />

//       <h1 className="text-4xl font-bold">Growth</h1>
//       <div className="bg-green-500 outline outline-4 outline-black p-4 mt-4">
//         <h2>Enter room code:</h2>
//         <p>
//           <input type="text" className="border border-gray-300 rounded p-2 mr-2" />
//           <button className="bg-blue-500 text-white px-4 py-2 rounded">Join</button>
//         </p>
//       </div>
//     </main>
//   );
// }

import Conversation from '@/app/components/Conversation'

import React from 'react'
import About from './ui/about'

type Props = {}

const HomePage = (props: Props) => {
  return (
  <>
    <About />
    <Conversation />
  </>
)}

export default HomePage