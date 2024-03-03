import express from "express";
import { convertCLTToPJ } from "./controllers/calculator-controller";
const server = express()

server.get("/", (req, res) => {
    res.send("ok")
})

server.get("/calculator", convertCLTToPJ)

const PORT = 4000
server.listen(PORT, () => {
  console.log(`Disponível na porta ${PORT}`);
});