export type GameItem = { text: string; url?: string };
export type GameSection = { title: string; note?: string; items: GameItem[] };

export const gameSections: GameSection[] = [
  {
    title: "Riot Games",
    items: [
      { text: "Valorant — Riot's tactical FPS is currently my most played game with friends.", url: "https://playvalorant.com/en-us/" },
      { text: "TFT — I love Riot's take on the auto chess genre and have been hooked from the very beginning!", url: "https://teamfighttactics.leagueoflegends.com/en-us/" },
      { text: "League of Legends — Don't play anymore, but was my main source of entertainment back in middle/high school.", url: "https://www.leagueoflegends.com/en-us/" },
      { text: "Feel free to add me: Bobthemanny#beef" },
    ],
  },
  {
    title: "Steam Games",
    items: [
      { text: "Elden Ring — My second Soulsborne game that I thoroughly enjoyed despite the fact that my computer ain't good enough for it.", url: "https://en.bandainamcoent.eu/elden-ring/elden-ring" },
      { text: "Slay the Spire — Great roguelike, deck-building game that I play on and off occasionally. Still yet to get to A20 on the Defect.", url: "https://store.steampowered.com/app/646570/Slay_the_Spire/" },
      { text: "Left 4 Dead 2 — The GOAT when it comes to multiplayer cooperative shooters. Back 4 Blood could never.", url: "https://store.steampowered.com/app/500/Left_4_Dead/" },
      { text: "Sekiro Shadows Die Twice — Such a smooth combat system, got me hooked on Soulsborne titles.", url: "https://www.sekirothegame.com" },
      { text: "Risk of Rain 2 — Third person roguelike shooter that could also be played coop? Sign me up.", url: "https://store.steampowered.com/app/632360/Risk_of_Rain_2/" },
      { text: "Warframe — Played a ton right before entering college and still occasionally get on to grind relics even now.", url: "https://www.warframe.com/landing" },
      { text: "Metal Gear Rising Revengeance — This game is epicness incarnate, the ultimate power fantasy. Really makes you feel like a badass cyborg ninja taking on an American politician.", url: "https://store.steampowered.com/app/235460/METAL_GEAR_RISING_REVENGEANCE/" },
      { text: "CSGO/CS2 — RIP CSGO, but at least you gave me a foundation for Valorant.", url: "https://store.steampowered.com/app/730/CounterStrike_2/" },
    ],
  },
  {
    title: "Console Games",
    items: [
      { text: "Halo CE/2/3/4 — Linked the MCC since it's easier, but damn these games made my childhood on the Xbox 360. I know every campaign level like the back of my hand, not to mention my bookshelf of assorted Halo literature.", url: "https://store.steampowered.com/app/976730/Halo_The_Master_Chief_Collection/" },
      { text: "Super Smash Brothers Brawl/4/Ultimate — Only fighting game I play, and the only one I think I need to. I suck though, and please bring back Subspace Emissary Nintendo.", url: "https://www.smashbros.com/en_US/" },
      { text: "Mario Party — Many guffaws shared with friends.", url: "https://marioparty.nintendo.com" },
      { text: "Kirby's Return to Dreamland — Kirby game, Kirby game, Kirby game... I still need to get to Forgotten Land.", url: "https://en.wikipedia.org/wiki/Kirby%27s_Return_to_Dream_Land" },
      { text: "Mario Odyssey — How is this even real. It's so good. Actually made me reminisce about my childhood days of playing Mario Galaxy.", url: "https://www.nintendo.com/us/store/products/super-mario-odyssey-switch/" },
      { text: "Mario Kart — Came with the Switch, still think Mario Kart Wii is the best.", url: "https://mariokart8.nintendo.com" },
    ],
  },
  {
    title: "Gacha Games",
    note: "Don't look, you can leave now",
    items: [
      { text: "Zenless Zone Zero — Why does Hoyoverse have such a grip on me man, this game is too pretty.", url: "https://zenless.hoyoverse.com/ua" },
      { text: "Honkai Star Rail — Latest gacha obsession, no I will not be taking any further questions.", url: "https://hsr.hoyoverse.com/en-us/" },
      { text: "Genshin Impact — I stopped playing religiously, come back every now and again.", url: "https://genshin.hoyoverse.com/en/" },
      { text: "Puzzles and Dragons — Legacy gacha game for me, played it ever since middle school.", url: "https://www.puzzleanddragons.us" },
      { text: "Wuthering Waves — Like the gameplay, honestly prefer this combat loop better than the Hoyo games, unfortunately everything else falls a bit short for me." },
    ],
  },
  {
    title: "Other",
    items: [
      { text: "Pokemon (Gen 4 was the best, Gen 4 remake sucks)" },
      { text: "Kirby Super Star Ultra (Nintendo DS)" },
      { text: "Mario Party DS" },
      { text: "Kirby Mass Attack (Why are handheld Kirby games so good)" },
      { text: "Mario Kart DS" },
      { text: "Probably more that I'm forgetting." },
    ],
  },
];
