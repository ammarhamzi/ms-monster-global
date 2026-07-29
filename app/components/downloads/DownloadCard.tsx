import { Download, ExternalLink, FileText } from 'lucide-react';
import type { DownloadDocumentContent } from '../../content';

interface DownloadCardProps {
  document: DownloadDocumentContent;
  openLabel: string;
  downloadLabel: string;
}

export default function DownloadCard({
  document,
  openLabel,
  downloadLabel,
}: DownloadCardProps) {
  const fileName = document.href.split('/').at(-1);

  return (
    <article className="flex h-full flex-col border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start justify-between gap-5">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
          <FileText className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
          {document.meta}
        </span>
      </div>
      <h3 className="mt-7 text-xl font-bold leading-snug text-slate-950">
        {document.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
        {document.description}
      </p>
      <div className="mt-7 grid gap-2 sm:grid-cols-2">
        <a
          href={document.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-950 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          {openLabel}
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
        <a
          href={document.href}
          download={fileName}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800 transition-colors hover:border-blue-700 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          {downloadLabel}
          <Download className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
