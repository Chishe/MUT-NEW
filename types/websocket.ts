export interface BaseWebSocketMessage {
  type: string;
}

export type WebSocketMessage<T = unknown> = T & BaseWebSocketMessage;

export type WebSocketHandler<T> = (data: T) => void;