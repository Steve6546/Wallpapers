import { delay, WebSocketHandler, ws } from "msw";
import { toSocketIo } from "@mswjs/socket.io-binding";
import { AgentState } from "#/types/agent-state";
import { InitConfig } from "#/types/core/variances";
import { SESSION_HISTORY } from "./session-history.mock";
import {
  generateAgentStateChangeObservation,
  emitMessages,
  emitAssistantMessage,
} from "./mock-ws-helpers";

const isInitConfig = (data: unknown): data is InitConfig =>
  typeof data === "object" &&
  data !== null &&
  "action" in data &&
  data.action === "initialize";

// Use the current protocol (http or https) for the WebSocket connection
const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
const chat = ws.link(`${wsProtocol}//${window?.location.host}/socket.io`);

export const handlers: WebSocketHandler[] = [
  chat.addEventListener("connection", (connection) => {
    const io = toSocketIo(connection);
    // @ts-expect-error - accessing private property for testing purposes
    const { url }: { url: URL } = io.client.connection;
    const conversationId = url.searchParams.get("conversation_id");

    io.client.emit("connect");

    if (conversationId) {
      emitMessages(io, SESSION_HISTORY["1"]);

      io.client.emit(
        "oh_event",
        generateAgentStateChangeObservation(AgentState.AWAITING_USER_INPUT),
      );
    }

    io.client.on("oh_user_action", async (_, data) => {
      if (isInitConfig(data)) {
        io.client.emit(
          "oh_event",
          generateAgentStateChangeObservation(AgentState.INIT),
        );
      } else {
        io.client.emit(
          "oh_event",
          generateAgentStateChangeObservation(AgentState.RUNNING),
        );

        await delay(2500);
        emitAssistantMessage(io, "Hello!");

        io.client.emit(
          "oh_event",
          generateAgentStateChangeObservation(AgentState.AWAITING_USER_INPUT),
        );
      }
    });
  }),
];
