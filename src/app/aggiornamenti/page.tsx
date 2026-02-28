import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { changelog, type ChangelogEntry, type Platform } from "@/data/changelog";

export const metadata: Metadata = {
  title: "Aggiornamenti - LabManager",
  description: "Cronologia degli aggiornamenti di LabManager.",
  robots: {
    index: false,
    follow: false,
  },
};

const platformLabel: Record<Platform, string> = {
  android: "Android",
  windows: "Windows",
};

const platformStyle: Record<Platform, string> = {
  android: "bg-green-100 text-green-800",
  windows: "bg-blue-100 text-blue-800",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("it-IT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PlatformBadge({ platform }: { platform: Platform }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${platformStyle[platform]}`}
    >
      {platformLabel[platform]}
    </span>
  );
}

function TimelineEntry({ entry, isLast }: { entry: ChangelogEntry; isLast: boolean }) {
  return (
    <div className="relative pl-8 sm:pl-12">
      {/* Linea verticale */}
      {!isLast && (
        <div className="absolute left-3 sm:left-4 top-8 bottom-0 w-0.5 bg-primary/20" />
      )}
      {/* Nodo cerchio */}
      <div className="absolute left-0 sm:left-1 top-1.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center ring-4 ring-white">
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>

      {/* Contenuto */}
      <div className="pb-10">
        {/* Header versione */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xl font-bold text-gray-900">v{entry.version}</span>
          <span className="text-sm text-gray-500">{formatDate(entry.date)}</span>
          <div className="flex gap-1.5">
            {entry.platforms.map((p) => (
              <PlatformBadge key={p} platform={p} />
            ))}
          </div>
        </div>

        {/* Sezioni changelog */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          {entry.sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">{section.title}</h3>
              <ul className="space-y-1">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-600">
                    <span className="text-primary mt-0.5 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AggiornamentiPage() {
  return (
    <>
      <nav aria-label="Navigazione principale" className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200 ease-out">
              <Image
                src="/images/logo.png"
                alt="LabManager"
                width={28}
                height={28}
              />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">LabManager</span>
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary hover:bg-primary/5 px-4 py-2 rounded-lg transition-all duration-200 ease-out"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Torna al sito</span>
          </a>
        </div>
      </nav>

      <main className="pt-20 min-h-screen bg-surface">
        <div className="max-w-2xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Aggiornamenti</h1>
            <p className="text-gray-500">Tutte le versioni rilasciate di LabManager</p>
          </div>

          {/* Timeline */}
          <div>
            {changelog.map((entry, index) => (
              <TimelineEntry
                key={entry.version}
                entry={entry}
                isLast={index === changelog.length - 1}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
