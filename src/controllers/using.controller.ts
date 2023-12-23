import { Injector } from "injector";
import { IAnswer } from "layers/answer.interface";
import { FindPublicPacksByNameUseCase } from "use-cases/packs/find-public-packs-by-name-use.case";
import { LoadPackItemsFromPackUseCase } from "use-cases/packs/load-pack-items-from-pack.use-case";
import { FindPacksByUserIdUseCase } from "use-cases/packs/find-packs-by-user-id.use-case";

export class UsingController {
  constructor(private readonly injector: Injector) {}

  async handleMessage(userId: string, message: string): Promise<IAnswer> {
    if (message.trim() === "") {
      const userPacks = await this.injector
        .resolve(FindPacksByUserIdUseCase)
        .findPacksByUserId(userId);

      if (userPacks.length === 0) {
        return noItemsAnswer;
      }

      return {
        inlineMessages: userPacks.map((pack) => ({
          type: "text",
          content: pack.name,
          id: pack.id,
        })),
      };
    }

    const publicPacks = await this.injector
      .resolve(FindPublicPacksByNameUseCase)
      .findPublicPacksByName(message);

    if (publicPacks.length > 1) {
      return {
        inlineMessages: publicPacks.map((pack) => ({
          type: "text",
          content: pack.name,
          id: pack.id,
        })),
      };
    }

    if (publicPacks.length === 1) {
      const [currentPack] = publicPacks;

      const packItems = await this.injector
        .resolve(LoadPackItemsFromPackUseCase)
        .loadPackItemsFromPack(currentPack.id);

      if (packItems.length === 0) {
        return noItemsAnswer;
      }

      return {
        inlineMessages: packItems.map((packItem) => ({
          type: "image",
          content: packItem.content,
          id: packItem.id,
        })),
      };
    }

    return {
      inlineMessages: [
        {
          type: "text",
          content: "No packs found",
          id: "no-packs",
        },
      ],
    };
  }
}

const noItemsAnswer: IAnswer = {
  inlineMessages: [
    {
      type: "text",
      content: "No items in pack",
      id: "no-items",
    },
  ],
};
