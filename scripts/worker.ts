import IORedis from "ioredis";
import { Worker, Job } from "bullmq";
import { sendMail } from "../app/lib/mailer";
import { saveEmail } from "../app/lib/sheets";

const connection = new IORedis(process.env.REDIS_URL!);

const worker = new Worker(
  "email-queue",
  async (job: Job) => {
    const { email } = job.data;
    console.log(`Processing job ${job.id} for ${email}`);

    try {
      await sendMail(email);
      await saveEmail(email);
    } catch (err) {
      console.error("Job failed", err);
      throw err;
    }
  },
  { connection }
);

worker.on("completed", (job:Job) => console.log(`Job ${job.id} completed`));
worker.on("failed", (job: Job | undefined, err: Error) => console.error(`Job ${job?.id} failed`, err));

console.log("Worker started for queue: email-queue");
