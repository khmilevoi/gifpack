import { IPackItem } from "../../domain/pack-item.interface";
import { Injector } from "../../injector";

export interface ILoadPackItemsFromPackUseCase {
  loadPackItemsFromPack(packId: string): Promise<IPackItem[]>;
}

export const LoadPackItemsFromPackUseCase =
  Injector.create<ILoadPackItemsFromPackUseCase>();
