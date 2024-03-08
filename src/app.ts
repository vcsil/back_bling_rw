import express from "express";
import "express-async-errors";
import cors from "cors";

import { convertCLTToPJ } from "./controllers/calculator-controller";
import router from "./routers/router";

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);
app.get("/", (_req, res) => {
    res.send("oiiii");
});

app.get("/calculator", convertCLTToPJ);

export default app;
