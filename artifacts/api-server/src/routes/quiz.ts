import { Router, type IRouter } from "express";

const router: IRouter = Router();

const QUIZ_ANSWERS: Record<string, { correct: boolean; explanation: string }> = {
  "s1-q1-true": {
    correct: true,
    explanation:
      "Correct. A coroner's inquest must answer four questions: who the deceased was (identity), when and where they came by their death, and how (by what means) — or in what circumstances in Article 2 cases.",
  },
  "s1-q1-false": {
    correct: false,
    explanation:
      "Incorrect. A coroner's inquest must answer four questions: who the deceased was (identity), when and where they came by their death, and how (by what means) — or in what circumstances in Article 2 cases.",
  },
  "s1-q2-true": {
    correct: true,
    explanation:
      "Correct. In complex cases the coroner may hold a Pre-Inquest Review Hearing (PIRH) with interested persons, to decide on the scope of the investigation, identify witnesses, and to plan the inquest date and duration.",
  },
  "s1-q2-false": {
    correct: false,
    explanation:
      "Incorrect. In complex cases the coroner may hold a Pre-Inquest Review Hearing (PIRH) with interested persons, to decide on the scope of the investigation, identify witnesses, and to plan the inquest date and duration.",
  },
  "s1-q3-true": {
    correct: false,
    explanation:
      "Incorrect. Only about 1% of inquests will have a jury (Ministry of Justice, 2024). A jury is only required in specific circumstances set out in the Coroners and Justice Act 2009.",
  },
  "s1-q3-false": {
    correct: true,
    explanation:
      "Correct. Only about 1% of inquests will have a jury. The statement that 10% have a jury is false — the actual figure is much lower.",
  },
  "s2-q1-true": {
    correct: true,
    explanation:
      "Correct. Taking time to produce a clear and comprehensive statement can provide catharsis for the clinician, and it is excellent preparation for giving evidence at the inquest.",
  },
  "s2-q1-false": {
    correct: false,
    explanation:
      "Incorrect. Taking time to produce a clear and comprehensive statement can provide catharsis for the clinician, and it is excellent preparation for giving evidence at the inquest.",
  },
  "s2-q2-true": {
    correct: true,
    explanation:
      "Correct. Your statement should be typed, signed and dated. You should also keep a copy of it in your notes along with a record of how, when and to whom it was submitted.",
  },
  "s2-q2-false": {
    correct: false,
    explanation:
      "Incorrect. Your statement should be typed, signed and dated. You should also keep a copy and a record of how, when and to whom it was submitted.",
  },
  "s2-q3-true": {
    correct: false,
    explanation:
      "Incorrect. While you should write your report as soon as possible while events are fresh, you must ensure it is factually accurate. This requires reviewing medical records and possibly seeking review from your indemnifier or trust legal team.",
  },
  "s2-q3-false": {
    correct: true,
    explanation:
      "Correct. Accuracy is more important than speed. You must review the medical records and may need to seek a review from your indemnifier or trust legal team before submitting.",
  },
  "s3-q1-true": {
    correct: true,
    explanation:
      "Correct. You should address the coroner as 'Sir' or 'Madam'. Direct your answers to the coroner rather than to the advocates.",
  },
  "s3-q1-false": {
    correct: false,
    explanation:
      "Incorrect. You should address the coroner as 'Sir' or 'Madam'. Always direct your answers to the coroner.",
  },
  "s3-q2-true": {
    correct: false,
    explanation:
      "Incorrect. You must wait for the coroner to release you before leaving the court. Leaving before being released would be inappropriate and potentially in contempt of court.",
  },
  "s3-q2-false": {
    correct: true,
    explanation:
      "Correct. You must not leave court until the coroner releases you. If you are unsure whether you have been released, seek clarification before leaving.",
  },
  "s3-q3-true": {
    correct: true,
    explanation:
      "Correct. When called to give evidence, you will be asked to 'swear in' by reading an oath on a holy book, or a non-denominational statement of truth. After this, any failure to tell the truth would amount to perjury.",
  },
  "s3-q3-false": {
    correct: false,
    explanation:
      "Incorrect. When called to give evidence, you will be asked to 'swear in' by reading an oath on a holy book, or a non-denominational statement of truth.",
  },
  "s4-q1-true": {
    correct: true,
    explanation:
      "Correct. When the coroner has heard all the evidence, they will 'sum up' and deliver the conclusion. This can be in 'short form' (e.g., suicide, natural causes) or a narrative verdict.",
  },
  "s4-q1-false": {
    correct: false,
    explanation:
      "Incorrect. When the coroner has heard all the evidence, they will deliver a conclusion in either short form (e.g., suicide) or a narrative form explaining the circumstances.",
  },
  "s4-q2-true": {
    correct: true,
    explanation:
      "Correct. The recipient of a Regulation 28 Prevention of Future Death report has a duty to provide a response within 56 days of the date the report is sent.",
  },
  "s4-q2-false": {
    correct: false,
    explanation:
      "Incorrect. The recipient of a Regulation 28 report must provide a response within 56 days of the date the report is sent.",
  },
  "s4-q3-true": {
    correct: false,
    explanation:
      "Incorrect. If criticised by the coroner, you must inform the GMC without delay and contact your MDO at the earliest opportunity to seek advice and discuss potential remediation steps.",
  },
  "s4-q3-false": {
    correct: true,
    explanation:
      "Correct. Criticism by a coroner cannot be ignored. You must inform the GMC without delay (as required by Good Medical Practice, paragraph 75) and contact your MDO for guidance.",
  },
};

router.post("/quiz", (req, res) => {
  const { questionId, answer } = req.body as { questionId: string; answer: boolean };
  const key = `${questionId}-${answer ? "true" : "false"}`;
  const result = QUIZ_ANSWERS[key];

  if (!result) {
    res.status(400).json({ error: "Unknown question ID" });
    return;
  }

  res.json({ correct: result.correct, explanation: result.explanation });
});

export default router;
