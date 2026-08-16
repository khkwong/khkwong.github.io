import type { ContentBlock } from "./content";

/**
 * Work experience, organised by *what was built* rather than by employer.
 *
 * A card per company gives Aristotle one enormous entry and a two-month
 * internship an equal-sized one — the same flattening the projects page tiers
 * away. The employment list below carries the plain facts (where, what title,
 * how long); the items carry the substance.
 *
 * ---------------------------------------------------------------------------
 * EVERYTHING HERE IS PUBLIC. Read this before adding an entry.
 *
 * All of this work is internal and unlinkable, so the only thing stopping a
 * detail from being published is this comment. Deliberately kept out:
 *
 *   - names of internal databases, tables, schemas or applications
 *   - secrets handling (vaults, injection, credential flow) and auth topology
 *   - deployment topology — cluster layout, container structure, hosts
 *   - document/record volumes and other counts that size the firm's data
 *   - named third-party data vendors and the firm's relationships with them
 *   - anything attributing a failure or shortcoming to a named internal team
 *
 * What's left is still the interesting part: the problem, who used it, what
 * was owned personally, and the decisions worth defending. Write at that
 * altitude and these pages stay safe to publish under a real name.
 * ---------------------------------------------------------------------------
 */

export type WorkTier = "featured" | "archive";

export type Employment = {
  company: string;
  url: string;
  location: string;
  /** Newest first. Two stints at one employer nest here rather than becoming
      two separate rows, which would read as two unrelated jobs. */
  roles: { title: string; dates: string }[];
};

export type WorkItem = {
  slug: string;
  title: string;
  /** Must match an `Employment.company` — the detail page looks up the link. */
  company: string;
  dates: string;
  tier: WorkTier;
  summary: string;
  /** Chips on the card. Keep to ~4; this is a glance, not the full stack. */
  tech: string[];
  body: ContentBlock[];
};

export const employment: Employment[] = [
  {
    company: "Aristotle Capital Management",
    url: "https://www.aristotlecap.com",
    location: "Los Angeles, CA",
    roles: [{ title: "Systems Engineer", dates: "July 2024 — Present" }],
  },
  {
    company: "Great Lakes Consulting",
    url: "https://glcs.io",
    location: "Remote",
    roles: [
      { title: "Software Data Engineer", dates: "June — July 2024" },
      { title: "Data Science Intern", dates: "July — September 2023" },
    ],
  },
  {
    company: "Cosmos Technology",
    url: "https://www.cosmos.tech",
    location: "Remote",
    roles: [{ title: "Data Engineering Intern", dates: "June — July 2022" }],
  },
  {
    company: "PairAnything",
    url: "https://www.pairanything.com",
    location: "Remote",
    roles: [{ title: "Software Engineering Intern", dates: "February — June 2022" }],
  },
  {
    company: "Pareto Care",
    url: "",
    location: "Remote",
    roles: [{ title: "Data Engineering Intern", dates: "February — July 2022" }],
  },
];

