import express from "express";
import chalk from "chalk";

import { convertCLTToPJ } from "./controllers/calculator-controller";
const server = express()

server.get("/", (req, res) => {
    res.send("ok")
})

server.get("/calculator", convertCLTToPJ)

const PORT = 4000
server.listen(PORT, () => {
  console.log(chalk.blueBright(`Server is listening on port ${PORT}.`));
});