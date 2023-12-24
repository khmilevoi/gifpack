import { Injector } from "injector";
import { IAnswer } from "layers/answer.interface";
import { FindPublicPacksByNameUseCase } from "use-cases/packs/find-public-packs-by-name-use.case";
import { LoadPackItemsFromPackUseCase } from "use-cases/pack-items/load-pack-items-from-pack.use-case";
import { FindPacksByUserIdUseCase } from "use-cases/packs/find-packs-by-user-id.use-case";

export class UsingController {
  constructor(private readonly injector: Injector) {}

  async handleMessage(userId: string, message: string): Promise<IAnswer> {
    const packs = await this.findPacks(userId, message);

    if (packs.length === 0) {
      return NO_PACKS_FOUND_ANSWER;
    }

    if (packs.length > 1) {
      return {
        inlineMessages: packs.map(({ id, name }) => ({
          type: "text",
          content: name,
          id,
        })),
      };
    }

    const pack = packs[0];

    const packItems = await this.injector
      .resolve(LoadPackItemsFromPackUseCase)
      .loadPackItemsFromPack(pack.id);

    if (packItems.length === 0) {
      return NO_ITEMS_ANSWER;
    }

    return {
      inlineMessages: packItems.map(({ id, content, type }) => {
        switch (type) {
          case "gif": {
            return {
              type: "gif",
              content,
              id,
            };
          }
          case "image": {
            return {
              type: "photo",
              content,
              id,
            };
          }
        }
      }),
    };
  }

  private async findPacks(userId: string, message: string) {
    const userPacks = await this.injector
      .resolve(FindPacksByUserIdUseCase)
      .findPacksByUserId(userId);

    const filteredPacks = userPacks.filter(({ name }) =>
      name.startsWith(message.trim()),
    );

    if (filteredPacks.length > 0) {
      return filteredPacks;
    }

    return await this.injector
      .resolve(FindPublicPacksByNameUseCase)
      .findPublicPacksByName(message);
  }
}

const NO_ITEMS_ANSWER: IAnswer = {
  inlineMessages: [
    {
      type: "text",
      content: "No items in pack",
      id: "no-items",
    },
  ],
};

const NO_PACKS_FOUND_ANSWER: IAnswer = {
  inlineMessages: [
    {
      type: "text",
      content: "No packs found",
      id: "no-packs",
    },
  ],
};
