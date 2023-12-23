import { IPackItem } from "../../domain/pack-item.interface.js";
import { Injector } from "../../injector.js";

export interface ILoadPackItemsFromPackUseCase {
  loadPackItemsFromPack(packId: string): Promise<IPackItem[]>;
}

export const LoadPackItemsFromPackUseCase =
  Injector.create<ILoadPackItemsFromPackUseCase>();
