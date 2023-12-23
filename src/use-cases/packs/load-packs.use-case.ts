import { IPack } from "domain/pack.interface.js";
import { Injector } from "../../injector.js";

export interface ILoadPacksUseCase {
  loadPacks(): Promise<IPack[]>;
}

export const LoadPacksUseCase = Injector.create<ILoadPacksUseCase>();
