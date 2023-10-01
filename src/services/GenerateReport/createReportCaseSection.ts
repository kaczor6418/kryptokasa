import {Report} from "@/type/Report";
import {createSectionList} from './createSectionList'

const SECTION_TITLE = 'Informacje o sprawie';

export function createReportCaseSection(caseInfo: Report) {
  const currentSection = document.createElement('section');
  const title = document.createElement('h2');
  title.textContent = SECTION_TITLE;
  const sectionData = createSectionList([
    ['Nazwa organu egzekucyjnego', caseInfo.taxInstitution],
    ['Numer sprawy', caseInfo.caseNumber],
    ['Dane identyfikujące właściciela', caseInfo.ownerId]
  ]);
  currentSection.appendChild(title);
  currentSection.appendChild(sectionData);
  return currentSection;
}
