'use client';

import { useEffect, useState } from "react";
import { cn } from "@/shared/utils/cn";

export default function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    // Extrai H2 do HTML string (simples)
    // Nota: Em produção, o ideal é que o SANIT já envie os H2 processados no JSON.
    // Mas este regex resolve para HTML limpo.
    const matches = content.match(/<h2.*?>(.*?)<\/h2>/g);
    if (matches) {
        const extracted = matches.map(h => {
            const text = h.replace(/<[^>]*>/g, ""); // Remove tags
            const id = text.toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // Remove acentos
                .replace(/[^a-z0-9]+/g, "-"); // Slugify
            return { text, id };
        });
        setHeadings(extracted);
    }
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <nav className="text-sm">
      <h4 className="font-semibold text-slate-900 mb-3 px-2">Nesta página</h4>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id}>
            <a 
              href={`#${h.id}`} // O HTML do content precisa ter id="..." nos H2. 
                                // (No SANIT, o editor deve salvar já com IDs ou processamos no backend)
              className="block px-2 py-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded-md transition-colors truncate"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}