import affiliation from "../../data/affiliation.json";
import education from "../../data/education.json";

type Item = {
  from_year: number;
  to_year: number | null;
  topic: string;
  affiliation: string[] | null;
};

function ItemList({ items }: { items: Item[] }) {
  return (
    <ul className="education-list">
      {items.map((item, i) => (
        <li key={i}>
          <span className="education-year">
            {item.from_year} ~ {item.to_year ?? "Present"}
          </span>{" "}
          <span className="education-topic">{item.topic}</span>
          {item.affiliation && (
            <span className="education-affiliation">
              {item.affiliation.map((line, j) => (
                <span key={j}>
                  {j > 0 && <>{" "}<br className="mobile-br" /></>}
                  {line}
                </span>
              ))}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function EducationSection() {
  return (
    <>
      <div className="section" id="affiliation">
        <h1>Affiliation</h1>
        <ItemList items={affiliation} />
      </div>
      <div className="section" id="education">
        <h1>Education</h1>
        <ItemList items={education} />
      </div>
    </>
  );
}