export const workItems: WorkItem[] = [
  {
    slug: "data-extraction-platform",
    title: "Data Extraction & Validation Platform",
    company: "Aristotle Capital Management",
    dates: "2024 — 2025",
    tier: "featured",
    summary:
      "A three-part internal platform for investment data quality — self-service querying, portfolio analytics, and exception review — designed, built and deployed to production solo.",
    tech: ["Django", "React", "TypeScript", "Snowflake"],
    body: [
      { type: "h2", text: "The problem" },
      {
        type: "p",
        text: "Investment analysts needed answers out of the firm's data warehouse, and getting them meant either writing SQL or asking someone who could. That put a queue in front of routine questions and made data-quality problems easy to miss until they had already been acted on. The platform's job was to close both gaps: let analysts get at the data themselves, and surface quality exceptions before they mattered.",
      },
      { type: "h2", text: "What it does" },
      {
        type: "ul",
        items: [
          "Self-service query builder — analysts pick a dataset, choose columns, stack filters, preview results and export, without writing a line of SQL. Queries can be saved and reloaded, and an LLM-backed summariser turns a result set into a plain-language readout.",
          "Portfolio analytics dashboard — seven views over performance data, covering sector and region attribution, portfolio characteristics, risk statistics, rolling returns and written commentary.",
          "Exception review workflow — daily data-quality exceptions land in an interactive grid where analysts triage them, set statuses and leave comments, with the whole review history retained for audit.",
        ],
      },
      { type: "h2", text: "What I owned" },
      {
        type: "p",
        text: "All of it. This was a solo build from first commit through production deployment — schema, API, frontend, packaging and release. Working alone on something this size meant the architectural decisions were mine to get right and mine to live with, which is a different kind of pressure from shipping a slice of someone else's design.",
      },
      {
        type: "p",
        text: "Two decisions I'd defend. The first: the column and filter UI is driven by warehouse metadata rather than hand-maintained configuration, so when a dataset gains a field the interface picks it up on its own instead of waiting on a code change — the alternative was a permanent maintenance tax that grows with every dataset onboarded. The second: the analytics dashboard originally made four sequential warehouse round-trips to populate its dependent dropdowns, which is slow in a way users feel on every interaction. Fetching all the filter combinations in one query and deriving the dependent options in memory collapsed that to a single trip.",
      },
      {
        type: "p",
        text: "I also added a validation banner that flags portfolios with incomplete data before an analyst acts on them. It's a small feature that exists because the failure it prevents — making a call on data that quietly isn't all there — is the expensive one.",
      },
      { type: "h2", text: "Stack" },
      {
        type: "ul",
        items: [
          "Backend: Django, Django REST Framework, Snowflake",
          "Frontend: React with TypeScript, Vite, AG Grid Enterprise, Material UI, React Query",
          "AI: a hosted Claude model, reached through an MCP server over the warehouse",
        ],
      },
    ],
  },
  {
    slug: "aristotle-intelligence",
    title: "Aristotle Intelligence",
    company: "Aristotle Capital Management",
    dates: "2025 — Present",
    tier: "featured",
    summary:
      "The firm's front door for AI: one place to reach several commercial models, share prompts and agents, and assemble no-code automation workflows. Built with a three-person team.",
    tech: ["React", "FastAPI", "PostgreSQL", "Alembic"],
    body: [
      { type: "h2", text: "The problem" },
      {
        type: "p",
        text: "AI adoption inside a firm tends to sprawl — individual subscriptions, no shared prompts, and no way for anyone to see what's being used or what it costs. Aristotle Intelligence exists to be the single door everyone walks through instead: one application, several models behind it, and the usage visible to the people accountable for it.",
      },
      { type: "h2", text: "What it does" },
      {
        type: "ul",
        items: [
          "Gives employees access to multiple commercial models from one interface, without each team wiring up its own integration.",
          "Lets users publish prompts, agents and workflows for colleagues to run in a single click, including through a shared marketplace.",
          "Shows administrators what's being used and what it costs, and lets them set model access and token limits per user.",
          "Provides a workspace for building AI-backed workflows for input-to-output tasks that don't suit a chat interface — assembled by hand or by talking to a workflow-building agent, from input, model, tool, agent and output steps, with every run inspectable afterwards.",
        ],
      },
      { type: "h2", text: "What I owned" },
      {
        type: "p",
        text: "I built the persistent datastore behind usage tracking and cost attribution — the source the admin dashboard reads from — and its migration path.",
      },
      {
        type: "p",
        text: "In the workflow builder I separated tool steps from agent steps, which had started life as one concept. Splitting them mattered because a tool is something the platform runs and an agent is something it delegates to; collapsing the two meant every third-party agent integration had to be special-cased. With the distinction made explicit, new agents plug into the same seam. I then built one myself — a document-generation agent for a recurring reporting task — and integrated it through that seam, which was the useful test of whether the abstraction actually held.",
      },
      {
        type: "p",
        text: "I also widened workflow outputs to include PDF and Word documents, and set up load testing so the platform's behaviour under real concurrency was a measurement rather than a guess.",
      },
      { type: "h2", text: "Stack" },
      { type: "ul", items: ["React, Python/FastAPI, PostgreSQL with Alembic, Locust"] },
    ],
  },
  {
    slug: "metadata-extraction-agent",
    title: "Document Metadata Extraction Agent",
    company: "Aristotle Capital Management",
    dates: "2024 — 2025",
    tier: "featured",
    summary:
      "An internal agent that reads onboarding documents and contracts and pulls structured metadata out of them, pairing an LLM's tool use with OCR for scans that have no text layer.",
    tech: ["Python", "Claude", "OCR", "React"],
    body: [
      { type: "h2", text: "The problem" },
      {
        type: "p",
        text: "A large archive of onboarding documents and contracts held information nobody could query, because it lived in prose and in scans rather than in fields. Reading them by hand is the kind of task that never quite gets finished — it's always worth doing and never worth doing now.",
      },
      { type: "h2", text: "What it does" },
      {
        type: "p",
        text: "The agent works through the archive document by document, using an LLM's tool-calling to pull out the fields that matter and write them to a structured table. Scanned documents without a text layer go through OCR first, so the pipeline doesn't simply skip the older material — which, predictably, is the material most likely to be undocumented elsewhere. A web front end presents the extracted metadata as an ordinary sortable grid, because the point was never the agent; it was that someone can finally look this up.",
      },
      { type: "h2", text: "What I owned" },
      {
        type: "p",
        text: "The whole pipeline — extraction logic, the OCR path, the storage schema and the front end over it.",
      },
      { type: "h2", text: "Stack" },
      { type: "ul", items: ["Python, Claude with tool use, Tesseract OCR, Snowflake, React"] },
    ],
  },
  {
    slug: "internal-llm-assistant",
    title: "Internal LLM Assistant",
    company: "Aristotle Capital Management",
    dates: "2024 — 2025",
    tier: "featured",
    summary:
      "A company-specific assistant built on an open-weight baseline model with a retrieval-augmented generation architecture, developed across the full stack.",
    tech: ["Django", "Celery", "React", "AWS"],
    body: [
      { type: "h2", text: "The problem" },
      {
        type: "p",
        text: "A general-purpose model knows nothing about a specific firm's documents, and fine-tuning one on them is expensive to do and expensive to keep current. Retrieval-augmented generation is the cheaper trade: leave the model alone and give it the right context at question time.",
      },
      { type: "h2", text: "What I owned" },
      {
        type: "p",
        text: "Full-stack work across the application — the API and retrieval layer, the asynchronous task pipeline that handles document processing and embedding without blocking a request, the React front end, and the containerisation and deployment automation.",
      },
      { type: "h2", text: "Stack" },
      {
        type: "ul",
        items: [
          "Backend: Django, Celery with Redis as the broker",
          "Frontend: React",
          "AI and storage: AWS Bedrock for inference, S3 for documents, OpenSearch as the vector store",
          "Delivery: Docker, GitHub Actions",
        ],
      },
    ],
  },
  {
    slug: "star-cutpoint-modeling",
    title: "Star Rating Cutpoint Prediction",
    company: "Great Lakes Consulting",
    dates: "2023 — 2024",
    tier: "featured",
    summary:
      "A probabilistic model helping health insurers anticipate future CMS Star rating cutpoints from public historical measure data — built as an intern, then returned to a year later to improve it.",
    tech: ["Julia", "Python", "Statistical modeling"],
    body: [
      { type: "h2", text: "The problem" },
      {
        type: "p",
        text: "CMS sets Star rating cutpoints after the fact, but health insurers have to make decisions all year as though they already know where the lines will fall. Landing just under a threshold is materially different from landing just over it, so a well-calibrated guess is worth a great deal — and the only evidence available is the historical record of past cutpoints, which CMS publishes.",
      },
      { type: "h2", text: "What I did" },
      {
        type: "p",
        text: "I built the initial probabilistic model over that public history during my internship, and wrote Julia benchmarking scripts for one of the firm's existing budgeting applications.",
      },
      {
        type: "p",
        text: "Returning the following year, I improved the model's accuracy in two ways: Tukey outlier detection, so an anomalous year stopped dragging the estimate around, and exponential weighting, so recent measurements count for more than distant ones — both corrections for the fact that treating a decade of history as equally informative is a convenient assumption rather than a true one.",
      },
      {
        type: "p",
        text: "I also rewrote the documentation so colleagues could run the statistical and regression models without me. That's the least glamorous item here and plausibly the most valuable: a model only one person can operate isn't finished, and I was leaving.",
      },
    ],
  },

  /* Archive — real work, but a line each. See the tier comment at the bottom. */
  {
    slug: "enterprise-data-warehouse-ui",
    title: "Enterprise Data Warehouse Interface",
    company: "Aristotle Capital Management",
    dates: "2025 — Present",
    tier: "archive",
    summary:
      "Full-stack internal application giving the data management team one place to see the ingestion pipelines consolidating datasets from external sources.",
    tech: [],
    body: [],
  },
  {
    slug: "mcp-server-prototypes",
    title: "MCP Server Prototypes",
    company: "Aristotle Capital Management",
    dates: "2025",
    tier: "archive",
    summary:
      "Proof-of-concept Model Context Protocol servers and clients, connecting several internal AI applications to shared tooling ahead of a wider agent ecosystem.",
    tech: [],
    body: [],
  },
  {
    slug: "metaverse-transaction-pipeline",
    title: "Metaverse Transaction Pipeline",
    company: "Cosmos Technology",
    dates: "2022",
    tier: "archive",
    summary:
      "Daily pipeline consolidating NFT collection data from the OpenSea API and directly from chain into a single database, on AWS Lambda, S3 and Glue.",
    tech: [],
    body: [],
  },
  {
    slug: "pairing-recommendations",
    title: "Pairing Recommendations UI & Feature API",
    company: "PairAnything",
    dates: "2022",
    tier: "archive",
    summary:
      "Rebuilt the pairing recommendations screen in React and Angular, and built the backend API behind a new feature with Sequelize and NodeJS.",
    tech: [],
    body: [],
  },
  {
    slug: "healthcare-labeling-tool",
    title: "Healthcare ML Data Labeling Tool",
    company: "Pareto Care",
    dates: "2022",
    tier: "archive",
    summary:
      "Streamlit and AWS Lambda labeling tool for the data collection phase of a team effort to predict diuretic dosage from patient attributes.",
    tech: [],
    body: [],
  },
];

