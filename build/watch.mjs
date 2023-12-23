import esbuild from "esbuild";
import { createBuildSettings } from "./settings.mjs";

const settings = createBuildSettings({
  sourcemap: 'inline',
});

const ctx = await esbuild.context(settings);

await ctx.watch();
