import { Injector } from "../injector";
import { UsingController } from "./using.controller";
import { FindPacksByUserIdUseCase } from "../use-cases/packs/find-packs-by-user-id.use-case";
import { FindPublicPacksByNameUseCase } from "../use-cases/packs/find-public-packs-by-name-use.case";
import { LoadPackItemsFromPackUseCase } from "../use-cases/packs/load-pack-items-from-pack.use-case";

describe("using.controller", () => {
  let injector: Injector;
  let controller: UsingController;

  beforeEach(() => {
    injector = new Injector();
    controller = new UsingController(injector);

    injector.register(FindPacksByUserIdUseCase, {
      findPacksByUserId: () =>
        Promise.resolve([
          { id: "1", name: "Pack 1", userId: "1", isPublic: true },
          { id: "2", name: "Pack 2", userId: "1", isPublic: true },
        ]),
    });

    injector.register(FindPublicPacksByNameUseCase, {
      findPublicPacksByName: (name) =>
        Promise.resolve(
          [
            {
              id: "3",
              name: "Public",
              userId: "2",
              isPublic: true,
            },
            {
              id: "4",
              name: "Public Pack 1",
              userId: "2",
              isPublic: true,
            },
            {
              id: "5",
              name: "Public Pack 2",
              userId: "2",
              isPublic: true,
            },
          ].filter((pack) => pack.name.includes(name)),
        ),
    });

    injector.register(LoadPackItemsFromPackUseCase, {
      loadPackItemsFromPack: (packId) =>
        Promise.resolve(
          packId === "4"
            ? [
                {
                  id: "item1",
                  content: "Item 1 Content",
                },
              ]
            : [],
        ),
    });
  });

  it("should handleMessage with empty message and return user packs", async () => {
    const result = await controller.handleMessage("1", "");
    expect(result).toEqual({
      inlineMessages: [
        { type: "text", content: "Pack 1", id: "1" },
        { type: "text", content: "Pack 2", id: "2" },
      ],
    });
  });

  it("should handle message leading to multiple public packs", async () => {
    const result = await controller.handleMessage("1", "Public");
    expect(result).toEqual({
      inlineMessages: [
        {
          content: "Public",
          id: "3",
          type: "text",
        },
        {
          content: "Public Pack 1",
          id: "4",
          type: "text",
        },
        {
          content: "Public Pack 2",
          id: "5",
          type: "text",
        },
      ],
    });
  });

  it("should handle message leading to a single public pack with no items", async () => {
    const result = await controller.handleMessage("1", "Public Pack 1");
    expect(result).toEqual({
      inlineMessages: [
        {
          content: "Item 1 Content",
          id: "item1",
          type: "image",
        },
      ],
    });
  });

  it("should handle message with no packs found", async () => {
    const result = await controller.handleMessage("1", "No Match");
    expect(result).toEqual({
      inlineMessages: [
        {
          content: "No packs found",
          id: "no-packs",
          type: "text",
        },
      ],
    });
  });

  it("should handle message with no pack items found", async () => {
    const result = await controller.handleMessage("1", "Public Pack 2");
    expect(result).toEqual({
      inlineMessages: [
        {
          content: "No items in pack",
          id: "no-items",
          type: "text",
        },
      ],
    });
  });

  it("should return no items answer when user has no packs", async () => {
    injector.register(FindPacksByUserIdUseCase, {
      findPacksByUserId: () => Promise.resolve([]),
    });

    const result = await controller.handleMessage("1", "");
    expect(result).toEqual({
      inlineMessages: [
        {
          type: "text",
          content: "No items in pack",
          id: "no-items",
        },
      ],
    });
  });
});
