export type Job = {
  company: string;
  url: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
};

export type Education = {
  school: string;
  url: string;
  degree: string;
  dates: string;
  location: string;
  coursework: string[];
};

export const contact = {
  bio: "Keith Kwong graduated from UCSD with a Bachelors of Science in Data Science. With a passion for continuous learning and an analytical mindset, he believes there is no problem that can't be solved with data crunching and a little elbow grease.",
  email: "khk32887134@gmail.com",
  phone: "(+1) 626-362-1700",
  linkedin: "https://www.linkedin.com/in/keith-kwong/",
  github: "https://github.com/khkwong",
  resumePdf: "/Resume.pdf",
  headshot: "/img/headshot.png",
};

export const experience: Job[] = [
  {
    company: "Aristotle Capital Management",
    url: "https://www.aristotlecap.com",
    role: "Systems Engineer",
    dates: "July 2024 - Present",
    location: "Los Angeles, CA",
    bullets: [
      "Building Aristotle Intelligence, an internal AI platform giving employees unified access to models like ChatGPT, Claude, and Copilot, with shareable prompts/agents and a no-code workflow builder — developed as part of a three-person team.",
      "Built and deployed solo a full-stack data extraction and validation platform for investment data quality, including a self-service data query tool, a portfolio analytics dashboard, and an AI-assisted natural-language query summarizer.",
      "Developing an internal enterprise data warehouse interface for the data management team to monitor data ingestion pipelines from third-party sources.",
      "Built an internal AI agent that automated metadata extraction from onboarding documents and contracts across tens of thousands of files, pairing an LLM's tool-use with OCR for scanned documents.",
      "Developing an internal LLM tool using Meta's Llama-3 as a baseline with a RAG (retrieval-augmented generation) architecture tuned for company-specific usage, full-stack across Django, Celery, and React.",
      "Prototyped Model Context Protocol (MCP) servers to connect multiple internal AI agents into a shared ecosystem.",
    ],
  },
  {
    company: "Great Lakes Consulting",
    url: "https://glcs.io",
    role: "Data Scientist",
    dates: "June 2024 - July 2024",
    location: "Remote Worker",
    bullets: [
      "Improved a previously built statistical model for predicting Star cutpoints by incorporating Tukey outlier detection and exponential weighting.",
      "Improved documentation so others could run the existing statistical and regression-based models independently.",
    ],
  },
  {
    company: "Great Lakes Consulting",
    url: "https://glcs.io",
    role: "Data Science Intern",
    dates: "June 2023 - September 2023",
    location: "Remote Worker",
    bullets: [
      "Built a probabilistic model to help health insurance companies in predicting future Star cut points set by the CMS using publicly available data on past measurements given by the CMS.",
      "Developed Julia scripts to benchmark for one of their existing budgeting applications.",
    ],
  },
  {
    company: "Cosmos Technology",
    url: "https://www.cosmos.tech",
    role: "Data Engineer Intern",
    dates: "June 2022 - August 2022",
    location: "Remote Worker",
    bullets: [
      "Consolidated data about different Metaverse transactions into one database.",
      "Built a data pipeline that pulled in collection data from the OpenSea API daily using an AWS Lambda function, storing it in an S3 bucket and uploading the data to a MySQL database using AWS Glue.",
      "Pulled data directly from blockchain using Python's web3 library and Infura as the host node.",
    ],
  },
  {
    company: "PairAnything",
    url: "https://www.pairanything.com",
    role: "Software Engineering Intern",
    dates: "February 2022 - June 2022",
    location: "Remote Worker",
    bullets: [
      "Frontend work for the web application using React and Angular, revamped the pairing recommendations screen.",
      "Backend work that involves the creation of a new API for a new feature using Sequelize ORM and NodeJS.",
    ],
  },
  {
    company: "Pareto Care",
    url: "",
    role: "Data Engineering Intern",
    dates: "February 2022 - July 2022",
    location: "Remote Worker",
    bullets: [
      "Worked as part of a team of data science students to help Pareto Care apply machine learning to preventative healthcare technology, working toward predicting diuretic dosage from patient attributes.",
      "Built a data-labeling tool for the initial data collection phase using Python Streamlit and AWS Lambda functions.",
    ],
  },
];

export const education: Education[] = [
  {
    school: "University of California San Diego",
    url: "https://ucsd.edu",
    degree: "Bachelors of Science in Data Science | GPA - 3.857 (Provost Honors)",
    dates: "September 2020 - March 2024",
    location: "La Jolla, California",
    coursework: [
      "Hidden Data in Random Matrices",
      "Image Processing",
      "Machine Learning",
      "Deep Learning",
      "Robot Perception/Navigation",
      "Systems for Scalable Analytics",
      "IoT and Sensors",
      "Data Visualization",
      "Probabilistic Modeling",
      "Data Science in Practice",
      "Recommender Systems/Web Mining",
      "Signal Processing",
      "Data Structures/Algorithms",
      "Object-Oriented Programming",
      "Senior Capstone",
    ],
  },
  {
    school: "Glen A. Wilson High School",
    url: "",
    degree: "GPA - 4.82",
    dates: "2016 - 2020",
    location: "Hacienda Heights, California",
    coursework: [],
  },
];

export const languages: string[] = ["English"];

export const skills: string[] = [
  "Python",
  "SQL",
  "Java",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "MATLAB",
  "R",
  "Julia",
  "Lua",
  "NodeJS",
  "React",
  "React Query",
  "AG Grid",
  "Material UI",
  "Django",
  "django-snowflake",
  "Snowflake",
  "DBeaver",
  "Alembic",
  "Docker",
  "Kubernetes",
  "AWS",
  "Git",
  "GitHub Actions",
  "Jira",
  "Figma",
  "GNURadio",
  "Jupyter Notebooks",
  "Anaconda",
  "Pandas",
  "scikit-learn",
  "TensorFlow",
  "Tableau",
  "Claude Code",
  "Codex",
  "UE4SS",
];
