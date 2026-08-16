import type { ContentBlock } from "./content";

/** Body blocks are shared with work detail pages — see data/content.ts. */
export type ProjectBlock = ContentBlock;

export type ProjectLink = { label: string; url: string };

/** What the work is, on one axis. "Hackathon" was a venue, not a category. */
export type Category = "Data Science" | "Game Modding" | "Web & Tools";

/**
 * "featured" gets a card and a detail page. "archive" is a one-line entry that
 * links straight out — the page is a showcase first and a record second, and a
 * one-sentence project given a full card makes the real work harder to find.
 */
export type Tier = "featured" | "archive";

export type Project = {
  slug: string;
  title: string;
  category: Category;
  tier: Tier;
  image?: string;
  summary: string;
  body: ProjectBlock[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "remnant2-mods",
    title: "Remnant 2 Mods",
    category: "Game Modding",
    tier: "featured",
    image: "/img/remnant2.jpg",
    summary:
      "A suite of quality-of-life mods for Remnant 2, built by hooking into the game's own UE4SS/Lua systems instead of reimplementing them from scratch.",
    body: [
      {
        type: "p",
        text: "Remnant 2 Mods is a suite of quality-of-life mods for the game Remnant 2, built with UE4SS and Lua. The through-line across all four: hook into the game's existing systems and reuse its own logic wherever possible, rather than building parallel systems from scratch.",
      },
      { type: "h2", text: "EquipmentSearch" },
      {
        type: "p",
        text: "Adds a live search bar across nearly every item screen — amulets, rings, armor, weapons, relics, mutators, inventory — by hooking the game's existing Widget_InventorySearchFilter text-changed delegate rather than building a new UI element. The trickiest part wasn't the search itself: tracing showed the vanilla \"clear\" (X) button empties the textbox without firing the normal OnTextChanged event, an edge case the mod has to compensate for explicitly. The filter also re-applies itself after the game's own list-build functions run, so a vanilla inventory refresh doesn't silently wipe out the search results.",
      },
      { type: "h2", text: "LoadoutNamer" },
      {
        type: "p",
        text: "Lets you name each loadout slot so you stop mixing them up. It hooks mouse-enter/leave on loadout tiles and a configurable hotkey to spawn an editable textbox directly onto the tile's widget tree, persists names to a local file keyed per character ID (with a one-time migration for names saved before that keying existed), and reuses the game's own key-glyph widget to add an \"F2 Rename\" hint that matches vanilla UI conventions instead of a custom-styled label.",
      },
      { type: "h2", text: "MoreLoadoutSlots" },
      {
        type: "p",
        text: "Bumps the loadout slot count from a handful to 20 by hooking into the panel's spawn events and dynamically constructing additional tile widgets at runtime, instead of hand-editing a fixed layout. Each new tile is wired into the game's own click/save/delete delegates so the extra slots inherit vanilla save, load, and tooltip behavior for free — and a defensive fallback keeps multiplayer sessions from breaking if the usual player-controller lookup comes back empty.",
      },
      { type: "h2", text: "PrismLegendaryReroller" },
      {
        type: "p",
        text: "Lets you reroll the Prism's Legendary bonus without re-grinding the last level. It hooks the native flush function used when a legendary-bonus cleanse happens — identified by the Prism sitting at level 51 right before the flush, the only state a Mythic segment can exist in — then calls the game's own leveling functions to instantly restore it to 51 afterward. Getting there meant disambiguating two similarly-named native functions purely from their reflection signatures, then confirming the fix in a live playthrough rather than trusting log output alone.",
      },
    ],
    links: [
      { label: "Github", url: "https://github.com/khkwong/Remnant2Mods" },
      { label: "EquipmentSearch (Nexus Mods)", url: "https://www.nexusmods.com/remnant2/mods/222" },
      { label: "LoadoutNamer (Nexus Mods)", url: "https://www.nexusmods.com/remnant2/mods/221" },
      { label: "MoreLoadoutSlots (Nexus Mods)", url: "https://www.nexusmods.com/remnant2/mods/220" },
      { label: "PrismLegendaryReroller (Nexus Mods)", url: "https://www.nexusmods.com/remnant2/mods/224" },
    ],
  },
  {
    slug: "capstone",
    title: "Emulating the Effects of Climate Change with Deep Learning",
    category: "Data Science",
    tier: "featured",
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
    tier: "featured",
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
    tier: "featured",
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
    category: "Web & Tools",
    tier: "featured",
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
  {
    slug: "datahacks",
    title: "DataHacks",
    category: "Data Science",
    tier: "archive",
    summary: "Exploratory data analysis on text from multiple religious texts for a hackathon dataset challenge.",
    body: [
      {
        type: "p",
        text: "Performed exploratory data analysis on text pulled from multiple religious texts, comparing word counts across the different sources and charting them by similarity.",
      },
    ],
    links: [{ label: "Github", url: "https://github.com/khkwong/datahacks2021" }],
  },
  {
    slug: "ronald-reagan-remembers",
    title: "RonaldReaganRemembers",
    category: "Web & Tools",
    tier: "archive",
    summary: "Congressional App Challenge submission — I built the chatting feature.",
    body: [
      {
        type: "p",
        text: "A Congressional App Challenge submission. I handled the chatting feature.",
      },
    ],
    links: [{ label: "Github", url: "https://github.com/khkwong/RonaldReaganRemembers" }],
  },
  {
    slug: "delta-litter",
    title: "DeltaLitter",
    category: "Web & Tools",
    tier: "archive",
    summary: "Congressional App Challenge submission — I built the image recognition feature.",
    body: [
      {
        type: "p",
        text: "A Congressional App Challenge submission. I handled the image recognition feature.",
      },
    ],
    links: [{ label: "Github", url: "https://github.com/jeffreyL02/DeltaLitter" }],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/*
 * Both tiers are fixed-size shelves, not growing lists. A page of ten equal
 * cards flattens back into "everything looks the same" — the problem tiering
 * exists to solve — so a new project has to displace an existing one rather
 * than joining it. Retiring the displaced entry is a one-word `tier` edit.
 *
 * The limits warn rather than slice: silently dropping a project you just
 * added would be a genuinely confusing bug to track down. If the archive ever
 * outgrows its shelf too, that's the point to build the full "see everything"
 * list as its own view.
 */
export const FEATURED_LIMIT = 6;
export const ARCHIVE_LIMIT = 6;

export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const archivedProjects = projects.filter((p) => p.tier === "archive");

if (import.meta.env.DEV) {
  if (featuredProjects.length > FEATURED_LIMIT) {
    console.warn(
      `${featuredProjects.length} featured projects exceeds the shelf of ${FEATURED_LIMIT}. ` +
        `Move the weakest one to tier: "archive".`,
    );
  }
  if (archivedProjects.length > ARCHIVE_LIMIT) {
    console.warn(
      `${archivedProjects.length} archived projects exceeds the shelf of ${ARCHIVE_LIMIT}. ` +
        `Time for a full project list view, or drop the oldest.`,
    );
  }
}
