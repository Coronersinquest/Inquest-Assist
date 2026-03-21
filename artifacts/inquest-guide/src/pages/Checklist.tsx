import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Check, CheckSquare, Lock } from "lucide-react";
import { checklistItems } from "@/lib/content";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAllSectionsComplete } from "@/hooks/use-app";

export default function Checklist() {
  const allComplete = useAllSectionsComplete();

  // Use local storage for checklist persistence
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem("inquest-checklist");
    if (saved) {
      try {
        setChecked(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse checklist state");
      }
    }
  }, []);

  const toggleCheck = (index: number) => {
    const newChecked = { ...checked, [index]: !checked[index] };
    setChecked(newChecked);
    localStorage.setItem("inquest-checklist", JSON.stringify(newChecked));
  };

  const progress = Math.round((Object.values(checked).filter(Boolean).length / checklistItems.length) * 100) || 0;

  if (!allComplete) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
        <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-muted text-muted-foreground mb-2">
          <Lock className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-display font-bold">Checklist Locked</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Complete all four course sections to unlock the preparation checklist.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all duration-200">
          <ArrowLeft className="w-5 h-5" /> Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <CheckSquare className="w-4 h-4" /> Preparation
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold text-foreground">Court Checklist</h1>
          <p className="text-muted-foreground mt-2">Essential steps to take before attending the coroner's court.</p>
        </div>

        <div className="flex-shrink-0 w-full md:w-48 text-right">
          <div className="flex justify-between text-sm font-bold mb-2">
            <span>Readiness</span>
            <span className="text-primary">{progress}%</span>
          </div>
          <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border overflow-hidden">
        {checklistItems.map((item, idx) => {
          const isChecked = !!checked[idx];
          return (
            <div 
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={cn(
                "p-5 flex items-start gap-4 border-b last:border-0 cursor-pointer transition-colors hover:bg-muted/50",
                isChecked && "bg-muted/30"
              )}
            >
              <div className={cn(
                "flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all mt-0.5",
                isChecked 
                  ? "bg-primary border-primary text-primary-foreground" 
                  : "border-muted-foreground/30 text-transparent"
              )}>
                <Check className="w-4 h-4" />
              </div>
              <p className={cn(
                "text-lg transition-all",
                isChecked ? "text-muted-foreground line-through" : "text-foreground font-medium"
              )}>
                {item}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
