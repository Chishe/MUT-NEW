export interface MachineValue {
  "Conv. Speed": number;
  Counter: number;
  Target: number;
}

export type MachineControl = Record<string, boolean>;

export interface MachineSocketData {
  value: {
    "Conv. Speed": number;
    Counter: number;
    Target: number;
  };
  machine: MachineControl;
}