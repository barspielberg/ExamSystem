import express from "express";
import questionsController from "../controllers/questionsController";

const router = express.Router();

// router.get("/", questionsController.getQuestions);
router.post("/addquestion", questionsController.addQuestion); // post "/"

export default router;
