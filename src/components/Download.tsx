import DownloadClient from "./DownloadClient";

const GITHUB_RAW = "https://raw.githubusercontent.com/Emafebb/Labmanager-Updates/main";

export default async function Download() {
  let androidUrl = "#";
  let windowsUrl = "#";

  try {
    const [androidRes, windowsRes] = await Promise.all([
      fetch(`${GITHUB_RAW}/version_android.json`, { next: { revalidate: 3600 } }),
      fetch(`${GITHUB_RAW}/version.json`, { next: { revalidate: 3600 } }),
    ]);
    const [androidJson, windowsJson] = await Promise.all([
      androidRes.json(),
      windowsRes.json(),
    ]);
    androidUrl = androidJson.download_url ?? "#";
    windowsUrl = windowsJson.windows_download_url ?? "#";
  } catch {
    // fallback silenzioso: i bottoni restano disabilitati (#)
  }

  return <DownloadClient androidUrl={androidUrl} windowsUrl={windowsUrl} />;
}
