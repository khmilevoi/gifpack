import { IRepository } from "layers/repository.interface";
import { IPack } from "domain/pack.interface";
import { ILoadPacksUseCase } from "use-cases/packs/load-packs.use-case";
import { IFindPublicPacksByNameUseCase } from "use-cases/packs/find-public-packs-by-name-use.case";
import { PackRepository } from "repositories/pack.repository";
import { IFindPacksByUserIdUseCase } from "use-cases/packs/find-packs-by-user-id.use-case";
import { ILoadPackItemsFromPackUseCase } from "use-cases/packs/load-pack-items-from-pack.use-case";
import { IPackItem } from "domain/pack-item.interface";
import { PackItemRepository } from "repositories/pack-item.repository";
import { Injector } from "injector";

export class PackService
  implements
    ILoadPacksUseCase,
    IFindPublicPacksByNameUseCase,
    IFindPacksByUserIdUseCase,
    ILoadPackItemsFromPackUseCase
{
  private readonly packRepository: IRepository<IPack>;
  private readonly packItemRepository: IRepository<IPackItem>;

  constructor(injector: Injector) {
    this.packRepository = injector.resolve(PackRepository);
    this.packItemRepository = injector.resolve(PackItemRepository);
  }

  loadPacks(): Promise<IPack[]> {
    return this.packRepository.getAll();
  }

  findPacksByName(name: string): Promise<IPack | null> {
    return this.packRepository.findOne({ name });
  }

  findPacksByUserId(userId: string): Promise<IPack[]> {
    return this.packRepository.find({ userId });
  }

  async findPublicPacksByName(name: string): Promise<IPack[]> {
    const packs = await this.packRepository.getAll();

    return packs.filter((pack) => pack.name.includes(name) && pack.isPublic);
  }

  loadPackItemsFromPack(packId: string): Promise<IPackItem[]> {
    return this.packItemRepository.find({ packId });
  }
}
