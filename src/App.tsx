import { downloadPdf } from '@/services/GenerateReport/downloadPdf';
import { generateReport } from '@/services/GenerateReport/generateReport';
import { MouseEvent, useState, useRef, createContext, useEffect, useCallback } from 'react';
import './App.css';
import './components/Form/Form.css';
import { Report } from './type/Report';
import { ExchangeRatesService } from './exchangeRatesService/ExchangeRatesService';
import { CryptoRecordElement } from '@/components/CryptoRecord/CryptoRecordElement';
import { CryptoRecord } from '@/type/CryptoRecord';
import { getGUID } from '@/utils/getGUID';
import { Form } from '@/components/Form/Form';
import { GeneralInfo } from '@/GeneralInfo';
import kasLogoUrl from './assets/kas-logo.jpg';
import ministerstwoLogoUrl from './assets/ministerstwo-finasow-logo.webp';
import { taxOffices as taxOfficesConst } from '@/taxOffices';

if (!import.meta.env.VITE_NOELECTRON) {
  console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`);
}

export const AppContext = createContext<ExchangeRatesService | null>(null);

const taxOfficeOptionsList: [string, string][] = taxOfficesConst.map((a) => [a, a]);

function getEmptyReport() {
  return {
    caseNumber: '',
    taxInstitution: '',
    cryptoCurrencies: [],
    ownerId: '',
    reportId: getGUID(),
  };
}

function App() {
  const [report, setReport] = useState<Report>(getEmptyReport());

  const [taxOffices] = useState<[string | number, string][]>([['', '--'], ...taxOfficeOptionsList]);

  const exchangeRatesService = useRef(new ExchangeRatesService());

  const onSubmit = useCallback(() => {
    const reportHTML = generateReport(report, '');
    const encodedHTML = encodeURIComponent(reportHTML.outerHTML);
    const dataURL = `data:text/html,${encodedHTML}`;
    downloadPdf(dataURL);
  }, [report]);

  function onChangeRecord(index: number, record: CryptoRecord): void {
    setReport((report) => {
      const newCryptoCurrencies = report.cryptoCurrencies.slice();
      newCryptoCurrencies[index] = record;
      return { ...report, cryptoCurrencies: newCryptoCurrencies };
    });
  }

  function onAddCurrency(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    onChangeRecord(report.cryptoCurrencies.length, {
      guid: getGUID(),
      amount: 0,
      name: '',
      prices: [],
    });
  }

  function onReset() {
    setReport(getEmptyReport());
  }

  return (
    <AppContext.Provider value={exchangeRatesService.current}>
      <div className='App'>
        <header>
          <img src={kasLogoUrl} />
          <h1>Kryptokasa</h1>
          <img src={ministerstwoLogoUrl} />
        </header>
        <Form
          onSubmit={onSubmit}
          onReset={onReset}
        >
          <GeneralInfo
            report={report}
            onChange={setReport}
            taxOffices={taxOffices}
          />
          <fieldset>
            <legend>Kryptoaktywa</legend>
            <div>
              {report.cryptoCurrencies.map((record, index) => (
                <CryptoRecordElement
                  key={record.guid}
                  index={index}
                  record={record}
                  onChange={(newValue) => onChangeRecord(index, newValue)}
                />
              ))}
            </div>
            <button
              onClick={onAddCurrency}
              className={'form--add-currency'}
            >
              Dodaj Krytpoaktywo
            </button>
          </fieldset>
        </Form>
      </div>
    </AppContext.Provider>
  );
}

export default App;
