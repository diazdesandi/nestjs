import { Manager } from "socket.io-client";

const uri = "http://localhost:3000/socket.io/socket.io.js";

export const connectToServer = () => {
  const manager = new Manager(uri);

  const socket = manager.socket("/");
};
