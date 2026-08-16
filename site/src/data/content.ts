/**
 * The body format shared by project and work detail pages. Both render the
 * same shapes through `<RichText>`, so the type lives here rather than in
 * either data file.
 */
export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };
