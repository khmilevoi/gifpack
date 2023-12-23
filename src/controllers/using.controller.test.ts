import { Injector } from "../injector.js";
import { UsingController } from "./using.controller.js";

describe("using.controller", () => {
  const createEnvironment = () => {
    const injector = new Injector();

    return new UsingController(injector);
  };

  it("should handleMessage [userId=1, message='']", () => {
    const environment = createEnvironment();

    expect(environment.handleMessage("1", "")).toEqual({
      inlineMessages: [
        {
          type: "text",
          content: "Pack 1",
          id: "1",
        },
        {
          type: "text",
          content: "Pack 2",
          id: "2",
        },
      ],
    });
  });
});
