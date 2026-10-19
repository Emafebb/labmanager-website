import EditorialImage from "@/components/EditorialImage";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCommercialCta } from "@/data/trial-access-cta-inventory";

export default function Hero() {
  const trial = getCommercialCta("home-trial");
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__spread">
        <div className="hero__copy">
          <h1 id="hero-heading" className="hero__title">
            <span>Dalla ricetta</span> <span>al banco.</span>
          </h1>
          <div className="hero__intro" data-reveal>
            <p>
              Il gestionale per laboratori artigianali alimentari: ricette, costi,
              produzione e ordini, collegati al lavoro di ogni giorno.
            </p>
            <Link href="/#funzionalita" className="text-link">
              Scopri le funzionalità
            </Link>
          </div>
          <div className="hero__action" data-reveal>
            <a className="button" href={trial.destination}>
              {trial.label}
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
            <p>
              Tutte le funzioni Plus. <br />
              Senza carta di credito.
            </p>
          </div>
        </div>
        <figure className="hero__image">
          <EditorialImage
            src="/images/editorial/hero-laboratorio.webp"
            alt="Mani al lavoro su un impasto in un laboratorio artigianale"
            width={1086}
            height={1448}
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 520px) calc(100vw - 68px), (max-width: 700px) 452px, 40vw"
          />
        </figure>
      </div>
      <p className="hero__foot">
        Per chi impasta, prepara, produce. E tiene insieme tutto il resto.
      </p>
    </section>
  );
}
