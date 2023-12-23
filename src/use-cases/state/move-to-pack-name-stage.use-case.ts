import { Injector } from "../../injector";
import { IState } from "../../domain/state.interface";

export interface IMoveToPackNameStageUseCase {
  moveToPackNameStage(stateId: string, imageType: IState): Promise<void>;
}

export const MoveToPackNameStageUseCase =
  Injector.create<IMoveToPackNameStageUseCase>();
