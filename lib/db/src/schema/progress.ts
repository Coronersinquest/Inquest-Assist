import { pgTable, text, boolean, real, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const sectionProgressTable = pgTable("section_progress", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  sectionId: text("section_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  quizScore: real("quiz_score"),
  lastVisited: timestamp("last_visited").defaultNow(),
});

export const insertSectionProgressSchema = createInsertSchema(sectionProgressTable).omit({ id: true });
export type InsertSectionProgress = z.infer<typeof insertSectionProgressSchema>;
export type SectionProgress = typeof sectionProgressTable.$inferSelect;
