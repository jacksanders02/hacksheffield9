import React from 'react'

type Props = {
  message: string;
  username: string;  // Add username to the props
}

const Message = ({ message, username }: Props) => {
  return (
    <div className="w-full h-[40px] flex items-center rounded-lg rounded-tl-none text-white px-6 bg-black">
      {/* Display username and message */}
      <span className="font-semibold mr-2">{username}:</span>  {/* Username with some margin */}
      <span>{message}</span>  {/* Message */}
    </div>
  );
}

export default Message;
