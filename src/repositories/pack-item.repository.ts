import { Injector } from "../injector.js";
import { IPackItem } from "../domain/pack-item.interface.js";
import { IRepository } from "../layers/repository.interface.js";

export const PackItemRepository = Injector.create<IRepository<IPackItem>>();
