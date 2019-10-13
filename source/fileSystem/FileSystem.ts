import * as fs from 'fs'
import * as path from 'path'
export class FileSystem {
  public static writeObjToFile(filename: string, obj: any) {
    fs.writeFileSync(path.resolve(filename), JSON.stringify(obj))
  }
}
