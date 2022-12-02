import fs from "fs/promises";
import url from "url";
import path from "path";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFile = path.join(__dirname, "files", "fresh.txt");
const fileData = "I am fresh and young";

const fileIsExists = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (err) {
    return false;
  }
};
const create = async (path, data) => {
  try {
    const fileExist = await fileIsExists(path);

    if (fileExist) throw "FS operation failed";

    await fs.writeFile(path, data);
  } catch (err) {
    throw new Error(err);
  }
};

create(pathToFile, fileData);
