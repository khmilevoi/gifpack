import { Injector } from "./injector.js";
import { PackService } from "./services/pack.service.js";
import { FindPublicPacksByNameUseCase } from "./use-cases/packs/find-public-packs-by-name-use.case.js";
import { LoadPacksUseCase } from "./use-cases/packs/load-packs.use-case.js";
import { LoadPackItemsFromPackUseCase } from "./use-cases/packs/load-pack-items-from-pack.use-case.js";
import {
  IRepository,
  IRepositoryFactory,
} from "./layers/repository.interface.js";
import { MemoryRepositoryFactory } from "./storage/memory.repository.js";
import { IUser } from "./domain/user.interface.js";
import { IPack } from "./domain/pack.interface.js";
import { IPackItem } from "./domain/pack-item.interface.js";
import { UserRepository } from "./repositories/user.repository.js";
import { PackItemRepository } from "./repositories/pack-item.repository.js";
import { PackRepository } from "./repositories/pack.repository.js";

export const createDependencies = (injector: Injector) => {
  const packService = new PackService();

  injector.register(FindPublicPacksByNameUseCase, packService);
  injector.register(LoadPacksUseCase, packService);
  injector.register(LoadPackItemsFromPackUseCase, packService);

  const repositoryFactory: IRepositoryFactory = new MemoryRepositoryFactory();

  const userRepository: IRepository<IUser> = repositoryFactory.create("users");
  const packRepository: IRepository<IPack> = repositoryFactory.create("packs");
  const packItemRepository: IRepository<IPackItem> =
    repositoryFactory.create("pack-items");

  injector.register(UserRepository, userRepository);
  injector.register(PackRepository, packRepository);
  injector.register(PackItemRepository, packItemRepository);
};
