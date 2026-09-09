import journals from "../../data/journal.json";
import conferences from "../../data/conference.json";
import domestics from "../../data/domestic.json";
import { formatToMonthYear, formatToMonthYearJP } from "@/lib/format";
import { hyphenate } from "@/lib/hyphenate";
import { localized, type Lang } from "@/lib/i18n";
import { ReferenceTooltip } from "./ReferenceTooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

type Author = { name: string; me: boolean };

type Domestic = {
  authors: Author[];
  title: string;
  url: string;
  book_name: string;
  presentation_format: string | null;
  place: string;
  date: string;
  lang?: string;
  reference?: string;
  note?: string;
  note_url?: string;
};

type Journal = {
  authors: Author[];
  title: string;
  url?: string;
  book_name: string;
  bib_info?: string;
  date?: string;
  note?: string;
};

function authorSeparator(index: number, total: number, conjunction?: string) {
  if (index === total - 1) return ", ";
  if (conjunction && index === total - 2) {
    return total === 2 ? ` ${conjunction} ` : `, ${conjunction} `;
  }
  return ", ";
}

function AuthorList({
  authors,
  conjunction,
  lang = "ja",
}: {
  authors: Author[];
  conjunction?: string;
  lang?: Lang;
}) {
  return (
    <>
      {authors.map((author, i) => {
        const name = localized(author, "name", lang);
        return (
          <span key={i}>
            {author.me ? <span className="author">{name}</span> : name}
            {authorSeparator(i, authors.length, conjunction)}
          </span>
        );
      })}
    </>
  );
}

export function PublicationsSection({ lang }: { lang: Lang }) {
  const isEnglish = lang === "en";

  return (
    <div className="smngs-section publications" id="publications">
      <h1>Publications</h1>

      <div id="journal-papers"><h2>Journal Papers</h2></div>
      <ul>
        {(journals as Journal[]).map((journal, i) => (
          <li key={i} lang="en">
            <AuthorList authors={journal.authors} conjunction="and" />
            &ldquo;
            {journal.url ? (
              <a href={journal.url}>{hyphenate(journal.title)}</a>
            ) : (
              hyphenate(journal.title)
            )}
            &rdquo;, {hyphenate(journal.book_name)}
            {journal.bib_info && <>, {journal.bib_info}</>}
            {journal.date && <>, {formatToMonthYear(journal.date)}</>}
            {journal.note ? <span> ({hyphenate(journal.note)}).</span> : <span>.</span>}
          </li>
        ))}
      </ul>

      <div id="conference-proceedings"><h2>Conference Proceedings</h2></div>
      <ul>
        {conferences.map((conf, i) => (
          <li key={i} lang="en">
            <AuthorList authors={conf.authors} conjunction="and" />
            &ldquo;<a href={conf.url}>{hyphenate(conf.title)}</a>&rdquo;,{" "}
            {hyphenate(conf.book_name)},{" "}
            {conf.presentation_format && <>{conf.presentation_format}, </>}
            {conf.place},{" "}
            {formatToMonthYear(conf.date)}
            {conf.note ? <span> ({hyphenate(conf.note)}).</span> : <span>.</span>}
          </li>
        ))}
      </ul>

      <div id="presentations"><h2>Presentations</h2></div>
      <ul>
        {(domestics as Domestic[]).map((dom, i) => {
          const text = (value: string) => (isEnglish ? hyphenate(value) : value);
          // Empty means the note is deliberately dropped in this language, so
          // its award link goes with it.
          const note = localized<string | null | undefined>(dom, "note", lang);
          // Everything trailing the date goes in one parenthesis. On the
          // English page a talk given in Japanese says so there, since the
          // title above it is a translation rather than the published one.
          const aside = [
            note,
            isEnglish && dom.lang === "ja" ? "in Japanese" : undefined,
          ].filter(Boolean);

          return (
            <li key={i} lang={isEnglish ? "en" : "ja"}>
              <AuthorList
                authors={dom.authors}
                lang={lang}
                conjunction={isEnglish ? "and" : undefined}
              />
              &ldquo;<a href={dom.url}>{text(localized(dom, "title", lang))}</a>&rdquo;,{" "}
              {text(localized(dom, "book_name", lang))},{" "}
              {dom.presentation_format && <>{dom.presentation_format}, </>}
              {localized(dom, "place", lang)},{" "}
              {isEnglish ? formatToMonthYear(dom.date) : formatToMonthYearJP(dom.date)}
              {aside.length > 0 ? <span> ({aside.join(", ")}).</span> : <span>.</span>}
              {dom.reference && (
                <ReferenceTooltip reference={localized(dom, "reference", lang)} />
              )}
              {dom.note_url && note && (
                <a href={dom.note_url} className="reference-icon" aria-label={note}>
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
