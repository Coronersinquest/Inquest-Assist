import { Link } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Clock, ChevronRight, GraduationCap, ExternalLink } from "lucide-react";
import { useProgress } from "@/hooks/use-app";
import { sections } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { data: progress, isLoading } = useProgress();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const overallPercent = progress?.overallPercent || 0;
  const completedCount = progress?.sections?.filter(s => s.completed).length || 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-card shadow-xl border border-border/50"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/medical-hero.png`} 
            alt="Medical Abstract Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-transparent" />
        </div>
        
        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2">
              <GraduationCap className="w-4 h-4" />
              Professional Development
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-foreground leading-tight">
              Prepare for the <br />
              <span className="text-primary">Coroner's Court</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Inquest Assist helps UK clinicians prepare for inquests. Complete all four course sections to gain access to the preparation checklist.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link href={sections[0].id ? `/section/${sections[0].id}` : "#"} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                Start Learning <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href="https://www.amazon.co.uk/Clinicians-Brief-Guide-Coroners-Inquests/dp/1009450093/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 transition-all duration-200"
              >
                <BookOpen className="w-4 h-4" />
                Buy the Book
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Circular Progress Widget */}
          <div className="w-48 h-48 relative flex items-center justify-center bg-card rounded-full shadow-2xl border-4 border-background flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90 absolute inset-0">
              <circle cx="96" cy="96" r="88" className="stroke-muted fill-none" strokeWidth="12" />
              <motion.circle 
                cx="96" cy="96" r="88" 
                className="stroke-primary fill-none" 
                strokeWidth="12" 
                strokeLinecap="round"
                strokeDasharray="552"
                initial={{ strokeDashoffset: 552 }}
                animate={{ strokeDashoffset: 552 - (552 * overallPercent) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="text-center relative z-10">
              <span className="text-4xl font-display font-extrabold text-primary">{Math.round(overallPercent)}%</span>
              <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">Complete</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card p-6 rounded-2xl border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl text-primary"><BookOpen className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Sections</p>
            <p className="text-2xl font-bold">{sections.length}</p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-2xl border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-xl text-green-600"><CheckCircle className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold">{completedCount}</p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-2xl border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-accent/10 rounded-xl text-accent"><Clock className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Est. Time</p>
            <p className="text-2xl font-bold">~45 mins</p>
          </div>
        </div>
      </div>

      {/* Course Content List */}
      <div>
        <h2 className="text-2xl font-display font-bold mb-6">Course Content</h2>
        <div className="space-y-4">
          {sections.map((section, index) => {
            const sectionProgress = progress?.sections?.find(s => s.sectionId === section.id);
            const isCompleted = sectionProgress?.completed;
            const score = sectionProgress?.quizScore;

            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={section.id}
              >
                <Link href={`/section/${section.id}`} className="block group">
                  <div className={cn(
                    "bg-card rounded-2xl p-6 border transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start sm:items-center relative overflow-hidden",
                    isCompleted ? "hover:border-primary/50" : "hover:border-primary hover:shadow-md"
                  )}>
                    {/* Status Indicator */}
                    <div className="flex-shrink-0 relative">
                      {isCompleted ? (
                        <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/20">
                          <CheckCircle className="w-6 h-6" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold text-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {index + 1}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className={cn(
                        "text-xl font-bold font-display transition-colors",
                        isCompleted ? "text-foreground" : "group-hover:text-primary"
                      )}>{section.title}</h3>
                      <p className="text-muted-foreground mt-1 text-sm">{section.description}</p>
                    </div>

                    <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2 self-stretch sm:self-auto w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-border">
                      {isCompleted && score !== undefined && score !== null && (
                        <span className="text-xs font-bold px-3 py-1 bg-green-500/10 text-green-700 rounded-full">
                          Quiz: {score}%
                        </span>
                      )}
                      <div className="flex items-center text-sm font-bold text-primary ml-auto group-hover:translate-x-1 transition-transform">
                        {isCompleted ? "Review Section" : "Start Section"}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Book Credit Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
      >
        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary flex items-center justify-center shadow-md">
          <BookOpen className="w-7 h-7 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Based on</p>
          <h3 className="font-display font-bold text-foreground text-base leading-snug">
            A Clinician's Brief Guide to the Coroner's Court and Inquests
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Edited by Gabrielle Pendlebury &amp; Derek Tracy &mdash; Cambridge University Press / RCPsych
          </p>
        </div>
        <a
          href="https://www.amazon.co.uk/Clinicians-Brief-Guide-Coroners-Inquests/dp/1009450093/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 shadow-md shadow-primary/20 whitespace-nowrap"
        >
          Buy on Amazon <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </div>
  );
}
