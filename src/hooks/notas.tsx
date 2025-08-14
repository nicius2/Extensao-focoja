import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';
import html2pdf from 'html2pdf.js';

type Props = {
  onDownloadClick: (fn: () => Promise<void>) => void;
  markdownContent: string;
  setMarkdownContent: (value: string) => void;
};

export default function Notas({
  onDownloadClick,
  markdownContent,
  setMarkdownContent,
}: Props) {
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(event.target.value);
  };

  const handleDownloadPdf = async () => {
    if (contentRef.current) {
      const htmlContent = await marked.parse(contentRef.current.value);
      const element = document.createElement('div');

      const style = document.createElement('style');
      style.textContent = `
        body { font-size: 12pt; font-family: 'Helvetica', sans-serif; line-height: 1.6; color: #333; }
        h1 { font-size: 24pt; font-weight: bold; margin-bottom: 0.5em; }
        h2 { font-size: 18pt; font-weight: bold; margin-bottom: 0.5em; }
        h3 { font-size: 14pt; font-weight: bold; margin-bottom: 0.5em; }
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
        margin: 1,
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css'] },
      };

      await html2pdf().from(element).set(opt).save();
    }
  };

  useEffect(() => {
    onDownloadClick(handleDownloadPdf);
  }, [onDownloadClick]);

  return (
    <div className="p-4 flex flex-col items-center bg-zinc-900 min-h-screen text-amber-50">
      <textarea
        placeholder="Escreva suas notas em Markdown aqui:"
        value={markdownContent}
        onChange={handleChange}
        rows={12}
        ref={contentRef}
        className="w-full max-w-4xl p-4 border-2 border-[#27272A] rounded-lg
                   focus:outline-none text-sm font-medium leading-relaxed resize-y font-mono
                   bg-zinc-900 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3),_0_4px_6px_-4px_rgba(0,0,0,0.3)]
                   text-amber-50"
      />
    </div>
  );
}