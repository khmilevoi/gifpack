import { IImage } from "domain/state.interface";
import { Injector } from "injector";

export interface IAddImageToStateUseCase {
  addImageToState(stateId: string, image: IImage): Promise<void>;
}

export const AddImageToStateUseCase =
  Injector.create<IAddImageToStateUseCase>();
