import DownloadClient from "./DownloadClient";

const ANDROID_DOWNLOAD_URL =
  "https://labmanager-downloads.labmanager-info.workers.dev/android";
const WINDOWS_DOWNLOAD_URL =
  "https://labmanager-downloads.labmanager-info.workers.dev/windows";

export default function Download() {
  return (
    <DownloadClient
      androidUrl={ANDROID_DOWNLOAD_URL}
      windowsUrl={WINDOWS_DOWNLOAD_URL}
    />
  );
}
