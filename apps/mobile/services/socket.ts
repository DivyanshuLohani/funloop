import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function initSocket(token: string) {
  socket = io("http://192.168.29.63:3000", {
    transports: ["websocket"],
    auth: { token },
  });

  socket.onAny((event, ...args) => {
    console.log("Event:", event, args);
  });

  return socket;
}

export function getSocket() {
  return socket;
}
