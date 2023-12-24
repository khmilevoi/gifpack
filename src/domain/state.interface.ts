export type IState = {
  stage: "add-item:pack" | "add-item:images" | "create-pack:name";
  id: string;
  images: IImage[];
  packId: string | null;
};

export type IImage = {
  type: "image" | "gif";
  content: string;
};
