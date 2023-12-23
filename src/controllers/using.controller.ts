import { Injector } from "injector";
import { IAnswer } from "layers/answer.interface";
import { FindPublicPacksByNameUseCase } from "use-cases/packs/find-public-packs-by-name-use.case";
import { LoadPackItemsFromPackUseCase } from "use-cases/packs/load-pack-items-from-pack.use-case";
import { FindPacksByUserIdUseCase } from "use-cases/packs/find-packs-by-user-id.use-case";

export class UsingController {
  constructor(private readonly injector: Injector) {}

  async handleMessage(userId: string, message: string): Promise<IAnswer> {
    if (message.trim() === "") {
      return this.handleEmptyMessage(userId);
    }

    return this.handleNonEmptyMessage(message);
  }

  private async handleEmptyMessage(userId: string): Promise<IAnswer> {
    const { findPacksByUserId } = this.injector.resolve(
      FindPacksByUserIdUseCase,
    );
    const userPacks = await findPacksByUserId(userId);

    if (userPacks.length === 0) {
      return NO_ITEMS_ANSWER;
    }

    return {
      inlineMessages: userPacks.map(({ name, id }) => ({
        type: "text",
        content: name,
        id,
      })),
    };
  }

  private async handleNonEmptyMessage(message: string): Promise<IAnswer> {
    const { findPublicPacksByName } = this.injector.resolve(
      FindPublicPacksByNameUseCase,
    );
    const publicPacks = await findPublicPacksByName(message);

    if (publicPacks.length === 0) {
      return NO_PACKS_FOUND_ANSWER;
    }

    if (publicPacks.length > 1) {
      return {
        inlineMessages: publicPacks.map(({ name, id }) => ({
          type: "text",
          content: name,
          id,
        })),
      };
    }

    const [currentPack] = publicPacks;
    const { loadPackItemsFromPack } = this.injector.resolve(
      LoadPackItemsFromPackUseCase,
    );
    const packItems = await loadPackItemsFromPack(currentPack.id);

    if (packItems.length === 0) {
      return NO_ITEMS_ANSWER;
    }

    return {
      inlineMessages: packItems.map(({ content, id }) => ({
        type: "image",
        content,
        id,
      })),
    };
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
