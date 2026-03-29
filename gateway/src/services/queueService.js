const { Queue, Worker } = require("bullmq");
const axios = require("axios");

const redisUrl = process.env.REDIS_URL
  ? new URL(process.env.REDIS_URL)
  : null;
const connection = {
  host: (redisUrl && redisUrl.hostname) || process.env.REDIS_HOST || "localhost",
  port: (redisUrl && redisUrl.port ? parseInt(redisUrl.port, 10) : null) || parseInt(process.env.REDIS_PORT, 10) || 6379,
};
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
