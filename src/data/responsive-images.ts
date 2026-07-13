const imagePath = (fileName: string) => `/images/${fileName}`;

const heroAndroid360Avif = imagePath("hero-android-360.avif");
const heroAndroid720Avif = imagePath("hero-android-720.avif");
const heroAndroid360Webp = imagePath("hero-android-360.webp");
const heroAndroid720Webp = imagePath("hero-android-720.webp");
const heroDesktop720Avif = imagePath("hero-desktop-720.avif");
const heroDesktop1440Avif = imagePath("hero-desktop-1440.avif");
const heroDesktop720Webp = imagePath("hero-desktop-720.webp");
const heroDesktop1440Webp = imagePath("hero-desktop-1440.webp");
const heroTablet240Avif = imagePath("hero-tablet-240.avif");
const heroTablet480Avif = imagePath("hero-tablet-480.avif");
const heroTablet240Webp = imagePath("hero-tablet-240.webp");
const heroTablet480Webp = imagePath("hero-tablet-480.webp");
const newsletter640Avif = imagePath("newsletter-dashboard-640.avif");
const newsletter1280Avif = imagePath("newsletter-dashboard-1280.avif");
const newsletter640Webp = imagePath("newsletter-dashboard-640.webp");
const newsletter1280Webp = imagePath("newsletter-dashboard-1280.webp");

export const HERO_ASSETS = {
  android: {
    avifSrcSet: `${heroAndroid360Avif} 360w, ${heroAndroid720Avif} 720w`,
    webpSrcSet: `${heroAndroid360Webp} 360w, ${heroAndroid720Webp} 720w`,
    preloadHref: heroAndroid360Avif,
    fallbackSrc: heroAndroid720Webp,
  },
  desktop: {
    avifSrcSet: `${heroDesktop720Avif} 720w, ${heroDesktop1440Avif} 1440w`,
    webpSrcSet: `${heroDesktop720Webp} 720w, ${heroDesktop1440Webp} 1440w`,
    preloadHref: heroDesktop720Avif,
    fallbackSrc: heroDesktop1440Webp,
  },
  tablet: {
    avifSrcSet: `${heroTablet240Avif} 240w, ${heroTablet480Avif} 480w`,
    webpSrcSet: `${heroTablet240Webp} 240w, ${heroTablet480Webp} 480w`,
    fallbackSrc: heroTablet480Webp,
    sizes: "(min-width: 1024px) 175px, 160px",
  },
  sizes: "(max-width: 639px) 260px, (max-width: 1023px) calc(100vw - 72px), 540px",
} as const;

export const NEWSLETTER_ASSETS = {
  avifSrcSet: `${newsletter640Avif} 640w, ${newsletter1280Avif} 1280w`,
  webpSrcSet: `${newsletter640Webp} 640w, ${newsletter1280Webp} 1280w`,
  fallbackSrc: newsletter1280Webp,
  sizes: "(min-width: 1024px) 640px, calc(100vw - 48px)",
} as const;

export const RESPONSIVE_ASSET_PATHS = [
  heroAndroid360Avif,
  heroAndroid720Avif,
  heroAndroid360Webp,
  heroAndroid720Webp,
  heroDesktop720Avif,
  heroDesktop1440Avif,
  heroDesktop720Webp,
  heroDesktop1440Webp,
  heroTablet240Avif,
  heroTablet480Avif,
  heroTablet240Webp,
  heroTablet480Webp,
  newsletter640Avif,
  newsletter1280Avif,
  newsletter640Webp,
  newsletter1280Webp,
] as const;
