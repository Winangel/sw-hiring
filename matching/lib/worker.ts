import parse from "csv-parse";
import fs from "fs";
import {
  workerData,
  parentPort,
  MessagePort,
  MessageChannel,
} from "worker_threads";
import { getMatchingScore, isPerfectMatch } from "./core";

const weights = [0, 4, 4, 1, 2, 2, 3, 0, 0];

async function findPerfectMatch(entryA: string[], dataSet: string) {
  return new Promise<[string, string] | false>((resolve) => {
    const sourceStream = fs.createReadStream(dataSet);
    const parserB = parse({ delimiter: "," });
    parserB.on("data", (entryB: string[]) => {
      if (isPerfectMatch(entryA, entryB)) {
        sourceStream.close();
        resolve([entryB[0], entryA[0]]);
      }
    });
    parserB.on("end", () => {
      sourceStream.close();
      resolve(false);
    });
    sourceStream.pipe(parserB);
  });
}

async function findFuzzyMatch(entryA: string[], dataSet: string) {
  return new Promise<[string, string] | false>((resolve) => {
    const sourceStream = fs.createReadStream(dataSet);
    const parserB = parse({ delimiter: "," });
    parserB.on("data", async (entryB: string[]) => {
      let overallScore = getMatchingScore(entryA, entryB, weights);

      if (overallScore > 0.68) {
        sourceStream.close();
        resolve([entryB[0], entryA[0]]);
      }
    });
    parserB.on("end", () => {
      sourceStream.close();
      resolve(false);
    });
    sourceStream.pipe(parserB);
  });
}

function processEntry() {
  if (parentPort) {
    parentPort.on("message", async (entryA) => {
      if (entryA === "end") {
        process.exit();
      }
      const perfectMatch = await findPerfectMatch(
        entryA,
        __dirname + "/../dataset_B.csv"
      );
      if (perfectMatch) {
        parentPort?.postMessage({ type: "perfect", value: perfectMatch });
        return;
      }
      const fuzzyMatch = await findFuzzyMatch(
        entryA,
        __dirname + "/../dataset_B.csv"
      );
      if (fuzzyMatch) {
        parentPort?.postMessage({ type: "fuzzy", value: fuzzyMatch });
        return;
      }
      parentPort?.postMessage({ type: "none" });
      return;
    });
  }
}

processEntry();
