import express from "express";
import questionsController from "../controllers/questionsController";

const router = express.Router();

router.get("/getquestion", questionsController.getQuestion);
router.post("/addquestion", questionsController.addQuestion);
router.put("/updateQuestion", questionsController.updateQuestion);

export default router;
