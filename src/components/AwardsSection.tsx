import awards from "../../data/award.json";
import { formatToMonthYear, formatToMonthYearJP } from "@/lib/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

export function AwardsSection() {
  return (
    <div className="section publications" id="awards">
      <h1>Awards</h1>
      <ul>
        {awards.map((award, i) => (
          <li key={i}>
            {award.url ? (
              <a href={award.url}>{award.name}</a>
            ) : (
              award.name
            )}
            ,{" "}
            {award.lang === "ja"
              ? formatToMonthYearJP(award.date)
              : formatToMonthYear(award.date)}
            .
            {award.press_url && (
              <a
                href={award.press_url}
                className="reference-icon"
                aria-label={award.lang === "ja" ? "所属機関発表" : "Press Release"}
              >
                <FontAwesomeIcon icon={faNewspaper} />
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
