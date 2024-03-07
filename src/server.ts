import dotenv from "dotenv";
import chalk from "chalk";
import app from "./app";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(chalk.blackBright(`Server is listening on port ${PORT}.`));
});
