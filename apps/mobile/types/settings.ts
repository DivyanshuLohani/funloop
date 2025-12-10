export interface ServerData {
  settings: Record<string, any>;
  games: {
    id: string;
    name: string;
    isVisible: boolean;
    [key: string]: any;
  }[];
  displayFlags: Record<string, boolean>;
}
