import { Link } from "react-router-dom";
import PixelModal from "./PixelModal";
import { contact } from "../data/profile";

export default function AboutModal({ onClose }: { onClose: () => void }) {
  return (
    <PixelModal title="About" onClose={onClose}>
      <h3>How I Got Here</h3>
      <p>
        I came to software by way of data science, a nicer way of saying I fell into the
        field that happened to reward an analytical mindset I already had. The label on the
        tech has never mattered to me as much as the problem underneath it, which is probably
        why my strongest suit isn't a stack but a range: climate emulation models, IoT signal
        classification, a Discord bot, and a pile of game mods all live on the{" "}
        <Link to="/projects">projects page</Link>.
      </p>

      <h3>How I Work</h3>
      <p>
        I like to land on a plan before I start, but I'm not precious about it, if the
        situation calls for hacking something together to see what happens, I'll do that and
        back into the plan afterward. Professionally I hold a harder line: software gets built
        around a clear problem, not because a tool looked interesting.
      </p>

      <h3>Right Now</h3>
      <p>
        Systems engineer at Aristotle Capital Management, mostly building internal AI tooling
        and data platforms — the <Link to="/work">work page</Link> goes into what that
        actually looks like. Always up for talking shop or hearing about an interesting problem
        : <a href={`mailto:${contact.email}`}>{contact.email}</a>,{" "}
        <a href={contact.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        , or my{" "}
        <a href={contact.resumePdf} download="Keith_Kwong_Resume.pdf">
          résumé
        </a>
        .
      </p>

      <h3>Off the Clock</h3>
      <p>
        Badminton, piano, boxing, karaoke, and a second-degree black belt in Tae Kwon Do. I
        play more games than I should, and build mods for the parts of them that annoy me
        personally — which is where the mods on the{" "}
        <Link to="/projects">projects page</Link> came from.
      </p>
    </PixelModal>
  );
}
