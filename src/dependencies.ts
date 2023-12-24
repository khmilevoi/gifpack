import { Injector } from "./injector";
import { PackService } from "./services/pack.service";
import { FindPublicPacksByNameUseCase } from "./use-cases/packs/find-public-packs-by-name-use.case";
import { LoadPacksUseCase } from "./use-cases/packs/load-packs.use-case";
import { LoadPackItemsFromPackUseCase } from "./use-cases/pack-items/load-pack-items-from-pack.use-case";
import { IRepositoryFactory } from "./layers/repository.interface";
import { MemoryRepositoryFactory } from "./storage/memory.repository";
import { UserRepository } from "./repositories/user.repository";
import { PackItemRepository } from "./repositories/pack-item.repository";
import { PackRepository } from "./repositories/pack.repository";
import { FindPacksByUserIdUseCase } from "./use-cases/packs/find-packs-by-user-id.use-case";
import { StateRepository } from "./repositories/state.repository";
import { IdGenerator } from "./layers/id-generator.interface";
import { v4 as uuid } from "uuid";
import { StateService } from "./services/state.service";
import { AddImageToStateUseCase } from "./use-cases/state/add-image-to-state-use.case";
import { CleanStateUseCase } from "./use-cases/state/clean-state.use-case";
import { LoadStateByIdUseCase } from "./use-cases/state/load-state-by-id.use-case";
import { PackItemService } from "./services/pack-item.service";
import { AddPackItemUseCase } from "./use-cases/pack-items/add-pack-item.use-case";
import { AddPackUseCase } from "./use-cases/packs/add-pack.use-case";
import { MoveStageUseCase } from "./use-cases/state/move-stage.use-case";
import { FindPackByIdUseCase } from "./use-cases/packs/find-pack-by-id.use-case";
import { FsRepositoryFactory } from "./storage/fs.repository";
import { config } from "./config";

export const injectDependencies = (injector: Injector) => {
  injector.register(IdGenerator, {
    generateId(): string {
      return uuid();
    },
  });

  const fsRepositoryFactory: IRepositoryFactory = new FsRepositoryFactory(
    config.localDbPath,
  );
  const memoryRepositoryFactory: IRepositoryFactory =
    new MemoryRepositoryFactory();

  const userRepository = fsRepositoryFactory.create("users");
  const packRepository = fsRepositoryFactory.create("packs");
  const packItemRepository = fsRepositoryFactory.create("pack-items");
  const stateRepository = memoryRepositoryFactory.create("states");

  injector.register(UserRepository, userRepository);
  injector.register(PackRepository, packRepository);
  injector.register(PackItemRepository, packItemRepository);
  injector.register(StateRepository, stateRepository);

  const packService = new PackService(injector);

  injector.register(FindPublicPacksByNameUseCase, packService);
  injector.register(LoadPacksUseCase, packService);
  injector.register(FindPacksByUserIdUseCase, packService);
  injector.register(LoadPackItemsFromPackUseCase, packService);
  injector.register(AddPackUseCase, packService);
  injector.register(FindPackByIdUseCase, packService);

  const stateService = new StateService(injector);

  injector.register(AddImageToStateUseCase, stateService);
  injector.register(CleanStateUseCase, stateService);
  injector.register(LoadStateByIdUseCase, stateService);
  injector.register(MoveStageUseCase, stateService);

  const packItemService = new PackItemService(injector);

  injector.register(AddPackItemUseCase, packItemService);
};
