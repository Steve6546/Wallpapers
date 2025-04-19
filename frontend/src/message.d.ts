import { PayloadAction } from "@reduxjs/toolkit";
import { AZM AIObservation } from "./types/core/observations";
import { AZM AIAction } from "./types/core/actions";

export type Message = {
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
  imageUrls?: string[];
  type?: "thought" | "error" | "action";
  success?: boolean;
  pending?: boolean;
  translationID?: string;
  eventID?: number;
  observation?: PayloadAction<AZM AIObservation>;
  action?: PayloadAction<AZM AIAction>;
};
