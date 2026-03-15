import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Home, CheckSquare, BookOpen, 
  ChevronRight, Award, LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { sections } from "@/lib/content";
import { useProgress } from "@/hooks/use-app";

export function Shell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { data: progressData } = useProgress();

  const navItems = [
    { label: "Dashboard", href: "/", icon: Home },
    { label: "Preparation Checklist", href: "/checklist", icon: CheckSquare },
  ];

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
  const closeMobile = () => setIsMobileOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Logo" className="w-8 h-8 rounded" />
          <span className="font-display font-bold text-lg text-primary">Inquest Guide</span>
        </div>
        <button onClick={toggleMobile} className="p-2 -mr-2 text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg transition-colors">
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar - Desktop & Mobile */}
      <AnimatePresence>
        {(isMobileOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className={cn(
              "fixed inset-y-0 left-0 z-40 w-72 bg-card border-r shadow-xl lg:shadow-none lg:static lg:flex lg:flex-col",
              isMobileOpen ? "flex flex-col pt-16" : "hidden"
            )}
          >
            <div className="hidden lg:flex items-center gap-3 p-6 border-b">
              <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Logo" className="w-10 h-10 rounded-lg shadow-sm" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-tight text-primary">Inquest Guide</span>
                <span className="text-xs text-muted-foreground font-medium">Healthcare Professionals</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
              {/* Main Navigation */}
              <div className="space-y-1">
                <p className="px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Overview</p>
                {navItems.map((item) => {
                  const isActive = location === item.href;
                  return (
                    <Link key={item.href} href={item.href} onClick={closeMobile} className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-foreground/70 hover:bg-muted hover:text-foreground"
                    )}>
                      <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground")} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Sections Navigation */}
              <div className="space-y-1">
                <p className="px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Course Sections</p>
                {sections.map((section) => {
                  const href = `/section/${section.id}`;
                  const isActive = location.startsWith(href);
                  const progress = progressData?.sections?.find(s => s.sectionId === section.id);
                  const isCompleted = progress?.completed;

                  return (
                    <Link key={section.id} href={href} onClick={closeMobile} className={cn(
                      "group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                        : "text-foreground/70 hover:bg-muted hover:text-foreground"
                    )}>
                      <div className="flex items-center gap-3 truncate">
                        <div className={cn(
                          "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold",
                          isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted-foreground/10 text-muted-foreground"
                        )}>
                          {section.title.split('.')[0]}
                        </div>
                        <span className="truncate">{section.title.split('. ')[1]}</span>
                      </div>
                      {isCompleted && (
                        <Award className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-primary-foreground" : "text-primary")} />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
            
            {/* Progress Footer in Sidebar */}
            <div className="p-4 border-t bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-foreground">Overall Progress</span>
                <span className="text-sm font-bold text-primary">{Math.round(progressData?.overallPercent || 0)}%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000 ease-out rounded-full" 
                  style={{ width: `${progressData?.overallPercent || 0}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden" 
          onClick={closeMobile}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto lg:h-screen pt-16 lg:pt-0 relative bg-muted/10">
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
