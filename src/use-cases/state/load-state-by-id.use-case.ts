import { IState } from "../../domain/state.interface.js";
import { Injector } from "../../injector.js";

export interface ILoadStateByIdUseCase {
  loadStateById(id: string): Promise<IState | null>;
}

export const LoadStateByIdUseCase = Injector.create<ILoadStateByIdUseCase>();
