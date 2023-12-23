import { Injector } from "../../injector";
import { IImage } from "../../domain/state.interface";

export interface IMoveToImageStageUseCase {
  moveToImageStage(stateId: string, images: IImage[]): Promise<void>;
}

export const MoveToImageStageUseCase =
  Injector.create<IMoveToImageStageUseCase>();
