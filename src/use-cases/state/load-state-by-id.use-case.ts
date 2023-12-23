import { IState } from "domain/state.interface";
import { Injector } from "injector";

export interface ILoadStateByIdUseCase {
  loadStateById(id: string): Promise<IState | null>;
}

export const LoadStateByIdUseCase = Injector.create<ILoadStateByIdUseCase>();
