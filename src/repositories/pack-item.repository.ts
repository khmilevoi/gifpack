import { Injector } from "injector";
import { IPackItem } from "domain/pack-item.interface";
import { IRepository } from "layers/repository.interface";

export const PackItemRepository = Injector.create<IRepository<IPackItem>>();
