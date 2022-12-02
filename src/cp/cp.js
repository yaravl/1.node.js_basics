import stream from "stream";
import url from "url";
import path from "path";
import child_process from "child_process";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFile = path.join(__dirname, "files", "script.js");

const spawnChildProcess = async (args) => {
  const child = await child_process.fork(pathToFile, args, { silent: true });

  child.on("exit", (code) => {
    console.log(`Exit childProcess with code ${code}`);
  });
  child.stderr.on("data", (error) => {
    console.info(`error: ${error}`);
  });
  stream.pipeline(child.stdout, process.stdout, (err) => {
    console.log("asdasdasdasdas", err);
  });
  child.stdout.on("data", (data) => {
    console.log(`Received chunk stdout: ${data}`);
  });
  stream.pipeline(process.stdin, child.stdin, (err) => {
    console.log("asdasd", err);
  });

  // child.stderr.on("data", (err) => {
  //   console.log(err);
  // });
  //
  // stream.pipeline(child.stdout, process.stdout, (err) => console.log(err));
  //
  // child.stdout.on("data", (data) => {
  //   console.log(`Received chunk stdout: ${data}`);
  // });
  //
  // stream.pipeline(process.stdin, child.stdin, (err) => console.log(err));
};

await spawnChildProcess(["asf", "asd", "CLOSE", "qwe"]);
