import { useParams, Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { sections } from "@/lib/content";
import { useProgress, useUpdateProgress } from "@/hooks/use-app";
import { cn } from "@/lib/utils";

export default function Section() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { data: progress } = useProgress();
  const { mutateAsync: updateProgress, isPending } = useUpdateProgress();

  const sectionIndex = sections.findIndex(s => s.id === id);
  const section = sections[sectionIndex];
  
  if (!section) {
    return <div className="p-8 text-center">Section not found.</div>;
  }

  const nextSection = sections[sectionIndex + 1];
  const sectionProgress = progress?.sections?.find(s => s.sectionId === section.id);
  const isCompleted = sectionProgress?.completed;

  const handleComplete = async () => {
    await updateProgress({ sectionId: section.id, completed: true });
    setLocation(`/section/${section.id}/quiz`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
          Section {sectionIndex + 1} of {sections.length}
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-extrabold text-foreground">{section.title.split('. ')[1] || section.title}</h1>
        <p className="text-lg text-muted-foreground">{section.description}</p>
      </div>

      <div className="space-y-6">
        {section.content.map((block, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border"
          >
            <h2 className="text-xl font-bold font-display text-foreground mb-4">{block.title}</h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              {block.body.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>

            {block.callout && (
              <div className={cn(
                "mt-6 p-4 rounded-xl border flex gap-4",
                block.callout.type === "warning" ? "bg-amber-500/10 border-amber-500/20 text-amber-900 dark:text-amber-200" : "bg-blue-500/10 border-blue-500/20 text-blue-900 dark:text-blue-200"
              )}>
                <div className="flex-shrink-0 mt-0.5">
                  {block.callout.type === "warning" ? <AlertTriangle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                </div>
                <div className="text-sm font-medium">
                  {block.callout.text}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          {isCompleted ? (
            <p className="text-green-600 font-bold flex items-center gap-2 justify-center sm:justify-start">
              <CheckCircle className="w-5 h-5" /> Section Completed
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">Finish reading to proceed to the quiz.</p>
          )}
        </div>
        
        <button
          onClick={handleComplete}
          disabled={isPending}
          className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-2"
        >
          {isPending ? "Saving..." : (isCompleted ? "Retake Quiz" : "Complete & Take Quiz")}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
