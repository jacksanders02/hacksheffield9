type User = {
  name: string,
  score: number,
  isReady: boolean,
  currentRoom: string,
  submittedAnswer: string,
}

type Room = {
  name: string,
  round: number,
  users: {
    [username: string]: User,
  },
}

const rooms: {
  [roomCode: string]: Room
} = {}

export function addUser(username: string, roomCode: string): User {
  console.log(rooms)
  if (!rooms.hasOwnProperty(roomCode)) {
    rooms[roomCode] = {
      name: roomCode,
      round: 0,
      users: {},
    }
  }

  const user: User = {
    name: username,
    score: 0,
    isReady: false,
    currentRoom: roomCode,
    submittedAnswer: '',
  }

  rooms[roomCode].users[username] = user;
  return user;
}

function checkRoomReady(roomCode: string): boolean {
  return Object.values(rooms[roomCode].users).every((user) => user.isReady);
}

export function userReady(roomCode: string, username: string) {
  rooms[roomCode].users[username].isReady = true;

  if (checkRoomReady(roomCode)) {
    console.log("room REAdy!");
    console.log(rooms[roomCode]);
  }
}

function startGame(roomName: string) {

}
