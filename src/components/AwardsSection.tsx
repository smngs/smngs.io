import awards from "../../data/award.json";
import { formatToMonthYear, formatToMonthYearJP } from "@/lib/format";
import { hyphenate } from "@/lib/hyphenate";
import { localized, strings, type Lang } from "@/lib/i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

export function AwardsSection({ lang }: { lang: Lang }) {
  return (
    <div className="smngs-section publications" id="awards">
      <h1>Awards</h1>
      <ul>
        {awards.map((award, i) => {
          // On the English page every entry reads as English, so the whole list
          // takes English hyphenation and English dates; on the Japanese page
          // only the entries that are natively English do.
          const isEnglish = lang === "en" || award.lang === "en";
          const name = localized(award, "name", lang);
          return (
            <li key={i} lang={isEnglish ? "en" : "ja"}>
              {award.url ? (
                <a href={award.url}>{isEnglish ? hyphenate(name) : name}</a>
              ) : isEnglish ? (
                hyphenate(name)
              ) : (
                name
              )}
              ,{" "}
              {isEnglish
                ? formatToMonthYear(award.date)
                : formatToMonthYearJP(award.date)}
              .
              {award.press_url && (
                <a
                  href={award.press_url}
                  className="reference-icon"
                  aria-label={strings[lang].pressRelease}
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
