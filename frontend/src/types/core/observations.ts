import { AgentState } from "../agent-state";
import { AZM AIObservationEvent } from "./base";

export interface AgentStateChangeObservation
  extends AZM AIObservationEvent<"agent_state_changed"> {
  source: "agent";
  extras: {
    agent_state: AgentState;
  };
}

export interface CommandObservation extends AZM AIObservationEvent<"run"> {
  source: "agent";
  extras: {
    command: string;
    hidden?: boolean;
    metadata: Record<string, unknown>;
  };
}

export interface IPythonObservation
  extends AZM AIObservationEvent<"run_ipython"> {
  source: "agent";
  extras: {
    code: string;
  };
}

export interface DelegateObservation
  extends AZM AIObservationEvent<"delegate"> {
  source: "agent";
  extras: {
    outputs: Record<string, unknown>;
  };
}

export interface BrowseObservation extends AZM AIObservationEvent<"browse"> {
  source: "agent";
  extras: {
    url: string;
    screenshot: string;
    error: boolean;
    open_page_urls: string[];
    active_page_index: number;
    dom_object: Record<string, unknown>;
    axtree_object: Record<string, unknown>;
    extra_element_properties: Record<string, unknown>;
    last_browser_action: string;
    last_browser_action_error: unknown;
    focused_element_bid: string;
  };
}

export interface BrowseInteractiveObservation
  extends AZM AIObservationEvent<"browse_interactive"> {
  source: "agent";
  extras: {
    url: string;
    screenshot: string;
    error: boolean;
    open_page_urls: string[];
    active_page_index: number;
    dom_object: Record<string, unknown>;
    axtree_object: Record<string, unknown>;
    extra_element_properties: Record<string, unknown>;
    last_browser_action: string;
    last_browser_action_error: unknown;
    focused_element_bid: string;
  };
}

export interface WriteObservation extends AZM AIObservationEvent<"write"> {
  source: "agent";
  extras: {
    path: string;
    content: string;
  };
}

export interface ReadObservation extends AZM AIObservationEvent<"read"> {
  source: "agent";
  extras: {
    path: string;
    impl_source: string;
  };
}

export interface EditObservation extends AZM AIObservationEvent<"edit"> {
  source: "agent";
  extras: {
    path: string;
    diff: string;
    impl_source: string;
  };
}

export interface ErrorObservation extends AZM AIObservationEvent<"error"> {
  source: "user";
  extras: {
    error_id?: string;
  };
}

export interface AgentThinkObservation
  extends AZM AIObservationEvent<"think"> {
  source: "agent";
  extras: {
    thought: string;
  };
}

export interface MicroagentKnowledge {
  name: string;
  trigger: string;
  content: string;
}

export interface RecallObservation extends AZM AIObservationEvent<"recall"> {
  source: "agent";
  extras: {
    recall_type?: "workspace_context" | "knowledge";
    repo_name?: string;
    repo_directory?: string;
    repo_instructions?: string;
    runtime_hosts?: Record<string, number>;
    additional_agent_instructions?: string;
    date?: string;
    microagent_knowledge?: MicroagentKnowledge[];
  };
}

export type AZM AIObservation =
  | AgentStateChangeObservation
  | AgentThinkObservation
  | CommandObservation
  | IPythonObservation
  | DelegateObservation
  | BrowseObservation
  | BrowseInteractiveObservation
  | WriteObservation
  | ReadObservation
  | EditObservation
  | ErrorObservation
  | RecallObservation;
