import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, RefreshCcw } from "lucide-react";
import { sections } from "@/lib/content";
import { useUpdateProgress } from "@/hooks/use-app";
import { cn } from "@/lib/utils";

export default function Quiz() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { saveProgress } = useUpdateProgress();

  const sectionIndex = sections.findIndex(s => s.id === id);
  const section = sections[sectionIndex];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [result, setResult] = useState<{ correct: boolean; explanation: string } | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setResult(null);
    setScore(0);
    setIsFinished(false);
  }, [id]);

  if (!section) return <div>Quiz not found.</div>;

  const questions = section.quiz;
  const currentQuestion = questions[currentIndex];
  const nextSection = sections[sectionIndex + 1];

  const handleAnswer = (answer: boolean) => {
    if (result !== null) return;
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setResult({ correct, explanation: currentQuestion.explanation });
    if (correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(curr => curr + 1);
      setSelectedAnswer(null);
      setResult(null);
    } else {
      const finalScore = Math.round((score / questions.length) * 100);
      saveProgress({ sectionId: section.id, completed: true, quizScore: finalScore });
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const percent = Math.round((score / questions.length) * 100);
    const passed = percent >= 66;

    return (
      <div className="max-w-2xl mx-auto py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card rounded-3xl p-8 md:p-12 text-center shadow-xl border"
        >
          <div className="inline-flex justify-center items-center w-24 h-24 rounded-full bg-primary/10 text-primary mb-6">
            {passed ? <CheckCircle className="w-12 h-12" /> : <RefreshCcw className="w-12 h-12" />}
          </div>
          <h2 className="text-3xl font-display font-bold mb-2">Quiz Complete!</h2>
          <p className="text-muted-foreground mb-8">You scored {percent}% on this section.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setSelectedAnswer(null);
                setResult(null);
                setScore(0);
                setIsFinished(false);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              Retake Quiz
            </button>

            {nextSection ? (
              <button
                onClick={() => setLocation(`/section/${nextSection.id}`)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                Next Section <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => setLocation('/')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                Back to Dashboard <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8">
      <Link href={`/section/${section.id}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Reading
      </Link>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold">Knowledge Check</h2>
        <span className="text-sm font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full">
          Question {currentIndex + 1} of {questions.length}
        </span>
      </div>

      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: `${(currentIndex / questions.length) * 100}%` }}
          animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border"
        >
          <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
            {currentQuestion.text}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              disabled={result !== null}
              onClick={() => handleAnswer(true)}
              className={cn(
                "p-4 rounded-xl border-2 text-lg font-bold transition-all duration-200 flex items-center justify-center gap-2",
                selectedAnswer === true
                  ? result?.correct
                    ? "border-green-500 bg-green-500/10 text-green-700"
                    : "border-destructive bg-destructive/10 text-destructive"
                  : "border-border hover:border-primary/50 hover:bg-muted text-foreground",
                result !== null && selectedAnswer !== true && "opacity-50 grayscale"
              )}
            >
              TRUE
            </button>
            <button
              disabled={result !== null}
              onClick={() => handleAnswer(false)}
              className={cn(
                "p-4 rounded-xl border-2 text-lg font-bold transition-all duration-200 flex items-center justify-center gap-2",
                selectedAnswer === false
                  ? result?.correct
                    ? "border-green-500 bg-green-500/10 text-green-700"
                    : "border-destructive bg-destructive/10 text-destructive"
                  : "border-border hover:border-primary/50 hover:bg-muted text-foreground",
                result !== null && selectedAnswer !== false && "opacity-50 grayscale"
              )}
            >
              FALSE
            </button>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className={cn(
                  "mt-6 p-4 rounded-xl border",
                  result.correct ? "bg-green-500/10 border-green-500/20" : "bg-destructive/10 border-destructive/20"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("mt-0.5 flex-shrink-0", result.correct ? "text-green-600" : "text-destructive")}>
                    {result.correct ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className={cn("font-bold text-lg mb-1", result.correct ? "text-green-700 dark:text-green-400" : "text-destructive dark:text-red-400")}>
                      {result.correct ? "Correct!" : "Incorrect"}
                    </p>
                    <p className="text-foreground/80">{result.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleNext}
          disabled={result === null}
          className="px-8 py-3 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
        >
          {currentIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
