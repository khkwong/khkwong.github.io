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
      "Developing internal large language model tool using Meta's Llama-3 LLM as a baseline and RAG (retrieval augmented generation) architecture to improve it for company specific usage.",
      "Programming across the full stack of the application, using Django, Celery, AWS Bedrock/S3, and React.",
    ],
  },
  {
    company: "Great Lakes Consulting",
    url: "https://glcs.io",
    role: "Data Scientist",
    dates: "June 2024 - July 2024",
    location: "Remote Worker",
    bullets: [
      "Made improvements to previously built statistical model to more accurately provide predictions for Star cutpoints.",
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
];

export const education: Education[] = [
  {
    school: "University of California San Diego",
    url: "https://ucsd.edu",
    degree: "Bachelors of Science in Data Science | GPA - 3.873",
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
      "Senior Capstone",
    ],
  },
];

export const languages: string[] = ["English"];

export const skills: string[] = [
  "Python",
  "Java",
  "Javascript",
  "HTML",
  "CSS",
  "Julia",
  "MATLAB",
  "SQL",
  "Tensorflow",
  "AWS",
  "Git",
  "Pandas",
  "sklearn",
  "Tableau",
];
