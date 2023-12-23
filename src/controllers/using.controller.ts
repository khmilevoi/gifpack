import { Injector } from "../injector.js";
import { IAnswer } from "../layers/answer.interface.js";
import { FindPublicPacksByNameUseCase } from "../use-cases/packs/find-public-packs-by-name-use.case.js";
import { LoadPacksUseCase } from "../use-cases/packs/load-packs.use-case.js";
import { injector } from "../index.js";
import { LoadPackItemsFromPackUseCase } from "../use-cases/packs/load-pack-items-from-pack.use-case.js";
import { FindPacksByUserIdUseCase } from "../use-cases/packs/find-packs-by-user-id.use-case.js";

export class UsingController {
  constructor(private readonly injector: Injector) {}

  async handleMessage(userId: string, message: string): Promise<IAnswer> {
    if (message.trim() === "") {
      const userPacks = await this.injector
        .resolve(FindPacksByUserIdUseCase)
        .findPacksByUserId(userId);

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

      const packItems = await injector
        .resolve(LoadPackItemsFromPackUseCase)
        .loadPackItemsFromPack(currentPack.id);

      if (packItems.length === 0) {
        return {
          inlineMessages: [
            {
              type: "text",
              content: "No items in pack",
              id: "no-items",
            },
          ],
        };
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
