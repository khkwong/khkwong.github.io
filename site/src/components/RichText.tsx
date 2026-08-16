import type { ContentBlock } from "../data/content";

/** Renders a `ContentBlock[]` body. Shared by project and work detail pages. */
export default function RichText({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "p") return <p key={i}>{block.text}</p>;
        if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
        if (block.type === "h3") return <h3 key={i}>{block.text}</h3>;
        return (
          <ul key={i}>
            {block.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        );
      })}
    </>
  );
}
