import express from "express";
import { json } from "body-parser";
import questionsRouter from "./routes/questionsRoutes";
import testsRouter from "./routes/testsRoutes";

const app = express();

app.use(json());

app.use("/questions", questionsRouter);
app.use("/tests", testsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
