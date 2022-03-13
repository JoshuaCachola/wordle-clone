import * as fs from 'fs/promises';

export async function readWordFile() {
  const reader = await fs.readFile('/public/words');

  reader.forEach(word => console.log(word));
}