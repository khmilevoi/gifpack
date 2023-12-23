import * as esbuild from "esbuild";
import { createBuildSettings } from "./settings.mjs";
import * as fs from "fs";

const settings = createBuildSettings({ minify: true, sourcemap: false });

const dir = settings.outfile.split("/").slice(0, -1).join("/");

fs.rmSync(dir, { recursive: true, force: true });

await esbuild.build(settings);
