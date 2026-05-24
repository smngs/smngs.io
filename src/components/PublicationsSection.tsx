import journals from "../../data/journal.json";
import conferences from "../../data/conference.json";
import domestics from "../../data/domestic.json";
import { formatToMonthYear, formatToMonthYearJP } from "@/lib/format";
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
  reference?: string;
  note?: string;
  note_url?: string;
};

type Journal = {
  authors: Author[];
  title: string;
  url: string;
  book_name: string;
  bib_info: string;
  date: string;
  note?: string;
};

function AuthorList({ authors, separator }: { authors: Author[]; separator: string }) {
  return (
    <>
      {authors.map((author, i) => (
        <span key={i}>
          {author.me ? (
            <span className="author">{author.name}</span>
          ) : (
            author.name
          )}
          {i !== authors.length - 1 ? separator : ", "}
        </span>
      ))}
    </>
  );
}

export function PublicationsSection() {
  return (
    <div className="section publications" id="publications">
      <h1>Publications</h1>

      <div id="journal-papers"><h2>Journal Papers</h2></div>
      <ul>
        {(journals as Journal[]).map((journal, i) => (
          <li key={i}>
            <AuthorList authors={journal.authors} separator=" and " />
            &ldquo;<a href={journal.url}>{journal.title}</a>&rdquo;,{" "}
            {journal.book_name}, {journal.bib_info},{" "}
            {formatToMonthYear(journal.date)}
            {journal.note ? <span> ({journal.note}).</span> : <span>.</span>}
          </li>
        ))}
      </ul>

      <div id="conference-proceedings"><h2>Conference Proceedings</h2></div>
      <ul>
        {conferences.map((conf, i) => (
          <li key={i}>
            <AuthorList authors={conf.authors} separator=" and " />
            &ldquo;<a href={conf.url}>{conf.title}</a>&rdquo;,{" "}
            {conf.book_name},{" "}
            {conf.presentation_format && <>{conf.presentation_format}, </>}
            {conf.place},{" "}
            {formatToMonthYear(conf.date)}
            {conf.note ? <span> ({conf.note}).</span> : <span>.</span>}
          </li>
        ))}
      </ul>

      <div id="presentations"><h2>Presentations</h2></div>
      <ul>
        {(domestics as Domestic[]).map((dom, i) => (
          <li key={i}>
            <AuthorList authors={dom.authors} separator=", " />
            &ldquo;<a href={dom.url}>{dom.title}</a>&rdquo;,{" "}
            {dom.book_name},{" "}
            {dom.presentation_format && <>{dom.presentation_format}, </>}
            {dom.place},{" "}
            {formatToMonthYearJP(dom.date)}
            {dom.note ? <span> ({dom.note}).</span> : <span>.</span>}
            {dom.reference && <ReferenceTooltip reference={dom.reference} />}
            {dom.note_url && (
              <a
                href={dom.note_url}
                className="reference-icon"
                aria-label={dom.note ?? "Reference"}
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
