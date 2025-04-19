export type AZM AIEventType =
  | "message"
  | "agent_state_changed"
  | "run"
  | "read"
  | "write"
  | "edit"
  | "run_ipython"
  | "delegate"
  | "browse"
  | "browse_interactive"
  | "reject"
  | "think"
  | "finish"
  | "error"
  | "recall";

interface AZM AIBaseEvent {
  id: number;
  source: "agent" | "user";
  message: string;
  timestamp: string; // ISO 8601
}

export interface AZM AIActionEvent<T extends AZM AIEventType>
  extends AZM AIBaseEvent {
  action: T;
  args: Record<string, unknown>;
}

export interface AZM AIObservationEvent<T extends AZM AIEventType>
  extends AZM AIBaseEvent {
  cause: number;
  observation: T;
  content: string;
  extras: Record<string, unknown>;
}
