import type { Metadata } from "next";
import type { ReactNode } from "react";
import EditorialImage from "@/components/EditorialImage";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMotion from "@/components/PageMotion";
import WorkAreaLinks from "@/components/WorkAreaLinks";
import { getCommercialCta } from "@/data/trial-access-cta-inventory";
import type { WorkArea } from "@/data/work-areas";
import { getCommercialCapability, TRIAL_EXPLANATION } from "@/lib/pricing";

const BASE_URL = "https://labmanagergestionale.com";

export function workAreaMetadata(area: WorkArea): Metadata {
  const title = `${area.title} | LabManager`;
  const url = `${BASE_URL}${area.href}`;
  return {
    title: { absolute: title },
    description: area.description,
    alternates: { canonical: url, languages: { it: url } },
    openGraph: {
      title,
      description: area.description,
      url,
      siteName: "LabManager",
      locale: "it_IT",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/images/og-image.png`,
          secureUrl: `${BASE_URL}/images/og-image.png`,
          width: 1200,
          height: 630,
          alt: "LabManager — dalla ricetta al banco",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: area.description,
      images: [`${BASE_URL}/images/og-image.png`],
    },
  };
}

export function WorkAreaSteps({
  title,
  intro,
  steps,
}: {
  title: string;
  intro: string;
  steps: readonly { title: string; text: string }[];
}) {
  return (
    <section
      className="area-flow section-space"
      aria-labelledby="area-flow-heading"
    >
      <div className="section-intro" data-reveal>
        <h2 id="area-flow-heading">{title}</h2>
        <p>{intro}</p>
      </div>
      <ol
        className={
          steps.length === 3
            ? "area-flow__steps area-flow__steps--three"
            : "area-flow__steps"
        }
      >
        {steps.map((step) => (
          <li key={step.title} data-reveal>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function WorkAreaPage({
  area,
  heading,
  intro,
  image,
  capabilities,
  children,
}: {
  area: WorkArea;
  heading: ReactNode;
  intro: string;
  image: { src: string; alt: string };
  capabilities: readonly string[];
  children: ReactNode;
}) {
  const trial = getCommercialCta("work-area-trial");
  const url = `${BASE_URL}${area.href}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: area.title,
    description: area.description,
    inLanguage: "it-IT",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#softwareapplication` },
  };
  return (
    <>
      <PageMotion />
      <Navbar />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <nav className="area-breadcrumb" aria-label="Percorso">
          <Link href="/">Home</Link>
          <Link href="/#funzionalita">Funzionalità</Link>
          <span aria-current="page">{area.title}</span>
        </nav>
        <section className="page-lead orders-lead area-lead">
          <div>
            <h1>{heading}</h1>
            <p>{intro}</p>
            <a href={trial.destination} className="button">
              {trial.label}
            </a>
            <p className="small-note">
              Tutte le funzioni Plus. Senza carta di credito.
            </p>
          </div>
          <figure>
            <EditorialImage
              src={image.src}
              alt={image.alt}
              width={image.src.includes("hero-laboratorio") ? 1086 : 1536}
              height={image.src.includes("hero-laboratorio") ? 1448 : 1024}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 700px) calc(100vw - 40px), calc((100vw - 120px) * 0.4)"
            />
            <figcaption>Illustrazione editoriale generata con AI.</figcaption>
          </figure>
        </section>
        {children}
        <section
          className="area-plans section-space"
          aria-labelledby="area-plans-heading"
        >
          <div data-reveal>
            <h2 id="area-plans-heading">Scegli il piano per questo lavoro.</h2>
            <p>
              Parti dalle funzioni che ti servono. Durante la prova puoi usare
              tutte le funzionalità Plus.
            </p>
            <Link href="/pricing" className="text-link">
              Confronta Light e Plus
            </Link>
          </div>
          <dl>
            {capabilities.map((id) => {
              const capability = getCommercialCapability(id);
              return (
                <div key={id} data-reveal>
                  <dt>{capability.nome}</dt>
                  <dd>
                    {capability.tierMinimo === "Light"
                      ? "Light e Plus"
                      : "Plus"}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>
        <WorkAreaLinks currentHref={area.href} />
        <section className="pricing-close section-space">
          <h2 data-reveal>Portalo nel tuo laboratorio.</h2>
          <p data-reveal>{TRIAL_EXPLANATION}</p>
          <a href={trial.destination} className="button" data-reveal>
            {trial.label}
          </a>
          <p className="small-note">
            Registrazione, scelta del piano e pagamento avvengono nella web app.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
