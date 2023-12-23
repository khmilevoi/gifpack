import esbuildPluginTsc from "esbuild-plugin-tsc";

export function createBuildSettings(options) {
  return {
    entryPoints: ["src/index.ts"],
    outfile: "dist/index.js",
    bundle: true,
    platform: "node",
    plugins: [
      esbuildPluginTsc({
        force: true,
        tsconfigPath: "./tsconfig.json",
      }),
    ],
    ...options,
  };
}
