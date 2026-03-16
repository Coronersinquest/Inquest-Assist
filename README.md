# Inquest Preparation Guide

A web application designed to help healthcare professionals in England and Wales prepare for and navigate the coroner's inquest process with confidence.

---

## What is this app?

This app is an interactive learning guide based on *A Clinician's Brief Guide to the Coroner's Court and Inquests* (edited by Gabrielle Pendlebury and Derek Tracy, Cambridge University Press / RCPsych). It walks clinicians through the entire inquest process — from first notification through to post-inquest outcomes — using structured learning sections, knowledge quizzes, and a practical preparation checklist.

It is aimed at doctors, nurses, and other healthcare professionals who have been notified of involvement in a coroner's inquest and want to understand the process, write a strong statement, and attend court prepared.

---

## Features

### 4 Learning Sections

Each section contains structured educational content with callout boxes highlighting important warnings and tips, followed by a true/false knowledge quiz.

**Section 1 — The Purpose of an Inquest**
- The inquisitorial nature of the coroner's court (not adversarial — no blame is assigned)
- The four questions an inquest must answer: who, where, when, and how (or in what circumstances) the deceased came by their death
- When Article 2 (Right to Life) is engaged and what that means for scope
- Pre-Inquest Review Hearings (PIRH): purpose, what is decided, and how they differ from the inquest itself
- When a jury is required (approximately 1% of cases)
- Rule 23: giving written evidence without attending in person

**Section 2 — Request for a Statement**
- What to include in a statement: personal details, chronology, patient history, condolences
- Dos and don'ts: writing honestly in first person, avoiding jargon, not commenting on others
- Formatting tips: typed, signed, dated; chronological structure; 24-hour clock for times
- Supplementary statements: when and how to provide one
- Why accuracy matters more than speed

**Section 3 — Attending as a Witness**
- GMC Good Medical Practice obligations (paragraph 89): honesty, accuracy, not omitting relevant information
- Types of witness: witness of fact, interested person (IP), and expert witness
- Interested Person status: what it means, rights it confers (legal representation, disclosure, questioning witnesses), and why it matters
- Practical preparation before attending court
- On the day: what to expect, how to dress, swearing in, addressing the coroner as "Sir" or "Madam"
- Tips for the witness box: staying calm, keeping answers brief, not leaving until released

**Section 4 — Post Inquest**
- Short-form conclusions (suicide, natural causes, accident, unlawful killing, etc.) and narrative verdicts
- Regulation 28 Prevention of Future Death reports: what triggers them, who receives them, and the 56-day response deadline
- Civil proceedings that may follow
- What to do if criticised by the coroner: informing the GMC without delay, contacting your MDO
- Where to find support: colleagues, GP, psychological support, Medical Defence Organisation (MDO)

### Knowledge Quizzes

Each section ends with a 3-question true/false quiz. After each answer, a detailed explanation is shown — whether correct or incorrect — reinforcing the learning. Scores are saved and displayed on the dashboard.

### Preparation Checklist

A practical pre-court checklist drawn from the course material, covering:
- Reading your statement and reviewing medical records
- Clarifying your witness status (witness of fact vs interested person)
- Locating the court and planning travel
- Confirming how long you will be needed
- Ensuring medical records will be available at court
- Arranging adequate clinical cover

Items can be checked off and readiness is tracked as a percentage.

### Progress Tracking

Progress is tracked per session across all four sections, including:
- Which sections have been read and marked complete
- Quiz scores per section
- Overall completion percentage shown in the sidebar and dashboard hero

---

## The Book

This app is based on:

**A Clinician's Brief Guide to the Coroner's Court and Inquests**
Edited by Gabrielle Pendlebury and Derek Tracy
Published by Cambridge University Press in association with the Royal College of Psychiatrists (RCPsych)

Available to buy on Amazon UK: https://www.amazon.co.uk/Clinicians-Brief-Guide-Coroners-Inquests/dp/1009450093/

---

## Technical Overview

The app is a full-stack TypeScript application built on a pnpm monorepo.

**Frontend** (`artifacts/inquest-guide`)
- React 19 + Vite
- Tailwind CSS v4 with a custom theme inspired by the book's forest green and yellow-gold colour palette
- Framer Motion for page and element animations
- TanStack React Query for data fetching and cache management
- Wouter for client-side routing

**Backend** (`artifacts/api-server`)
- Node.js + Express 5
- Session-based progress tracking (cookie session ID)
- REST API endpoints:
  - `GET /api/progress` — retrieve section completion and quiz scores
  - `POST /api/progress` — update progress for a section
  - `POST /api/quiz` — submit a true/false quiz answer and receive correctness + explanation
  - `GET /api/healthz` — health check

**Database** (`lib/db`)
- PostgreSQL via Replit's managed database
- Drizzle ORM for schema definition and queries
- Schema: `section_progress` table storing session ID, section ID, completion status, quiz score, and last visited timestamp

**API Contract** (`lib/api-spec`)
- OpenAPI 3.1 specification as the source of truth
- Orval codegen generates React Query hooks (`lib/api-client-react`) and Zod validation schemas (`lib/api-zod`) from the spec

---

## Colour Scheme

The visual design is directly inspired by the book cover:

| Role | Colour |
|---|---|
| Sidebar background | Dark forest green `hsl(133, 55%, 18%)` |
| Active nav / buttons | Bright yellow-gold `hsl(48, 88%, 55%)` |
| Page background | Soft green-tinted white `hsl(120, 18%, 97%)` |
| Body text | Deep forest green `hsl(133, 55%, 10%)` |
| Cards | White |

---

## Deployment

The app is deployed and publicly accessible via Replit. The frontend is served as a static build; the API server runs as a Node.js process connected to the managed PostgreSQL database.

---

## Disclaimer

This app is an educational tool intended to help healthcare professionals familiarise themselves with the inquest process. It does not constitute legal advice. Anyone facing an inquest should contact their Medical Defence Organisation (MDO) at the earliest opportunity.
