import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Check, CheckSquare } from "lucide-react";
import { checklistItems } from "@/lib/content";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Checklist() {
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
