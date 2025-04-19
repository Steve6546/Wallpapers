import { AZM AIAction } from "./actions";
import { AZM AIObservation } from "./observations";
import { AZM AIVariance } from "./variances";

export type AZM AIParsedEvent =
  | AZM AIAction
  | AZM AIObservation
  | AZM AIVariance;
