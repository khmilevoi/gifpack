import { IPackItem } from "domain/pack-item.interface";
import { Injector } from "injector";

export interface IAddPackItemUseCase {
  addPackItem(packItem: IAddPackItemCommand): Promise<IPackItem>;

  addPackItems(packItems: IAddPackItemCommand[]): Promise<IPackItem[]>;
}

export type IAddPackItemCommand = {
  content: string;
  type: "gif" | "image";
  packId: string;
};

export const AddPackItemUseCase = Injector.create<IAddPackItemUseCase>();
