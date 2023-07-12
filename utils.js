import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const fileExist = async (path) => {
  let readfilename = __dirname + "/" + path;
  try {
    if (fs.existsSync(readfilename )) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};

const readFile = async (file) => {
  let readfilename = __dirname + "/" + file;
  try {
    let result = await fs.promises.readFile(readfilename , "utf-8");
    let data = await JSON.parse(result);
    return data;
  } catch (err) {
    return false;
  }
};

const writeFile = async (file, data) => {
  let readfilename = __dirname + "/" + file;
  try {
    await fs.promises.writeFile(readfilename, JSON.stringify(data));
    return true;
  } catch (err) {
    console.log(err);
  }
};

const deleteFile = async (file) => {
  let readfilename = __dirname + "/" + file;
  try {
    await fs.promises.unlink(readfilename);
    return true;
  } catch (err) {
    console.log(err);
  }
};

export default { readFile, writeFile, deleteFile };