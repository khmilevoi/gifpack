export interface IPackItem {
  id: string;
  content: string;
  type: "gif" | "image";
  userId: string;
  isPublic: boolean;
}
