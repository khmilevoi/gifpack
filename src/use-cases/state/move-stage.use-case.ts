import { Injector } from "injector";

export interface IMoveStageUseCase {
  moveToAddItemPackStage(stateId: string): Promise<void>;

  moveToAddItemImagesStage(stateId: string, packId: string): Promise<void>;

  moveToCreatePackNameStage(stateId: string): Promise<void>;
}

export const MoveStageUseCase = Injector.create<IMoveStageUseCase>();
