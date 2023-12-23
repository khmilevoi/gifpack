export type IState = {
  id: string;
  userId: string;
} & (
  | {
      stage: "image";
      images: IImage[];
    }
  | {
      stage: "pack-name";
      images: IImage[];
    }
);

export type IImage = {
  type: "image" | "gif";
  content: string;
};
