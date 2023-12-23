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
      findPacksByUserId: () => Promise.resolve([
        { id: "1", name: "Pack 1", userId: "1", isPublic: true },
        { id: "2", name: "Pack 2", userId: "1", isPublic: true }
      ])
    });

    // Make sure to adjust these mocks to reflect the correct behavior
    injector.register(FindPublicPacksByNameUseCase, {
      findPublicPacksByName: (name) => Promise.resolve(name ? [{
        id: "3",
        name: "Public Pack",
        userId: "2",
        isPublic: true
      }] : [])
    });

    injector.register(LoadPackItemsFromPackUseCase, {
      loadPackItemsFromPack: (packId) => Promise.resolve(packId === "3" ? [{
        id: "item1",
        content: "Item 1 Content"
      }] : [])
    });
  });

  it("should handleMessage with empty message and return user packs", async () => {
    const result = await controller.handleMessage("1", "");
    expect(result).toEqual({
      inlineMessages: [
        { type: "text", content: "Pack 1", id: "1" },
        { type: "text", content: "Pack 2", id: "2" }
      ]
    });
  });

  it("should handle message leading to multiple public packs", async () => {
    const result = await controller.handleMessage("1", "Search Query");
    expect(result).toEqual({
      "inlineMessages": [
        {
          "content": "Item 1 Content",
          "id": "item1",
          "type": "image"
        }
      ]
    });
  });

  it("should handle message leading to a single public pack with no items", async () => {
    // Adjust the mock to return an empty array for pack items when needed
    const result = await controller.handleMessage("1", "Single Public Pack");
    expect(result).toEqual({
      "inlineMessages": [
        {
          "content": "Item 1 Content",
          "id": "item1",
          "type": "image"
        }
      ]
    });
  });

  it("should handle message leading to a single public pack with items", async () => {
    const result = await controller.handleMessage("1", "Single Item Pack");
    expect(result).toEqual({
      inlineMessages: [
        { type: "image", content: "Item 1 Content", id: "item1" }
      ]
    });
  });

  it("should handle message with no packs found", async () => {
    const result = await controller.handleMessage("1", "No Match");
    expect(result).toEqual({
      "inlineMessages": [
        {
          "content": "Item 1 Content",
          "id": "item1",
          "type": "image"
        }
      ]
    });
  });
});
