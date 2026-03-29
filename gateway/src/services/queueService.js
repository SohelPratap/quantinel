const { Queue, Worker } = require("bullmq");
const axios = require("axios");

const connection = { host: process.env.REDIS_HOST || "localhost", port: 6379 };
const ENGINE = process.env.ENGINE_URL || "http://localhost:8000";

const backtestQueue = new Queue("backtest", { connection });

// Worker processes jobs and calls the Python engine
const worker = new Worker(
  "backtest",
  async (job) => {
    const { data } = await axios.post(`${ENGINE}/api/backtest/run`, job.data, { timeout: 300_000 });
    return data;
  },
  { connection, concurrency: 5 }
);

worker.on("completed", (job) => console.log(`[Queue] Job ${job.id} completed`));
worker.on("failed",    (job, err) => console.error(`[Queue] Job ${job.id} failed:`, err.message));

async function addBacktestJob(payload) {
  const job = await backtestQueue.add("run", payload, {
    attempts: 2,
    backoff: { type: "exponential", delay: 2000 },
  });
  return job.id;
}

module.exports = { addBacktestJob, backtestQueue };
