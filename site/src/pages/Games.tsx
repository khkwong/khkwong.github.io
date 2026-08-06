import { gameSections } from "../data/games";
import "./Games.css";

export default function Games() {
  return (
    <div className="page">
      <h1>My Gaming Career</h1>
      <img src="/img/sf_gamer.png" alt="Keith as a gamer" className="games-hero" />

      {gameSections.map((section) => (
        <section key={section.title}>
          <h2>
            {section.title}
            {section.note && <span className="games-note"> ({section.note})</span>}
          </h2>
          <ul>
            {section.items.map((item, i) => (
              <li key={i}>{item.url ? <a href={item.url} target="_blank" rel="noreferrer">{item.text}</a> : item.text}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
