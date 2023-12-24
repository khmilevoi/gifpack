import { IAddImageToStateUseCase } from "use-cases/state/add-image-to-state-use.case";
import { IImage, IState } from "domain/state.interface";
import { IRepository } from "layers/repository.interface";
import { Injector } from "injector";
import { StateRepository } from "repositories/state.repository";
import { ICleanStateUseCase } from "use-cases/state/clean-state.use-case";
import { ILoadStateByIdUseCase } from "use-cases/state/load-state-by-id.use-case";
import { IdGenerator, IIdGenerator } from "layers/id-generator.interface";
import { IMoveStageUseCase } from "use-cases/state/move-stage.use-case";

export class StateService
  implements
    IAddImageToStateUseCase,
    ICleanStateUseCase,
    ILoadStateByIdUseCase,
    IMoveStageUseCase
{
  private readonly stateRepository: IRepository<IState>;
  private readonly idGenerator: IIdGenerator;

  constructor(injector: Injector) {
    this.stateRepository = injector.resolve(StateRepository);
    this.idGenerator = injector.resolve(IdGenerator);
  }

  async addImageToState(stateId: string, image: IImage): Promise<void> {
    const state = await this.stateRepository.get(stateId);

    if (state === null) {
      return;
    }

    await this.stateRepository.update(stateId, {
      ...state,
      images: [...state.images, image],
    });
  }

  async cleanState(stateId: string): Promise<void> {
    await this.stateRepository.remove(stateId);
  }

  async loadStateById(id: string): Promise<IState | null> {
    return await this.stateRepository.get(id);
  }

  async moveToCreatePackNameStage(stateId: string): Promise<void> {
    await this.stateRepository.addOrUpdate(stateId, {
      id: this.idGenerator.generateId(),
      stage: "create-pack:name",
      images: [],
      packId: null,
    });
  }

  async moveToAddItemImagesStage(
    stateId: string,
    packId: string,
  ): Promise<void> {
    await this.stateRepository.addOrUpdate(stateId, {
      id: this.idGenerator.generateId(),
      stage: "add-item:images",
      images: [],
      packId: packId,
    });
  }

  async moveToAddItemPackStage(stateId: string): Promise<void> {
    await this.stateRepository.addOrUpdate(stateId, {
      id: this.idGenerator.generateId(),
      stage: "add-item:pack",
      images: [],
      packId: null,
    });
  }
}
