import {Report} from "@/type/Report";
import {createSectionList} from './createSectionList'

const SECTION_TITLE = 'Dane raportu';

function getFormattedDate() {
  const currDate = new Date();
  const day = currDate.getDate().toString(10).padStart(2, '0');
  const month = (currDate.getMonth() + 1).toString(10).padStart(2, '0');
  const year = currDate.getFullYear();
  return `${day}.${month}.${year}`;
}

export function createReportGeneralSection(generalInfo: Report) {
  const generalSection = document.createElement('section');
  const title = document.createElement('h2');
  title.textContent = SECTION_TITLE;
  const sectionData = createSectionList([
    ['Data wykonania raportu', getFormattedDate()],
    ['Identyfikator raportu', generalInfo.reportId]
  ]);
  generalSection.appendChild(title);
  generalSection.appendChild(sectionData);
  return generalSection;
}
