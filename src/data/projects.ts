/**
 * PROJECT CONTENT + MEDIA
 *
 * HOW TO ADD YOUR OWN IMAGE OR VIDEO (very easy):
 * 1. Drop your file into the `public/media/` folder
 *    (e.g. public/media/project-01.jpg or public/media/project-01.mp4)
 * 2. Set `media` on the project below:
 *      media: { type: "image", src: "/media/project-01.jpg" }
 *      media: { type: "video", src: "/media/project-01.mp4", poster: "/media/project-01.jpg" }
 * 3. Leave `media` undefined to keep the upload placeholder visible.
 *
 * Case-study screenshots use the same shape in `caseStudy.gallery`.
 */

export type Media = {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt?: string;
  /** "cover" fills the frame (crops), "contain" shows the whole image. Default: cover */
  fit?: "cover" | "contain";
};

export type Project = {
  id: string;
  number: string;
  /** Short label shown above the title in the Featured Projects carousel */
  category: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  impact: string[];
  media?: Media;
  caseStudy: {
    problem: string;
    solution: string;
    workflow: string[];
    aiComponents: string[];
    tools: string[];
    result: string;
    gallery: Media[];
  };
};

export const projects: Project[] = [
  {
    id: "smart-support-ai",
    category: "Support Automation",
    number: "01",
    title: "Smart Support AI",
    tagline: "Your 24/7 AI front desk on WhatsApp",
    description: "Never miss a customer again. This AI assistant replies on WhatsApp in seconds, saves every customer's details to Google Sheets and pings your team on Telegram the moment a hot lead appears or a human is needed.",
    tags: ["AI Agent", "WhatsApp", "Google Gemini", "Google Sheets", "n8n"],
    impact: ["Instant Replies, Day & Night", "Every Lead Captured Automatically", "Real-Time Team Alerts"],
    media: {
      type: "image",
      src: "/media/project-01.webp",
      alt: "n8n WhatsApp AI assistant workflow",
      fit: "contain",
    },
    caseStudy: {
      problem: "Customers expect an answer in minutes, not hours. Replying to every WhatsApp inquiry by hand, collecting details and spotting the serious buyers eats up your day, and every slow reply is a sale walking away.",
      solution: "An AI assistant built on n8n and Google Gemini that understands each message, answers from your own business data, logs customer details in Google Sheets and alerts the team on Telegram whenever a lead is hot or a human touch is needed.",
      workflow: [
        "Message Arrives — A new WhatsApp message instantly wakes the workflow.",
        "Smart Validation — A quick check confirms it's a genuine inquiry.",
        "Data Prepared — Name, phone number and question are cleaned and structured.",
        "AI Thinks — The agent understands intent, pulls reference data and picks the best next step.",
        "Lead Saved & Team Alerted — Details land in Google Sheets and Telegram pings you for hot leads or hand-offs.",
        "Reply Delivered — A polished answer is sent back on WhatsApp within seconds."
      ],
      aiComponents: [
        "Conversational AI Agent",
        "Context Memory",
        "Intent Understanding",
        "Data Retrieval",
        "Lead Qualification Logic",
        "Human Hand-off Triggers",
      ],
      tools: ["n8n", "Google Gemini", "WhatsApp", "Google Sheets", "Telegram", "JavaScript"],
      result: "A customer assistant that never sleeps: inquiries answered instantly, leads captured automatically and your team pulled in only when it truly matters.",
      gallery: [
        {
          type: "image",
          src: "/media/project-01-diagram-1.webp",
          alt: "WhatsApp AI Automation workflow diagram",
          fit: "contain",
        },
        {
          type: "image",
          src: "/media/project-01-diagram-2.webp",
          alt: "WhatsApp AI Automation overview",
          fit: "contain",
        },
      ],
    },
  },
  {
    id: "ai-lead-qualification",
    category: "Lead Qualification",
    number: "02",
    title: "AI Lead Qualification Automation",
    tagline: "Turn every inquiry into a qualified opportunity",
    description: "An AI that talks to new leads the moment they arrive, asks the right questions, scores their intent and hands only the serious prospects to your sales team.",
    tags: ["Lead Qualification", "AI Agent", "n8n", "Google Sheets", "Automation"],
    impact: ["Leads Engaged in Seconds", "Hot Prospects Routed Instantly", "Zero Manual Screening"],
    media: {
      type: "image",
      src: "/media/project-02.webp",
      alt: "n8n Form Fill workflow: form submission, AI agents, Gmail and Telegram follow-ups",
      fit: "contain",
    },
    caseStudy: {
      problem: "Leads come in from everywhere, but chasing each one, asking qualifying questions and separating buyers from browsers burns hours. Meanwhile your hottest prospects sit waiting for a reply.",
      solution: "An AI-powered qualification engine that captures each lead, starts a smart conversation, analyses their answers and decides whether they're ready to buy, so your sales team spends time only on people who are.",
      workflow: [
        "Lead Enters — A new lead drops into the automated pipeline.",
        "Data Structured — Incoming details are collected and organised automatically.",
        "AI Starts the Conversation — The agent asks relevant qualifying questions.",
        "Intent Scored — Responses are analysed to measure interest and fit.",
        "Smart Routing — Qualified leads go straight to sales; the rest are nurtured or parked.",
        "Everything Recorded — Lead details and results are stored neatly for follow-up."
      ],
      aiComponents: [
        "AI Lead Qualification",
        "LLM-powered Conversations",
        "Lead Intent Analysis",
        "Automated Decision Making",
        "Context-Aware Responses",
        "Lead Scoring / Qualification Logic",
      ],
      tools: [
        "n8n",
        "LLM / AI API",
        "Lead Capture Forms",
        "Google Sheets",
        "Automation & Webhooks",
        "Messaging / Communication APIs",
      ],
      result: "A manual screening grind turned into a self-running qualification machine. New Lead → AI Conversation → Qualification → Qualified Lead → Sales Follow-up",
      gallery: [
        {
          type: "image",
          src: "/media/project-02-diagram-1.webp",
          alt: "Google Sheets with captured leads, services needed and budgets",
          fit: "contain",
        },
        {
          type: "image",
          src: "/media/project-02-diagram-2.webp",
          alt: "Automated follow-up email sent to a lead from n8n",
          fit: "contain",
        },
      ],
    },
  },
  {
    id: "ai-email-reply-agent",
    category: "Email Automation",
    number: "03",
    title: "AI Email Reply Agent",
    tagline: "Read less. Sort less. Reply faster.",
    description: "An AI agent that reads every incoming reply, understands what the sender really wants, sorts it into the right category and sends the perfect response, turning a chaotic inbox into a smart communication system.",
    tags: ["Email Automation", "Google Gemini", "Gmail", "n8n", "AI Agent"],
    impact: ["Intent Detected Instantly", "Every Email Routed Correctly", "Replies Sent on Autopilot"],
    media: {
      type: "image",
      src: "/media/project-03.webp",
      alt: "n8n customer support email agent workflow: Gmail trigger, AI agent, reply and logging",
      fit: "contain",
    },
    caseStudy: {
      problem: "Hundreds of replies, each needing to be read, understood, sorted and answered. It's slow, repetitive and one missed 'I'm interested' can cost a deal.",
      solution: "An Email Reply Agent powered by Google Gemini, n8n and Gmail that understands each message, classifies the sender's intent and fires back the right reply, with no inbox-juggling required.",
      workflow: [
        "Email Lands — Gmail detects a new reply and triggers the automation.",
        "AI Reads Between the Lines — Gemini analyses the message and the sender's true intent.",
        "Smart Classification — Interested, Not Interested, Out of Office, Unsubscribe, Referral, Objection or Review.",
        "Intelligent Routing — n8n sends each email down the correct response path.",
        "Reply Sent — The right Gmail response is written and delivered automatically."
      ],
      aiComponents: [
        "Intent Detection",
        "AI Email Classification",
        "Structured Output",
        "Context-Aware Processing",
        "Automated Response Logic",
        "Rule-Based Routing",
      ],
      tools: ["n8n", "Google Gemini", "Gmail", "Structured Output Parser", "Rule-Based Routing"],
      result: "An inbox that manages itself: every email understood, classified, routed and answered with minimal human effort. New Email → AI Understands → Classifies → Routes → Replies Automatically",
      gallery: [
        {
          type: "image",
          src: "/media/project-03-diagram-1.webp",
          alt: "Google Sheets knowledge base used by the AI agent to answer customer questions",
          fit: "contain",
        },
        {
          type: "image",
          src: "/media/project-03-diagram-2.webp",
          alt: "Automatic AI-written reply delivered in Gmail",
          fit: "contain",
        },
      ],
    },
  },
  {
    id: "ai-invoice-processing",
    category: "Document Intelligence",
    number: "04",
    title: "AI Invoice Processing Automation",
    tagline: "From inbox to spreadsheet, with zero data entry",
    description: "Invoices arrive in Gmail, and AI reads them, pulls out every key detail, updates Google Sheets and notifies your team on Telegram. No typing, no chasing, no mistakes.",
    tags: ["Invoice Automation", "Document AI", "Google Gemini", "Gmail", "n8n"],
    impact: ["Invoices Spotted Automatically", "AI-Powered Data Extraction", "Records Updated, Team Notified"],
    media: {
      type: "image",
      src: "/media/project-04.webp",
      alt: "n8n invoice processing workflow: Gmail trigger, PDF extraction, Gemini AI analysis, Sheets and Telegram",
      fit: "contain",
    },
    caseStudy: {
      problem: "Watching the inbox, downloading attachments, copying figures into spreadsheets and sharing updates is slow work, and every manual step is another chance for an error.",
      solution: "An end-to-end invoice pipeline that detects invoices in Gmail, processes the attachments, lets Google Gemini extract structured data, updates Google Sheets and alerts the team on Telegram.",
      workflow: [
        "Invoice Detected — Gmail spots a new invoice email the moment it arrives.",
        "Data Prepared — The invoice and its attachments are identified and queued.",
        "Attachments Processed — Files are separated and converted into readable documents.",
        "AI Analysis — Google Gemini extracts invoice details and key fields.",
        "Information Combined — PDF data and AI output are merged into one clean record.",
        "Records Updated — Everything is saved to Google Sheets automatically.",
        "Team Notified — Important details are pushed to Telegram for instant follow-up."
      ],
      aiComponents: [
        "AI Invoice Data Extraction",
        "PDF & Document Processing",
        "Structured Output Generation",
        "Intelligent Information Extraction",
        "Automated Data Validation",
        "AI-Powered Invoice Analysis",
      ],
      tools: ["n8n", "Google Gemini", "Gmail", "Google Sheets", "PDF Parser", "Telegram", "JavaScript"],
      result: "A multi-step manual chore replaced by a hands-free AI pipeline. Invoice Received → Data Extracted → AI Analyzed → Records Updated → Team Notified",
      gallery: [
        {
          type: "image",
          src: "/media/project-04-diagram-1.webp",
          alt: "Google Sheets invoice report with vendor, amount, date and approval status",
          fit: "contain",
        },
        {
          type: "image",
          src: "/media/project-04-diagram-2.webp",
          alt: "Telegram bot message with extracted invoice number, date, vendor and total for review",
          fit: "contain",
        },
      ],
    },
  },
  {
    id: "automated-lead-research",
    category: "Research & Enrichment",
    number: "05",
    title: "Automated Lead Research System",
    tagline: "Turn bare websites into outreach-ready contacts",
    description: "Give it a list of business websites and it does the digging: visiting each site, finding phone numbers, emails and social profiles, then writing them straight back into your Google Sheet.",
    tags: ["Lead Enrichment", "Website Parsing", "HTTP Request", "Google Sheets", "n8n"],
    impact: ["Contacts Found Automatically", "Sheets Enriched While You Sleep", "Outreach-Ready in Minutes"],
    media: {
      type: "image",
      src: "/media/project-05.webp",
      alt: "n8n lead research workflow with Google Sheets, HTTP Request and AI Agent",
      fit: "contain",
    },
    caseStudy: {
      problem: "A website is just the beginning. Hunting down phone numbers, emails and social profiles buried across different pages is repetitive, slow and kills your prospecting momentum.",
      solution: "An enrichment workflow that reads leads from Google Sheets, visits each business website, extracts every available contact detail and updates the lead record automatically.",
      workflow: [
        "Leads Loaded — New leads are collected in Google Sheets.",
        "Website Picked Up — The workflow grabs each lead's website URL.",
        "Contacts Extracted — It scans the site for phone numbers, emails and social links.",
        "Data Matched — Findings are structured and tied back to the original lead.",
        "Sheet Updated — Enriched details flow straight back into your spreadsheet."
      ],
      aiComponents: [
        "AI Data Processing",
        "Contact Information Extraction",
        "Structured Output",
        "Lead Data Matching",
      ],
      tools: ["Google Sheets", "n8n", "HTTP Request", "AI / Data Processing", "Website Parsing"],
      result: "Basic website leads transformed into enriched, outreach-ready records, with manual research slashed and prospecting made dramatically faster.",
      gallery: [
        {
          type: "image",
          src: "/media/project-05-diagram-1.webp",
          alt: "Automated Lead Research System overview infographic",
          fit: "contain",
        },
        {
          type: "image",
          src: "/media/project-05-diagram-2.webp",
          alt: "Enriched lead data in Google Sheets",
          fit: "contain",
        },
      ],
    },
  },
  {
    id: "doctor-appointment-management",
    category: "Healthcare Booking AI",
    number: "06",
    title: "Doctor Appointment Management System",
    tagline: "Automate bookings. Send reminders. Keep patients informed.",
    description: "From booking form to confirmation, rescheduling and cancellation, this system runs the entire appointment journey and keeps every patient in the loop on WhatsApp and email.",
    tags: ["Appointment Automation", "AI Agent", "WhatsApp", "Gmail", "n8n"],
    impact: ["Bookings Confirmed Automatically", "Changes & Cancellations Handled", "Patients Updated Instantly"],
    media: {
      type: "image",
      src: "/media/project-06.webp",
      alt: "n8n doctor appointment management workflow with AI agents, WhatsApp and Gmail",
      fit: "contain",
    },
    caseStudy: {
      problem: "Phone calls, double bookings, late confirmations and endless reminder messages. Manual appointment management costs clinics time, and costs patients their trust.",
      solution: "An automated appointment system that captures requests, keeps records in Google Sheets, manages booking status with AI agents and notifies patients on WhatsApp and email at every step.",
      workflow: [
        "Patient Books — An appointment form is submitted.",
        "Record Created — Details are stored automatically in Google Sheets.",
        "AI Decides — The AI reads the request and chooses the right action.",
        "Confirmation Sent — The patient receives an instant confirmation.",
        "Status Updated — Rescheduled or changed bookings are updated automatically.",
        "Cancellations Handled — Cancelled slots are processed and records stay accurate.",
        "Patients Notified — WhatsApp or email messages go out based on appointment status."
      ],
      aiComponents: [
        "AI-Powered Appointment Handling",
        "Action Decision Logic",
        "Conversational AI Agents",
        "Context Memory",
        "Status-Based Routing",
      ],
      tools: ["n8n", "AI Agent", "Google Sheets", "WhatsApp", "Gmail", "Groq"],
      result: "The full appointment journey, from booking to confirmation, updates and cancellation, now runs itself, cutting admin work and keeping patients informed.",
      gallery: [
        {
          type: "image",
          src: "/media/project-06-diagram-1.webp",
          alt: "Doctor Appointment Management System overview infographic",
          fit: "contain",
        },
        {
          type: "image",
          src: "/media/project-06-diagram-2.webp",
          alt: "Appointment records in Google Sheets",
          fit: "contain",
        },
      ],
    },
  },
];
