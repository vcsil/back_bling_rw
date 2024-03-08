import express from "express";
import "express-async-errors";
import cors from "cors";

import { convertCLTToPJ } from "./controllers/calculator-controller";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("oiiii");
});

app.get("/calculator", convertCLTToPJ);

export default app;
