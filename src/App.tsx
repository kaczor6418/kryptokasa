import { MouseEvent, useState } from 'react';
import './App.css';
import './components/Form/Form.css';
import { Report } from './type/Report';
import { Input } from '@/components/Form/Input/Input';
import { Select } from '@/components/Form/Select/Select';
import { CryptoRecordElement } from '@/components/CryptoRecord/CryptoRecordElement';
import { CryptoRecord } from '@/type/CryptoRecord';
import { getGUID } from '@/utils/getGUID';
import { Form } from '@/components/Form/Form';
import { FormSubmit } from '@/components/Form/FormSubmit';
import { GeneralInfo } from '@/GeneralInfo';

if (!import.meta.env.VITE_NOELECTRON) {
  console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`);
}

function App() {
  const [report, setReport] = useState<Report>({
    caseNumber: '',
    taxInstitution: '',
    cryptoCurrencies: [],
    ownerId: '',
    reportId: getGUID(),
  });

  const [taxOffices] = useState<[string | number, string][]>([
    ['', '--'],
    ['Tax office 1', 'Tax office 1'],
    ['Tax office 2', 'Tax office 2'],
  ]);

  function onChangeReport(prop: keyof Report, value: unknown): void {
    setReport({ ...report, [prop]: value });
  }

  function onChangeRecord(index: number, record: CryptoRecord): void {
    const newCryptoCurrencies = report.cryptoCurrencies.slice();
    newCryptoCurrencies[index] = record;
    setReport({ ...report, cryptoCurrencies: newCryptoCurrencies });
  }

  function onAddCurrency(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    onChangeRecord(report.cryptoCurrencies.length, {
      guid: getGUID(),
      amount: 0,
      name: '',
      prices: [
        {
          unitPrice: 0,
          exchangeRateToPLN: 0,
          isManual: false,
          priceSourceName: 'priceSourceName',
          priceSourceURL: 'priceSourceURL',
          unitPriceCurrency: 'unitPriceCurrency',
          guid: getGUID(),
        },
        {
          unitPrice: 1,
          exchangeRateToPLN: 0,
          isManual: false,
          priceSourceName: 'priceSourceName',
          priceSourceURL: 'priceSourceURL',
          unitPriceCurrency: 'unitPriceCurrency',
          guid: getGUID(),
        },
        {
          unitPrice: 2,
          exchangeRateToPLN: 0,
          isManual: false,
          priceSourceName: 'priceSourceName',
          priceSourceURL: 'priceSourceURL',
          unitPriceCurrency: 'unitPriceCurrency',
          guid: getGUID(),
        },
      ],
    });
  }

  function onSubmit(): void {
    console.log('userSubmitted the form');
  }
  return (
    <div className='App'>
      <Form onSubmit={onSubmit}>
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
          <button onClick={onAddCurrency}>Add Currency</button>
        </fieldset>
      </Form>
    </div>
  );
}

export default App;
