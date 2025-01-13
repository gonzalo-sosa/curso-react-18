import { useState } from "react";

interface ExpandableTextProps {
  children: string;
  maxChars?: number;
}

export default function ExpandableText({
  children,
  maxChars = 100,
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (children.length <= maxChars) return <p>{children}</p>;

  const text = isExpanded ? children : children.substring(0, maxChars) + "...";

  return (
    <p>
      {text}
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Ocultar" : "Mostrar"}
      </button>
    </p>
  );
}
