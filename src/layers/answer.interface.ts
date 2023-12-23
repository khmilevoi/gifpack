export interface IAnswer {
  inlineMessages?: {
    type: "text" | "image";
    id: string;
    content: string;
  }[];
}
