import { gptStreamFetch } from "./utils";

(async () => {
  if (process.argv.length < 3) return;

  const content = process.argv.slice(2).join(" ");

  const stream = await gptStreamFetch(content);

  const reader = stream.getReader();
  const decoder = new TextDecoder();

  let done = false;
  let chunkValue = "";

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;

    chunkValue = chunkValue + decoder.decode(value);

    process.stdout.write(chunkValue + "\r");
  }

  process.stdout.write("\n");
})();
