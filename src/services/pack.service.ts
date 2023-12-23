import { IUser } from "domain/user.interface";
import { IRepository } from "layers/repository.interface";
import { IPack } from "domain/pack.interface";
import { IPackItem } from "domain/pack-item.interface";
import { ILoadPacksUseCase } from "../use-cases/packs/load-packs.use-case";
import { IFindPublicPacksByNameUseCase } from "../use-cases/packs/find-public-packs-by-name-use.case";
import { Injector } from "../injector";
import { injector } from "../index";
import { PackRepository } from "../repositories/pack.repository";

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
