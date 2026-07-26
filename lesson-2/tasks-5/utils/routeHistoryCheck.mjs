import settings from "../settings.json" with { type: "json" };
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

class routeHistoryCheck {
 

  static correctedURL() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, settings.historyFilePath);

    console.log(filePath);
    return filePath;
  }

  static async readFile() {
    try {
      const file = await fs.readFile(settings.historyFilePath, "utf-8");
      return JSON.parse(file);
    } catch (err) {
      if (err.code === "ENOENT") {
        return {};
      }

      throw err;
    }
  }
  static async writeFile(route) {
 routeHistoryCheck
   .readFile()
   .then(async (file) => {
     if (file[route]) {
       file[route] += 1;
     } else {
       file[route] = 1;
     }
     await fs.writeFile(
       "./history.json",
       JSON.stringify(file, null, 2),
       "utf-8",
     );
   })
   .catch((err) => console.error(err));

    
  
  }
}
export default routeHistoryCheck;
