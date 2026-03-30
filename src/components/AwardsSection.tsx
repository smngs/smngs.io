import awards from "../../data/award.json";
import { formatToMonthYear, formatToMonthYearJP } from "@/lib/format";

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
            {award.press_url ? (
              award.lang === "ja" ? (
                <span>
                  , <a href={award.press_url}>所属機関発表</a>.
                </span>
              ) : (
                <span>
                  , <a href={award.press_url}>Press Release</a>.
                </span>
              )
            ) : (
              <>.</>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
