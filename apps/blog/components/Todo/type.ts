export interface TodoList {
  label: string;
  status: Status;
  description?: string;
}

type Status = "DONE" | "TODO";
