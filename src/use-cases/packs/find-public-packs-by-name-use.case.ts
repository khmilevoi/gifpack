import { IPack } from "domain/pack.interface";
import { Injector } from "../../injector";

export interface IFindPublicPacksByNameUseCase {
  findPublicPacksByName(name: string): Promise<IPack[]>;
}

export const FindPublicPacksByNameUseCase =
  Injector.create<IFindPublicPacksByNameUseCase>();
