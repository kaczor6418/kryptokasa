import { useState } from 'react';
import './App.css';
import './components/Form.css';
import { Report } from './type/Report';
import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Select/Select';

if (!import.meta.env.VITE_NOELECTRON) {
  console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`);
}

function App() {
  const [report, setReport] = useState<Report>({
    caseNumber: '',
    taxInstitution: '',
    cryptoCurrencies: [],
    ownerId: '',
  });

  const [taxOffices, setTaxOffices] = useState<[string | number, string][]>([
    ['', '--'],
    ['Tax office 1', 'Tax office 1'],
    ['Tax office 2', 'Tax office 2'],
  ]);

  function onChangeReport(prop: keyof Report, value: unknown): void {
    setReport({ ...report, [prop]: value });
  }

  return (
    <div className='App'>
      <form className={'form'}>
        <fieldset>
          <legend>Ogólna informacja</legend>
          <Select
            value={report.taxInstitution}
            onChange={(value) => onChangeReport('taxInstitution', value)}
            options={taxOffices}
            label={'Nazwa organu egzekucyjnego'}
            id={'taxInstitution'}
          />

          <Input
            label={'Numer sprawy'}
            maxLength={100}
            id={'caseNumber'}
            value={report.caseNumber}
            onChange={(value) => onChangeReport('caseNumber', value)}
          />
          <Input
            label={'Dane identyfikujące właściciela kryptoaktywa'}
            maxLength={100}
            id={'ownerId'}
            value={report.ownerId}
            onChange={(value) => onChangeReport('ownerId', value)}
          />
        </fieldset>
        <fieldset>
          <legend>Kryptoaktywa</legend>
          <div>
            <p>ASDSAD</p>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default App;
