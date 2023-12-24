import { Injector } from "injector";
import { IPackItem } from "domain/pack-item.interface";
import { IRepository } from "layers/repository.interface";
import { PackItemRepository } from "repositories/pack-item.repository";
import {
  IAddPackItemCommand,
  IAddPackItemUseCase,
} from "use-cases/pack-items/add-pack-item.use-case";
import { IdGenerator, IIdGenerator } from "layers/id-generator.interface";

export class PackItemService implements IAddPackItemUseCase {
  private readonly packItemRepository: IRepository<IPackItem>;
  private readonly idGenerator: IIdGenerator;

  constructor(injector: Injector) {
    this.packItemRepository = injector.resolve(PackItemRepository);
    this.idGenerator = injector.resolve(IdGenerator);
  }

  async addPackItems(packItems: IAddPackItemCommand[]): Promise<IPackItem[]> {
    return await this.packItemRepository.addMany(
      packItems.map((item) => ({
        ...item,
        id: this.idGenerator.generateId(),
      })),
      "id",
    );
  }

  async addPackItem(packItem: IAddPackItemCommand): Promise<IPackItem> {
    return await this.packItemRepository.add(this.idGenerator.generateId(), {
      ...packItem,
      id: this.idGenerator.generateId(),
    });
  }
}
