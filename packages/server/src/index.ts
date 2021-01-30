import express from "express";
import { json } from "body-parser";
import organizationRouter from "./routes/organizationRouter";
import questionsRouter from "./routes/questionsRoutes";
import testsRouter from "./routes/testsRouter";
import activeTestsRouter from "./routes/activeTestRouter";
import cors from "cors";

const app = express();

app.use(cors());
app.use(json());

app.use("/organization", organizationRouter);
app.use("/questions", questionsRouter);
app.use("/tests", testsRouter);
app.use("/activetests", activeTestsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
