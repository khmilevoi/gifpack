export interface IAnswer {
  inlineMessages?: {
    type: "text" | "photo" | "gif";
    id: string;
    content: string;
  }[];
  textMessage?: {
    content: string;
    buttons?: {
      content: string;
    }[];
  };
}
