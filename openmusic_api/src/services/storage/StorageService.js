import fs from 'fs';
import path, { resolve } from 'path';

class StorageService {
  constructor(folder) {
    this._folder = folder;
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  writeFile(file, meta) {
    const filename = `${Date.now()}-${meta.filename}`;
    const filePath = path.resolve(this._folder, filename);

    const fileStream = fs.createWriteStream(filePath);

    return new Promise((resolve, reject) => {
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
      file.on('error', reject);
    });
  }
}

export default StorageService;
