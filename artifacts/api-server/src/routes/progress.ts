import { Router, type IRouter } from "express";
import { db, sectionProgressTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";

const router: IRouter = Router();

const SECTIONS = ["purpose", "statement", "witness", "post-inquest"];

function getSessionId(req: any): string {
  return req.cookies?.sessionId || "default-session";
}

router.get("/progress", async (req, res) => {
  const sessionId = getSessionId(req);
  const rows = await db
    .select()
    .from(sectionProgressTable)
    .where(eq(sectionProgressTable.sessionId, sessionId));

  const sections = SECTIONS.map((sectionId) => {
    const row = rows.find((r) => r.sectionId === sectionId);
    return {
      sectionId,
      completed: row?.completed ?? false,
      quizScore: row?.quizScore ?? null,
      lastVisited: row?.lastVisited?.toISOString() ?? null,
    };
  });

  const completedCount = sections.filter((s) => s.completed).length;
  const overallPercent = Math.round((completedCount / SECTIONS.length) * 100);

  res.json({ sections, overallPercent });
});

router.post("/progress", async (req, res) => {
  const sessionId = getSessionId(req);
  const { sectionId, completed, quizScore } = req.body as {
    sectionId: string;
    completed: boolean;
    quizScore?: number | null;
  };

  const existing = await db
    .select()
    .from(sectionProgressTable)
    .where(
      and(
        eq(sectionProgressTable.sessionId, sessionId),
        eq(sectionProgressTable.sectionId, sectionId)
      )
    );

  if (existing.length > 0) {
    await db
      .update(sectionProgressTable)
      .set({
        completed,
        quizScore: quizScore ?? existing[0].quizScore,
        lastVisited: new Date(),
      })
      .where(
        and(
          eq(sectionProgressTable.sessionId, sessionId),
          eq(sectionProgressTable.sectionId, sectionId)
        )
      );
  } else {
    await db.insert(sectionProgressTable).values({
      sessionId,
      sectionId,
      completed,
      quizScore: quizScore ?? null,
      lastVisited: new Date(),
    });
  }

  const rows = await db
    .select()
    .from(sectionProgressTable)
    .where(eq(sectionProgressTable.sessionId, sessionId));

  const sections = SECTIONS.map((sid) => {
    const row = rows.find((r) => r.sectionId === sid);
    return {
      sectionId: sid,
      completed: row?.completed ?? false,
      quizScore: row?.quizScore ?? null,
      lastVisited: row?.lastVisited?.toISOString() ?? null,
    };
  });

  const completedCount = sections.filter((s) => s.completed).length;
  const overallPercent = Math.round((completedCount / SECTIONS.length) * 100);

  res.json({ sections, overallPercent });
});

export default router;
