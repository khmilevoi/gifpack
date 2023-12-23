import { IUser } from "domain/user.interface.js";
import { IRepository } from "layers/repository.interface.js";
import { IPack } from "domain/pack.interface.js";
import { IPackItem } from "domain/pack-item.interface.js";
import { ILoadPacksUseCase } from "../use-cases/packs/load-packs.use-case.js";
import { IFindPublicPacksByNameUseCase } from "../use-cases/packs/find-public-packs-by-name-use.case.js";
import { Injector } from "../injector.js";
import { injector } from "../index.js";
import { PackRepository } from "../repositories/pack.repository.js";

export class PackService
  implements ILoadPacksUseCase, IFindPublicPacksByNameUseCase
{
  private readonly packRepository: IRepository<IPack> =
    injector.get(PackRepository);

  loadPacks(): Promise<IPack[]> {
    return this.packRepository.getAll();
  }

  findPacksByName(name: string): Promise<IPack | null> {
    return this.packRepository.findOne({ name });
  }
}
