import { Observable } from 'rxjs';
import { mergeMap, reduce } from 'rxjs/operators';
import setWith from 'lodash.setwith';
import { promises as fs, readFileSync } from 'fs';
import * as fsPath from 'path';

type TranslationJsonEntry = {
  path: string | string[];
  value: string;
};

type JSONFileSummary = {
  entryCount: number;
  filePath: string;
};

const readAndFilterJson = (filename: string) => {
  try {
    const fileData = readFileSync(filename, 'utf8');
    const dataParsedToJson = JSON.parse(fileData);
    return Object.fromEntries(Object.entries(dataParsedToJson).filter(([key]) => key.startsWith('BASE')));
  } catch (e) {
    return {};
  }
};

export const writeJSONFile = (filePath: string) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  (entries$: Observable<TranslationJsonEntry>): Observable<JSONFileSummary> =>
    entries$.pipe(
      reduce(
        (accumulator, entry) => {
          if (Array.isArray(entry.path)) {
            setWith(accumulator.data, entry.path, entry.value, Object);
          } else {
            accumulator.data[entry.path] = entry.value;
          }
          accumulator.entryCount++;

          return accumulator;
        },
        { data: {} as Record<string, string>, entryCount: 0 },
      ),
      mergeMap(async ({ data, entryCount }) => {
        const localTranslations = readAndFilterJson(filePath);
        const mergedTranslations = {
          ...localTranslations,
          ...data,
        };
        await fs.mkdir(fsPath.dirname(filePath), { recursive: true });
        const fileHandle = await fs.open(filePath, 'w');
        try {
          await fileHandle.writeFile(JSON.stringify(mergedTranslations, null, 2));
        } finally {
          await fileHandle.close();
        }

        return {
          filePath,
          entryCount,
        };
      }),
    );
