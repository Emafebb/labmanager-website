import { ArrowRight } from "lucide-react";
import { preload } from "react-dom";
import { HERO_ASSETS } from "@/data/responsive-images";
import { getCommercialCta } from "@/data/trial-access-cta-inventory";

const homeTrialCta = getCommercialCta("home-trial");
const homeFeaturesCta = getCommercialCta("home-features");

export default function Hero() {
  preload(HERO_ASSETS.android.preloadHref, {
    as: "image",
    type: "image/avif",
    media: "(max-width: 639px)",
    imageSrcSet: HERO_ASSETS.android.avifSrcSet,
    imageSizes: HERO_ASSETS.sizes,
    fetchPriority: "high",
  });
  preload(HERO_ASSETS.desktop.preloadHref, {
    as: "image",
    type: "image/avif",
    media: "(min-width: 640px)",
    imageSrcSet: HERO_ASSETS.desktop.avifSrcSet,
    imageSizes: HERO_ASSETS.sizes,
    fetchPriority: "high",
  });

  return (
    <section className="relative overflow-hidden bg-[#FAFBFE]" aria-labelledby="hero-heading">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/[0.04] to-transparent blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-icon/[0.06] to-transparent blur-3xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle, var(--primary) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
          {/* Left column - Text content */}
          <div className="animate-fade-in-up lg:flex-1 text-center lg:text-left mb-16 lg:mb-0 max-w-2xl mx-auto lg:mx-0">
            <h1
              id="hero-heading"
              className="gradient-text mb-4 text-[2.5rem] font-bold leading-[1.08] tracking-tight text-foreground sm:text-[3.25rem] xl:text-[3.75rem]"
            >
              Il gestionale per laboratori artigianali alimentari
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed font-normal">
              Ricette, food cost, produzione, etichette, magazzino e ordini:
              tutto ciò che serve per organizzare il lavoro del laboratorio.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10 justify-center lg:justify-start">
              <a
                href={homeTrialCta.destination}
                className="touch-target group inline-flex items-center justify-center gap-2 bg-primary text-white px-7 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
              >
                {homeTrialCta.label}
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href={homeFeaturesCta.destination}
                className="touch-target inline-flex items-center justify-center border border-gray-200 bg-white text-gray-700 px-7 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5"
              >
                {homeFeaturesCta.label}
              </a>
            </div>

          </div>

          {/* Right column - Device mockups */}
          <div
            className="animate-fade-in lg:flex-1 flex justify-center lg:justify-end"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="relative w-full max-w-[540px] pb-0 sm:pb-20">
              {/* The phone artwork is the LCP below 640px; desktop is the LCP above it. */}
              <div className="relative z-20 hero-device-desktop mx-auto max-w-[260px] sm:max-w-none sm:mx-6">
                <div className="bg-gray-900 rounded-3xl sm:rounded-xl p-1.5 shadow-2xl overflow-hidden">
                  <picture data-hero-lcp>
                    <source
                      media="(max-width: 639px)"
                      type="image/avif"
                      srcSet={HERO_ASSETS.android.avifSrcSet}
                      sizes={HERO_ASSETS.sizes}
                    />
                    <source
                      media="(max-width: 639px)"
                      type="image/webp"
                      srcSet={HERO_ASSETS.android.webpSrcSet}
                      sizes={HERO_ASSETS.sizes}
                    />
                    <source
                      media="(min-width: 640px)"
                      type="image/avif"
                      srcSet={HERO_ASSETS.desktop.avifSrcSet}
                      sizes={HERO_ASSETS.sizes}
                    />
                    <source
                      media="(min-width: 640px)"
                      type="image/webp"
                      srcSet={HERO_ASSETS.desktop.webpSrcSet}
                      sizes={HERO_ASSETS.sizes}
                    />
                    <img
                      src={HERO_ASSETS.desktop.fallbackSrc}
                      srcSet={HERO_ASSETS.desktop.webpSrcSet}
                      sizes={HERO_ASSETS.sizes}
                      alt="Anteprima di LabManager su telefono e desktop"
                      width={1440}
                      height={857}
                      className="w-full h-auto rounded-[1.25rem] sm:rounded-lg"
                      fetchPriority="high"
                    />
                  </picture>
                </div>
                {/* Monitor stand */}
                <div className="hidden sm:flex flex-col items-center">
                  <div className="w-20 h-4 bg-gray-800 rounded-b-md" />
                  <div className="w-32 h-1.5 bg-gray-700 rounded-full" />
                </div>
              </div>

              {/* Tablet - overlapping bottom-left */}
              <div
                className="hidden sm:block absolute bottom-0 left-0 z-30 w-[160px] lg:w-[175px] hero-device-tablet"
                style={{ animationDelay: "0.3s" }}
                aria-hidden="true"
              >
                <div className="bg-gray-900 rounded-2xl p-1.5 shadow-xl overflow-hidden ring-1 ring-white/20">
                  <picture>
                    <source
                      media="(min-width: 640px)"
                      type="image/avif"
                      srcSet={HERO_ASSETS.tablet.avifSrcSet}
                      sizes={HERO_ASSETS.tablet.sizes}
                    />
                    <source
                      media="(min-width: 640px)"
                      type="image/webp"
                      srcSet={HERO_ASSETS.tablet.webpSrcSet}
                      sizes={HERO_ASSETS.tablet.sizes}
                    />
                    <img
                      src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                      alt=""
                      width={480}
                      height={709}
                      className="w-full h-auto rounded-xl"
                      loading="lazy"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
