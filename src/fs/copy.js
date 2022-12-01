import fs from "fs/promises";
import url from "url";
import path from "path";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathJoin = (...paths) => {
  return path.join(__dirname, ...paths);
};

const folderIsExists = async (dirName) => {
  try {
    await fs.access(pathJoin(dirName));
    return true;
  } catch (err) {
    return false;
  }
};

const copy = async (src, dest) => {
  try {
    const foldersExists =
      !(await folderIsExists(src)) || (await folderIsExists(dest));

    if (foldersExists) throw "FS operation failed";

    await fs.mkdir(pathJoin(dest));

    const entries = await fs.readdir(pathJoin(src), { withFileTypes: true });

    for (const entry of entries) {
      await fs.copyFile(pathJoin(src, entry.name), pathJoin(dest, entry.name));
    }
  } catch (err) {
    throw new Error(err);
  }
};

copy("files", "files_copy2");

// возможно заменить проверку на fs.stat
