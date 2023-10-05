import { Manager, Socket } from "socket.io-client";

const uri = "http://localhost:3000/socket.io/socket.io.js";

export const connectToServer = () => {
  const manager = new Manager(uri);

  const socket = manager.socket("/");

  addListeners(socket);
};

const addListeners = (socket: Socket) => {
  const clientsUl = document.querySelector<HTMLUListElement>("#client-list")!;
  const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;
  const messageInput =
    document.querySelector<HTMLInputElement>("#message-input")!;
  const messagesUl = document.querySelector<HTMLUListElement>("#message-list");
  const serverStatusLabel = document.querySelector("#server-status")!;

  socket.on("connect", () => {
    serverStatusLabel.innerHTML = "Connected";
  });

  socket.off("disconnect", () => {
    serverStatusLabel.innerHTML = "Disconnected";
  });

  socket.on("clients-updated", (clients: string[]) => {
    let clientsHtml = "";
    clients.forEach((id) => {
      clientsHtml += `
        <li>${id}</li>
        `;
    });

    clientsUl.innerHTML = clientsHtml;
  });

  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (messageInput.value.trim().length <= 0) return;

    socket.emit("message-from-client", {
      id: "A",
      message: messageInput.value,
    });

    messageInput.value = "";
  });

  socket.on(
    "message-from-server",
    (payload: { fullName: string; message: string }) => {
      const newMessage = `
      <li>
        <strong>${payload.fullName}</strong>
        <span>${payload.message}</span>
      </li>
      `;

      const li = document.createElement("li");
      li.innerHTML = newMessage;
      messagesUl?.append(li);
    }
  );
};
