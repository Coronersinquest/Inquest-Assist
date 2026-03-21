export interface QuizQuestion {
  id: string;
  text: string;
  correctAnswer: boolean;
  explanation: string;
}

export interface SectionContent {
  id: string;
  title: string;
  description: string;
  content: {
    title: string;
    body: string[];
    callout?: { type: "warning" | "info"; text: string };
  }[];
  quiz: QuizQuestion[];
}

export const sections: SectionContent[] = [
  {
    id: "purpose",
    title: "1. The Purpose of an Inquest",
    description: "Understand the inquisitorial nature of the coroner's court.",
    content: [
      {
        title: "The Inquisitorial Process",
        body: [
          "Unlike criminal or civil courts which are adversarial (parties against each other), a coroner's court is inquisitorial. The coroner's role is to discover the truth about a death, not to assign blame.",
          "A coroner's inquest must answer four key questions:",
          "1. Who the deceased was.",
          "2. Where they came by their death.",
          "3. When they came by their death.",
          "4. How (or in what circumstances) the deceased came by their death."
        ]
      },
      {
        title: "Pre-Inquest Review Hearings (PIRH)",
        body: [
          "In complex cases, the coroner may hold a Pre-Inquest Review Hearing.",
          "The purpose of a PIRH is to decide the scope of the full inquest, identify which witnesses will need to give evidence, determine what further reports are needed, and plan the dates for the final hearing."
        ]
      },
      {
        title: "Juries & Rule 23",
        body: [
          "The vast majority of inquests are held by a coroner sitting alone. Only about 1% of inquests will have a jury (e.g., deaths in state custody or workplace accidents).",
          "Under Rule 23, the coroner can admit written evidence if the maker of the statement cannot attend, or if the evidence is unlikely to be disputed. This means you may provide a statement but not be called to physically attend."
        ]
      }
    ],
    quiz: [
      {
        id: "s1-q1",
        text: "A coroner's inquest must answer four questions: who died, where, when, and how (or in what circumstances) the deceased came by their death.",
        correctAnswer: true,
        explanation: "Correct. A coroner's inquest must answer four questions: who the deceased was (identity), when and where they came by their death, and how (by what means) — or in what circumstances in Article 2 cases."
      },
      {
        id: "s1-q2",
        text: "In complex cases the coroner may hold a Pre-Inquest Review Hearing (PIRH) to decide scope, identify witnesses, and plan dates.",
        correctAnswer: true,
        explanation: "Correct. In complex cases the coroner may hold a Pre-Inquest Review Hearing (PIRH) with interested persons, to decide on the scope of the investigation, identify witnesses, and to plan the inquest date and duration."
      },
      {
        id: "s1-q3",
        text: "About 10% of inquests will have a jury.",
        correctAnswer: false,
        explanation: "Incorrect. Only about 1% of inquests will have a jury (Ministry of Justice, 2024). A jury is only required in specific circumstances set out in the Coroners and Justice Act 2009."
      }
    ]
  },
  {
    id: "statement",
    title: "2. Request for a Statement",
    description: "Guidance on writing statements and reports for the coroner.",
    content: [
      {
        title: "The Importance of Your Statement",
        body: [
          "Taking time to produce a clear and comprehensive statement can provide catharsis for the clinician and act as excellent preparation for giving evidence.",
          "Your statement forms the foundation of your evidence. It is crucial it is accurate, professional, and within the scope of your knowledge."
        ],
        callout: {
          type: "info",
          text: "Accuracy is more important than speed. Ensure you have access to the full medical records before writing your statement."
        }
      },
      {
        title: "Dos and Don'ts",
        body: [
          "DO: Structure it chronologically. Use clear headings.",
          "DO: Ensure it is typed, signed, and dated.",
          "DO: Explain medical terms in plain English. The coroner and family are laypeople in medical matters.",
          "DON'T: Speculate or give opinions outside your area of expertise.",
          "DON'T: Criticize colleagues or other teams. Stick to your factual involvement."
        ]
      },
      {
        title: "Supplementary Statements",
        body: [
          "You may be asked to provide a supplementary statement if new evidence comes to light or if the coroner needs clarification on a specific point. Treat this with the same care as the original."
        ]
      }
    ],
    quiz: [
      {
        id: "s2-q1",
        text: "Taking time to produce a clear and comprehensive statement can provide catharsis for the clinician and act as excellent preparation for giving evidence.",
        correctAnswer: true,
        explanation: "Correct. Taking time to produce a clear and comprehensive statement can provide catharsis for the clinician, and it is excellent preparation for giving evidence at the inquest."
      },
      {
        id: "s2-q2",
        text: "Your statement should be typed, signed and dated.",
        correctAnswer: true,
        explanation: "Correct. Your statement should be typed, signed and dated. You should also keep a copy of it in your notes along with a record of how, when and to whom it was submitted."
      },
      {
        id: "s2-q3",
        text: "It is important to submit your statement as quickly as possible, even if it means less accuracy.",
        correctAnswer: false,
        explanation: "Incorrect. Accuracy is more important than speed. You must review the medical records and may need to seek a review from your indemnifier or trust legal team before submitting."
      }
    ]
  },
  {
    id: "witness",
    title: "3. Attending as a Witness",
    description: "Preparation, witness types, and tips for giving evidence.",
    content: [
      {
        title: "GMC Guidance on Honesty",
        body: [
          "The GMC states you must be honest and trustworthy when giving evidence. You must make sure that any evidence you give or documents you write are not false or misleading.",
          "You must take reasonable steps to check the information is accurate, not deliberately leave out relevant information, not minimize risks of harm, and not present opinion as established fact."
        ]
      },
      {
        title: "Types of Witness",
        body: [
          "Witness of Fact: Indicates the coroner believes your involvement to be peripheral. Your statement forms the basis of your evidence.",
          "Interested Person (IP): Indicates you are more centrally involved in the circumstances leading to death. As an IP you are entitled to legal representation, receive disclosure of documents, and can ask questions of other witnesses.",
          "Expert Witness: Called to give an independent opinion based on specialist knowledge, usually with no personal involvement in the treatment."
        ],
        callout: {
          type: "warning",
          text: "It is crucial you know your status before attending. If you are an Interested Person, you should immediately contact your Medical Defence Organisation (MDO)."
        }
      },
      {
        title: "On the Day",
        body: [
          "Dress smartly in business attire.",
          "When called, you will be asked to 'swear in' by reading an oath on a holy book or a non-denominational statement of truth.",
          "Direct your answers to the coroner, addressing them as 'Sir' or 'Madam'.",
          "Keep answers brief, factual, and in non-technical language.",
          "Do not leave the court until the coroner explicitly releases you."
        ]
      }
    ],
    quiz: [
      {
        id: "s3-q1",
        text: "You should address the coroner as Sir or Madam.",
        correctAnswer: true,
        explanation: "Correct. You should address the coroner as 'Sir' or 'Madam'. Direct your answers to the coroner rather than to the advocates."
      },
      {
        id: "s3-q2",
        text: "You can leave the court once you have finished your evidence.",
        correctAnswer: false,
        explanation: "Correct. You must not leave court until the coroner releases you. If you are unsure whether you have been released, seek clarification before leaving."
      },
      {
        id: "s3-q3",
        text: "When called to give evidence, you will be asked to swear in by reading an oath or affirmation.",
        correctAnswer: true,
        explanation: "Correct. When called to give evidence, you will be asked to 'swear in' by reading an oath on a holy book, or a non-denominational statement of truth. After this, any failure to tell the truth would amount to perjury."
      }
    ]
  },
  {
    id: "giving-evidence",
    title: "4. Giving Evidence",
    description: "How to answer questions effectively and professionally in the witness box.",
    content: [
      {
        title: "Taking the Oath and First Impressions",
        body: [
          "Once you have taken the oath or affirmed, it is good practice to acknowledge the deceased's family if they are present. A brief, sincere acknowledgement shows empathy and demonstrates that you are genuine — this matters to the family and sets the tone for your evidence.",
          "Listen carefully to every question before you begin to answer. If you do not catch or fully understand a question, simply ask for it to be repeated. This is not a sign of weakness — it gives you time to think and ensures you answer accurately.",
          "Consider your answer carefully before speaking. Do not 'blurt out' the first thing that comes to mind, especially when a question seems easy. Pause, think, and if necessary refer to your statement or the clinical records before responding. You may also ask the advocate to repeat the question — this buys thinking time and is entirely acceptable."
        ],
        callout: {
          type: "info",
          text: "The hearing is not an exam or memory test. If you need to refer to your statement or clinical records to check a detail, do so. If you have forgotten something, say so and ask to refer to your earlier statement."
        }
      },
      {
        title: "Answering Questions Well",
        body: [
          "Answer only the question you are asked — nothing more, nothing less. Do not answer the question you think you were asked, the one you would like to have been asked, or the one you expect to be asked next.",
          "Beware of pauses. When you have finished answering, if there is a silence and the advocate does not ask another question, do not be tempted to fill it. Remaining silent after a witness answers is a deliberate technique used to pressure witnesses into volunteering additional information. When you have answered, stop speaking.",
          "Do not guess or make assumptions about what others did or might have done. Stick to what you know from your own direct experience and knowledge.",
          "Do not venture an opinion unless you are asked for one. If asked, you may give an opinion within your own area of expertise — but not beyond it. If a question falls outside the scope of your expertise, say so clearly and decline to answer.",
          "Do not comment on the provision of a service generally, or criticise colleagues. If family members ask questions in a confrontational manner, remain calm, polite, and answer as fully and simply as possible. Do not become defensive."
        ],
        callout: {
          type: "warning",
          text: "If you are being asked questions that appear to directly or indirectly attribute blame or fault to a person or system, raise this with the coroner. Questions at inquest must be directed at establishing how the death occurred — not at apportioning liability."
        }
      },
      {
        title: "Top Tips for Giving Evidence",
        body: [
          "1. Prepare adequately — re-read your statement, the clinical records, and any relevant protocols or policies beforehand.",
          "2. Decide in advance whether you wish to swear an oath on a holy book or make a non-religious affirmation.",
          "3. Address the coroner as 'Sir' or 'Ma'am' and direct all your answers to the coroner (and jury, if there is one).",
          "4. If you do not understand a question, say so. You are entitled to ask for clarification.",
          "5. Acknowledge the family — the inquest is deeply stressful and upsetting for them. A sincere acknowledgement goes a long way.",
          "6. If you have observations after hearing other witnesses give evidence, pass these to your legal representative rather than raising them yourself.",
          "7. Remember the purpose of the inquest: to determine who died, where, when, and how. Keep that purpose in mind throughout your evidence.",
          "8. Think of it as your opportunity to explain to the family what you know about what happened, so they can better understand the circumstances in which their relative died."
        ]
      }
    ],
    quiz: [
      {
        id: "s5-q1",
        text: "When asked a question in the witness box, you should answer immediately to avoid appearing hesitant.",
        correctAnswer: false,
        explanation: "Incorrect. Always pause and consider your answer carefully. Do not 'blurt out' the first thing that comes to mind, even if the question seems simple. You may also refer to your statement or clinical records before responding."
      },
      {
        id: "s5-q2",
        text: "If an advocate pauses silently after you finish answering, you should volunteer additional information to fill the silence.",
        correctAnswer: false,
        explanation: "Correct. Do not fill a silence. When advocates pause after you answer, they are hoping you will add more. Once you have answered the question fully, stop and wait. Do not offer anything further unprompted."
      },
      {
        id: "s5-q3",
        text: "If a question falls outside your area of expertise, it is appropriate to say so and decline to answer.",
        correctAnswer: true,
        explanation: "Correct. You are only expected to answer within your area of expertise and experience. If a question falls outside that, clearly say so and decline to speculate. This is both appropriate and expected."
      }
    ]
  },
  {
    id: "post-inquest",
    title: "5. Post Inquest",
    description: "Conclusions, Regulation 28 reports, and handling criticism.",
    content: [
      {
        title: "The Conclusion",
        body: [
          "When all evidence is heard, the coroner will sum up and deliver a conclusion.",
          "Short form conclusions include: accident/misadventure, natural causes, suicide, lawful/unlawful killing, etc.",
          "Alternatively, they may make a 'narrative' conclusion setting out the facts surrounding the death in more detail."
        ]
      },
      {
        title: "Regulation 28 (Prevention of Future Deaths)",
        body: [
          "If evidence suggests further avoidable deaths could occur, the coroner has a duty to make a Prevention of Future Deaths report.",
          "This report is sent to the person or authority that can take preventative steps, and they have a duty to respond within 56 days detailing the action taken or explaining why no action is needed."
        ]
      },
      {
        title: "Criticism and Next Steps",
        body: [
          "While an inquest does not determine criminal or civil liability directly, civil proceedings for damages may follow once facts are established.",
          "If a doctor is criticized by the coroner, they are required by the GMC to inform them without delay. This may result in an investigation.",
          "Always seek support from your MDO and colleagues. An inquest is stressful, and psychological support should be utilized if you feel overwhelmed."
        ],
        callout: {
          type: "warning",
          text: "Never ignore criticism from a coroner. Inform your MDO immediately to plan targeted CPD and evidence of remediation."
        }
      }
    ],
    quiz: [
      {
        id: "s4-q1",
        text: "When the coroner has heard all evidence, they will deliver a conclusion - this can be short form or a narrative conclusion.",
        correctAnswer: true,
        explanation: "Correct. When the coroner has heard all the evidence, they will 'sum up' and deliver the conclusion. This can be in 'short form' (e.g., suicide, natural causes) or a narrative verdict."
      },
      {
        id: "s4-q2",
        text: "A Prevention of Future Death report requires a response within 56 days.",
        correctAnswer: true,
        explanation: "Correct. The recipient of a Regulation 28 Prevention of Future Death report has a duty to provide a response within 56 days of the date the report is sent."
      },
      {
        id: "s4-q3",
        text: "If criticised by the coroner, you should ignore this as it has no consequences.",
        correctAnswer: false,
        explanation: "Correct. Criticism by a coroner cannot be ignored. You must inform the GMC without delay (as required by Good Medical Practice, paragraph 75) and contact your MDO for guidance."
      }
    ]
  }
];

export const checklistItems = [
  "Read through your report/statement thoroughly.",
  "Review the complete medical records.",
  "Be clear who has called you to attend and what your status is (Fact vs IP).",
  "Find out exactly where the court is and plan your travel time.",
  "Find out how long you will be needed for the hearing.",
  "Ensure the medical records will be available at the court.",
  "Make sure you have adequate clinical cover arrangements in place for your absence.",
  "Contact your MDO if you have any concerns or are designated an Interested Person.",
];
