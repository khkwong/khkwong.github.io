export type ProjectBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export type ProjectLink = { label: string; url: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  image: string;
  summary: string;
  body: ProjectBlock[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "capstone",
    title: "Emulating the Effects of Climate Change with Deep Learning",
    category: "Data Science",
    image: "/img/climate.png",
    summary:
      "UCSD senior capstone extending Professor Duncan Watson-Parris's ClimateBench framework with improved climate emulation models.",
    body: [
      {
        type: "p",
        text: "For my senior capstone project at UCSD, I, along with two other students, aimed to extend the work of our professor (Duncan Watson-Parris) and his paper ClimateBench in the area of climate emulation. He had created ClimateBench, a benchmarking framework that leverages data from a set of Coupled Model Intercomparison Projects (CMIPS), AerChemMip and Detection-Attrition Model Intercomparison Projects, which are collections of physically-based simulations performed from existing Earth System Models (ESM), which could then be used to compare the performances of more lightweight climate emulators built from machine learning algorithms.",
      },
      {
        type: "p",
        text: "Our extension looked to improve the baseline machine learning algorithms that Professor Duncan had used in the creation of ClimateBench (Gaussian Process, Convolutional Neural Network, Random Forest) in order to potentially discover machine learning solutions that were more accurate to the results of the existing ESMs.",
      },
      { type: "h2", text: "Improved Models" },
      { type: "h3", text: "Gaussian Process DKL" },
      {
        type: "p",
        text: "To improve the Gaussian Process model, a hybrid model that combines the Gaussian Process model with a Neural Network resulted in the Deep Kernel Learning model. This model works by using the descriptive capabilities of the Neural Network to learn a feature representation of the data which then gets translated into a kernel function that the Gaussian Process can use to make predictions.",
      },
      { type: "h3", text: "Physically Informed Neural Network (PINN)" },
      {
        type: "p",
        text: "The improvement made to the original CNN was to add the idea of physical constraints to the learning process of the model. This physically informed neural network uses a CNN architecture and works by incorporating physical equations into the loss function, taken from FaIRv2.0.0. This was the main model I worked on.",
      },
      { type: "h3", text: "XGBoost" },
      {
        type: "p",
        text: "Finally in place of the Random Forest we implemented a Gradient Boosting model called XGBoost, a more advanced form of the Random Forest model. XGBoost creates a series of decision trees much like the Random Forest, but further incorporates gradient boosting in order to learn from the mistakes of previous trees.",
      },
    ],
    links: [
      { label: "Report (PDF)", url: "/Capstone/report.pdf" },
      { label: "Poster (PDF)", url: "/Capstone/poster.pdf" },
      { label: "Website", url: "https://jackljk.github.io/DSC180B-website/" },
      { label: "Code", url: "https://github.com/jackljk/ClimateBench-Plus" },
    ],
  },
  {
    slug: "iot",
    title: "Debugging Internal States of IoT Devices",
    category: "Data Science",
    image: "/img/iot.png",
    summary:
      "UCSD research project classifying the internal states of IoT devices from external sensor signals (RF, network, power).",
    body: [
      {
        type: "p",
        text: "In my junior year at UCSD, I took part in a new Internet of Things class being offered in the Data Science curriculum. During the class, I worked with two other classmates alongside assistant professor Haojian Jin in creating a data pipeline that gathered fine-grained signal data emanating from a Philips Hue Smart Bulb before training a CNN to classify what the bulb was doing based on that gathered data. I would then go on to further this work by expanding to other IoT devices, including the Amazon Echo Dot and Google Home.",
      },
      { type: "h2", text: "Data Gathered and Technology Used" },
      {
        type: "ul",
        items: [
          "HackRF — Software Defined Radio device that allowed us to gather data on the nearby EM field activity, programmed using GNURadio.",
          "Ethernet sniffer — attached to devices to gather data on network usage.",
          "Oscilloscope — used to gather power consumption.",
        ],
      },
    ],
    links: [],
  },
  {
    slug: "har",
    title: "Smartphone Human Activity Recognition",
    category: "Data Science",
    image: "/img/har.png",
    summary:
      "Trained and compared machine learning models to classify human physical activity from smartphone accelerometer and gyroscope data.",
    body: [
      {
        type: "p",
        text: "As a member of the projects committee of the Data Science Student Society at UCSD, I took part in a project that involved analyzing a dataset from UCI that included sensory data from the built-in accelerometer and gyroscope in a person's smartphone as they went through various physical activities such as sitting down, standing up, and laying down. We would then go on to train and test multiple machine learning algorithms to determine which predicted the human movement best given the physical data.",
      },
    ],
    links: [
      {
        label: "Dataset",
        url: "https://archive.ics.uci.edu/dataset/240/human+activity+recognition+using+smartphones",
      },
      { label: "Github", url: "https://github.com/amhurtad/DS3-Human-Phone-Activity" },
    ],
  },
  {
    slug: "schedulebot",
    title: "ScheduleBot.jl",
    category: "Coding",
    image: "/img/schedulebot.png",
    summary:
      "A Discord bot built for JuliaCon 2022 to remind participants when talks were starting based on a dynamic schedule.",
    body: [
      {
        type: "p",
        text: "A Discord bot created for JuliaCon 2022 to remind participants when certain talks were starting based on a dynamic, changing schedule. Built upon the Discord.jl API.",
      },
    ],
    links: [{ label: "Github", url: "https://github.com/khkwong/ScheduleBot?tab=readme-ov-file" }],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
