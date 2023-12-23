import { Injector } from "../../injector.js";
import { IState } from "../../domain/state.interface.js";

export interface IMoveToPackNameStageUseCase {
  moveToPackNameStage(stateId: string, imageType: IState): Promise<void>;
}

export const MoveToPackNameStageUseCase =
  Injector.create<IMoveToPackNameStageUseCase>();
