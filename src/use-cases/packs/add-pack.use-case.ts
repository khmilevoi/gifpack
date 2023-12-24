import { IPack } from "domain/pack.interface";
import { Injector } from "injector";

export interface IAddPackUseCase {
  addPack(pack: IAddPackCommand): Promise<IPack>;
}

export type IAddPackCommand = {
  name: string;
  userId: string;
};

export const AddPackUseCase = Injector.create<IAddPackUseCase>();
