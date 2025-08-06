import React, { useEffect } from 'react';
import { marked } from 'marked';
import html2pdf from 'html2pdf.js';

type Props = {
  onDownloadClick: (fn: () => Promise<void>) => void;
  markdownContent: string;
  setMarkdownContent: (value: string) => void;
};

export default function Notas({ onDownloadClick, markdownContent, setMarkdownContent }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(event.target.value);
  };

  const handleDownloadPdf = async () => {
    const htmlContent = await marked(markdownContent);
    const element = document.createElement('div');
    const style = document.createElement('style');
    style.textContent = `
      body { font-family: 'Helvetica', sans-serif; line-height: 1.6; color: #333; }
      h1, h2, h3 { font-weight: bold; }
      p { margin-bottom: 0.5em; }
      ul, ol { margin-left: 1.5em; }
      li { margin-bottom: 0.2em; }
      blockquote { border-left: 4px solid #ccc; padding-left: 1em; color: #666; margin: 0.5em 0; }
      code { font-family: 'Courier New'; background-color: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
      pre { background-color: #f4f4f4; padding: 1em; border-radius: 5px; overflow-x: auto; }
    `;
    element.appendChild(style);
    element.innerHTML += htmlContent;

    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR').replace(/\//g, '-');
    const timeStr = now.toLocaleTimeString('pt-BR', { hour12: false }).replace(/:/g, '-');
    const filename = `Notas-FocoJa-${dateStr}-${timeStr}.pdf`;

    const opt = {
      margin: 0.5,
      filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    await html2pdf().from(element).set(opt).save();
  };

  useEffect(() => {
    onDownloadClick(handleDownloadPdf);
  }, [onDownloadClick, markdownContent]);

  return (
    <div className="p-4 flex flex-col items-center min-h-screen bg-zinc-900">
      <textarea
        placeholder="Escreva suas notas em Markdown aqui:"
        value={markdownContent}
        onChange={handleChange}
        className="w-full max-w-4xl p-4 border-2 border-gray-300 rounded-lg
                   focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent
                   text-sm leading-relaxed resize-y font-mono bg-zinc-900 text-amber-50"
      />
    </div>
  );
}
