export type Platform = "android" | "windows";

export interface ChangelogSection {
  title: string;
  items: string[];
}

export interface ChangelogEntry {
  version: string;
  date: string; // ISO: "YYYY-MM-DD"
  platforms: Platform[];
  sections: ChangelogSection[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "0.0.1",
    date: "2025-01-01",
    platforms: ["android", "windows"],
    sections: [
      {
        title: "Prima versione",
        items: ["Rilascio iniziale di LabManager"],
      },
    ],
  },
];
