import { connectToServer } from "./socket-client";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
  <h1>Websocket client</h1>
  <span id="server-status">offline</span>
  </div>

  <ul id="client-list">
  </ul>

  <form id="message-form">
    <input placeholder="message" id="message-input" />
  </form>
`;

connectToServer();
