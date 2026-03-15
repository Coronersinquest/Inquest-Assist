import { Router, type IRouter } from "express";
import healthRouter from "./health";
import progressRouter from "./progress";
import quizRouter from "./quiz";

const router: IRouter = Router();

router.use(healthRouter);
router.use(progressRouter);
router.use(quizRouter);

export default router;
