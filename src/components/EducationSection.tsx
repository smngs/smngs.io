import affiliation from "../../data/affiliation.json";
import education from "../../data/education.json";
import { localized, type Lang } from "@/lib/i18n";

type Item = {
  from_year: number;
  to_year: number | null;
  topic: string;
  affiliation: string[] | null;
};

function ItemList({ items, lang }: { items: Item[]; lang: Lang }) {
  return (
    <ul className="education-list">
      {items.map((item, i) => {
        const lines = localized<string[] | null>(item, "affiliation", lang);
        return (
          <li key={i}>
            <span className="education-year">
              {item.from_year} ~ {item.to_year ?? "Present"}
            </span>{" "}
            <span className="education-topic">
              {localized(item, "topic", lang)}
            </span>
            {lines && (
              <span className="education-affiliation">
                {lines.map((line, j) => (
                  <span key={j}>
                    {j > 0 && <>{" "}<br className="mobile-br" /></>}
                    {line}
                  </span>
                ))}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function EducationSection({ lang }: { lang: Lang }) {
  return (
    <>
      <div className="smngs-section" id="affiliation">
        <h1>Affiliation</h1>
        <ItemList items={affiliation} lang={lang} />
      </div>
      <div className="smngs-section" id="education">
        <h1>Education</h1>
        <ItemList items={education} lang={lang} />
      </div>
    </>
  );
}
