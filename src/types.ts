export type Action =
  | { type: "goto"; url: string }
  | { type: "click"; selector: string }
  | { type: "type"; selector: string; text: string }
  | { type: "extract"; selector: string };

export interface Workflow {
  id: string;
  input: string;
  steps?: Action[];
}

export interface RunResult {
  logs: string[];
  output: any[];
}
