import { Server, Socket } from "socket.io";
import { RoomManager } from "../rooms/RoomManager";
import { redis } from "../redis";

export function registerRoomEvents(io: Server, socket: Socket) {
  socket.on("JOIN_ROOM", async ({ roomId }) => {
    const userId = socket.data.userId;
    if (!userId) return socket.emit("ERROR", "Not authenticated");

    let room = await RoomManager.getRoom(roomId);
    if (!room) {
      room = await RoomManager.createRoom(roomId, userId);
    }

    socket.join(roomId);

    // Add player to room if needed
    await RoomManager.addPlayer(roomId, userId);

    // Notify other players
    io.to(roomId).emit("PLAYER_JOINED", {
      roomId,
      userId,
    });

    console.log(`User ${userId} joined room ${roomId}`);
  });

  socket.on("LEAVE_ROOM", async ({ roomId }) => {
    const userId = socket.data.userId;
    if (!userId) return;

    socket.leave(roomId);

    // remove from redis json room structure later if needed
    io.to(roomId).emit("PLAYER_LEFT", {
      roomId,
      userId,
    });

    console.log(`User ${userId} left room ${roomId}`);
  });
}
