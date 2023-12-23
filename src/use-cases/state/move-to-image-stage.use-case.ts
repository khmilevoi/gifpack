import { Injector } from "../../injector.js";
import { IImage } from "../../domain/state.interface.js";

export interface IMoveToImageStageUseCase {
  moveToImageStage(stateId: string, images: IImage[]): Promise<void>;
}

export const MoveToImageStageUseCase =
  Injector.create<IMoveToImageStageUseCase>();
