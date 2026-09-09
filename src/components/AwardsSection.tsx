import awards from "../../data/award.json";
import { formatToMonthYear, formatToMonthYearJP } from "@/lib/format";
import { hyphenate } from "@/lib/hyphenate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

export function AwardsSection() {
  return (
    <div className="section publications" id="awards">
      <h1>Awards</h1>
      <ul>
        {awards.map((award, i) => {
          const name =
            award.lang === "ja" ? award.name : hyphenate(award.name);
          return (
            <li key={i} lang={award.lang}>
              {award.url ? (
                <a href={award.url}>{name}</a>
              ) : (
                name
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
          );
        })}
      </ul>
    </div>
  );
}
