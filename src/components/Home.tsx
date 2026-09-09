import { EducationSection } from "@/components/EducationSection";
import { PublicationsSection } from "@/components/PublicationsSection";
import { AwardsSection } from "@/components/AwardsSection";
import type { Lang } from "@/lib/i18n";

export function Home({ lang }: { lang: Lang }) {
  return (
    <>
      <EducationSection lang={lang} />
      <PublicationsSection lang={lang} />
      <AwardsSection lang={lang} />
    </>
  );
}
