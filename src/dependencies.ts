import { Injector } from "./injector";
import { PackService } from "./services/pack.service";
import { FindPublicPacksByNameUseCase } from "./use-cases/packs/find-public-packs-by-name-use.case";
import { LoadPacksUseCase } from "./use-cases/packs/load-packs.use-case";
import { LoadPackItemsFromPackUseCase } from "./use-cases/packs/load-pack-items-from-pack.use-case";
import { IRepository, IRepositoryFactory } from "./layers/repository.interface";
import { MemoryRepositoryFactory } from "./storage/memory.repository";
import { IUser } from "./domain/user.interface";
import { IPack } from "./domain/pack.interface";
import { IPackItem } from "./domain/pack-item.interface";
import { UserRepository } from "./repositories/user.repository";
import { PackItemRepository } from "./repositories/pack-item.repository";
import { PackRepository } from "./repositories/pack.repository";
import { FindPacksByUserIdUseCase } from "./use-cases/packs/find-packs-by-user-id.use-case";

export const createDependencies = (injector: Injector) => {
  const repositoryFactory: IRepositoryFactory = new MemoryRepositoryFactory();

  const userRepository: IRepository<IUser> = repositoryFactory.create("users");
  const packRepository: IRepository<IPack> = repositoryFactory.create("packs");
  const packItemRepository: IRepository<IPackItem> =
    repositoryFactory.create("pack-items");

  injector.register(UserRepository, userRepository);
  injector.register(PackRepository, packRepository);
  injector.register(PackItemRepository, packItemRepository);

  const packService = new PackService();
  injector.register(FindPublicPacksByNameUseCase, packService);
  injector.register(LoadPacksUseCase, packService);
  injector.register(FindPacksByUserIdUseCase, packService);
  injector.register(LoadPackItemsFromPackUseCase, packService);
};
