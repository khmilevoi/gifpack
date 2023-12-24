import { Injector } from "injector";

export interface IMakePrivateUseCase {
  maePublic(packId: string): Promise<void>;
}

export const MakePrivateUseCase = Injector.create<IMakePrivateUseCase>();
