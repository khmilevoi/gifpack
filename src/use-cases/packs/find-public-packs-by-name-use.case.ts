import { IPack } from "domain/pack.interface.js";
import { Injector } from "../../injector.js";

export interface IFindPublicPacksByNameUseCase {
  findPublicPacksByName(name: string): Promise<IPack[]>;
}

export const FindPublicPacksByNameUseCase =
  Injector.create<IFindPublicPacksByNameUseCase>();
