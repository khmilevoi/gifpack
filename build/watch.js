import esbuild from "esbuild";
import { createBuildSettings } from "./settings.js";

const settings = createBuildSettings({
  sourcemap: true,
});

const ctx = await esbuild.context(settings);

await ctx.watch();
