import Link from "next/link";
import { WORK_AREAS, type WorkArea } from "@/data/work-areas";

export default function WorkAreaLinks({
  currentHref,
}: {
  currentHref: WorkArea["href"];
}) {
  return (
    <section
      className="area-related section-space"
      aria-labelledby="area-related-heading"
    >
      <h2 id="area-related-heading" data-reveal>Il lavoro continua.</h2>
      <nav aria-label="Altre aree di lavoro">
        {WORK_AREAS.filter((area) => area.href !== currentHref).map((area) => (
          <Link key={area.href} href={area.href} data-reveal>
            <span>{area.title}</span>
            <span>{area.description}</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
