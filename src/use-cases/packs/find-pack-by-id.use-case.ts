import { IPack } from "domain/pack.interface";
import { Injector } from "injector";

export interface IFindPackByIdUseCase {
  findPackById(id: string): Promise<IPack | null>;
}

export const FindPackByIdUseCase = Injector.create<IFindPackByIdUseCase>();
