import type { Config } from "@react-router/dev/config";

/**
 * This script is used to unpack the client directory from the frontend build directory.
 * Remix SPA mode builds the client directory into the build directory. This function
 * moves the contents of the client directory to the build directory.
 *
 * This script is used in the buildEnd function of the Vite config.
 */
const unpackClientDirectory = async () => {
  const fs = await import("fs");
  const path = await import("path");

  const buildDir = path.resolve(__dirname, "build");
  const clientDir = path.resolve(buildDir, "client");

  const copyRecursive = async (src: string, dest: string) => {
    const stats = await fs.promises.stat(src);
    if (stats.isDirectory()) {
      if (!fs.existsSync(dest)) {
        await fs.promises.mkdir(dest);
      }
      const files = await fs.promises.readdir(src);
      await Promise.all(
        files.map((file) =>
          copyRecursive(path.join(src, file), path.join(dest, file)),
        ),
      );
    } else {
      await fs.promises.copyFile(src, dest);
    }
  };

  await copyRecursive(clientDir, buildDir);
};

export default {
  appDirectory: "src",
  buildEnd: unpackClientDirectory,
  ssr: false,
} satisfies Config;
