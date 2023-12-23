import { IPack } from "domain/pack.interface";
import { Injector } from "../../injector";

export interface ILoadPacksUseCase {
  loadPacks(): Promise<IPack[]>;
}

export const LoadPacksUseCase = Injector.create<ILoadPacksUseCase>();
