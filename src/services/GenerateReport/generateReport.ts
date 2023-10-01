import {REPORT_STYLES} from "@/services/GenerateReport/reportStyles";
import { createReportHeader } from './createReportHeader.ts'
import { createReportBody } from './createReportBody.ts'
import {Report} from "@/type/Report";

export function generateReport(config: Report, usdPlnExchangeTime: string) {
  const reportBody = document.createElement('body');
  const header = createReportHeader();
  reportBody.appendChild(header);
  reportBody.appendChild(createReportBody(config, usdPlnExchangeTime));
  const root = document.createElement('html');
  const rootHead = document.createElement('head');
  rootHead.innerHTML = REPORT_STYLES;
  root.appendChild(rootHead);
  root.appendChild(reportBody);
  return root;
}
