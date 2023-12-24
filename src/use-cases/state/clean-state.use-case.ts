import { Injector } from "injector";

export interface ICleanStateUseCase {
  cleanState(stateId: string): Promise<void>;
}

export const CleanStateUseCase = Injector.create<ICleanStateUseCase>();