/**
 * Featured items only. Archive entries have no body, so resolving one here
 * would render an empty detail page for anyone who guessed the URL — a 404 is
 * the more truthful answer.
 */
export function getWorkItemBySlug(slug: string): WorkItem | undefined {
  return workItems.find((w) => w.slug === slug && w.tier === "featured");
}

export function getEmployment(company: string): Employment | undefined {
  return employment.find((e) => e.company === company);
}

/**
 * Everything built at one employer, featured first — the full list behind each
 * timeline row's disclosure. This is what replaced a separate "Also Shipped"
 * section: the archive entries belong *to* the job they came from, so the
 * timeline becomes the complete record and the grid stays a highlight reel.
 */
export function workItemsFor(company: string): WorkItem[] {
  return workItems.filter((w) => w.company === company);
}

/*
 * Fixed shelves, same mechanic and same reasoning as data/projects.ts: a new
 * entry displaces one rather than joining it, and going over the limit warns
 * rather than silently truncating.
 *
 * The featured shelf skews heavily toward one employer. That's not an
 * oversight — it's where the substance is, and pretending otherwise by
 * promoting a two-month internship to equal billing would make the page less
 * honest, not more balanced.
 */
export const WORK_FEATURED_LIMIT = 6;
export const WORK_ARCHIVE_LIMIT = 6;

export const featuredWork = workItems.filter((w) => w.tier === "featured");
export const archivedWork = workItems.filter((w) => w.tier === "archive");

if (import.meta.env.DEV) {
  if (featuredWork.length > WORK_FEATURED_LIMIT) {
    console.warn(
      `${featuredWork.length} featured work items exceeds the shelf of ${WORK_FEATURED_LIMIT}. ` +
        `Move the weakest one to tier: "archive".`,
    );
  }
  if (archivedWork.length > WORK_ARCHIVE_LIMIT) {
    console.warn(
      `${archivedWork.length} archived work items exceeds the shelf of ${WORK_ARCHIVE_LIMIT}. ` +
        `Drop the oldest, or build a full work history view.`,
    );
  }
  const orphans = workItems.filter((w) => !getEmployment(w.company));
  if (orphans.length > 0) {
    console.warn(
      `Work items reference companies with no employment entry: ` +
        orphans.map((w) => `${w.slug} -> "${w.company}"`).join(", "),
    );
  }
}
