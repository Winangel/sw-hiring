import parse from "csv-parse";
import { createObjectCsvWriter } from "csv-writer";
import fs from "fs";
import { Worker, parentPort } from "worker_threads";
import os from "os";

const weights = [0, 4, 4, 1, 2, 2, 3, 0, 0];
const stopWords = ["consulting", "group"];

const writer = createObjectCsvWriter({
  path: __dirname + "/../out.csv",
  header: [
    { id: "companyAId", title: "company_A_Id" },
    { id: "companyBId", title: "company_B_Id" },
    { id: "matchType", title: "match_type" },
  ],
});

const cpuCount = os.cpus().length;
const workers: Worker[] = [];

const getMatches = () => {
  let entryCount = 0;
  let assigned = 0;
  let processedCount = 0;
  const parserA = parse({ delimiter: "," });

  for (let k = 0; k < cpuCount; k++) {
    const worker = new Worker(__dirname + "/worker.js");
    worker.on("message", async (m) => {
      if (m.type === "perfect" || m.type === "fuzzy") {
        await writer.writeRecords([
          {
            companyAId: m.value[0],
            companyBId: m.value[1],
            matchType: m.type,
          },
        ]);
      }
      assigned--;
      processedCount++;
      parserA.resume();
      console.log(entryCount, processedCount);
    });
    workers.push(worker);
  }
  parserA.on("data", async (entryA: string[]) => {
    if (assigned >= cpuCount) {
      parserA.pause();
    }
    entryCount++;
    workers[entryCount % 4].postMessage(entryA);
    assigned++;
  });
  parserA.on("end", () => {
    console.timeEnd("computeMatches");
  });
  fs.createReadStream(__dirname + "/../dataset_A_dev.csv").pipe(parserA);
};

console.time("computeMatches");
getMatches();
