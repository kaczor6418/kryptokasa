import { Select } from '@/components/Form/Select/Select';
import { Input } from '@/components/Form/Input/Input';
import { Report } from '@/type/Report';
import { useContext } from 'react';
import { CustomFormContext } from '@/components/Form/Form';

export interface GeneralInfoProps {
  report: Report;
  onChange(report: Report): void;
  taxOffices: [string | number, string][];
}

export function GeneralInfo(props: GeneralInfoProps) {
  const form = useContext(CustomFormContext);

  function onChangeReport(prop: keyof Report, value: unknown): void {
    props.onChange({ ...props.report, [prop]: value });
  }

  function onTaxInstitutionValidationChanged(isValid: boolean) {
    form?.onValidationChanged({
      isValid,
      path: 'taxInstitution',
      error: 'Pole "Nazwa organu egzekucyjnego" jest wymagane.',
    });
  }

  function onCaseNumberValidationChanged(isValid: boolean) {
    form?.onValidationChanged({ isValid, path: 'caseNumber', error: 'Pole "Numer sprawy" jest wymagane.' });
  }

  function onOwnerIdValidationChanged(isValid: boolean) {
    form?.onValidationChanged({
      isValid,
      path: 'ownerId',
      error: 'Pole "Dane identyfikujące właściciela kryptoaktywa" jest wymagane.',
    });
  }

  return (
    <fieldset>
      <legend>Ogólna informacja</legend>
      <Select
        value={props.report.taxInstitution}
        onChange={(value) => onChangeReport('taxInstitution', value)}
        options={props.taxOffices}
        label={'Nazwa organu egzekucyjnego'}
        onValidationChanged={onTaxInstitutionValidationChanged}
        required={true}
        id={'taxInstitution'}
      />

      <Input
        label={'Numer sprawy'}
        maxLength={100}
        id={'caseNumber'}
        value={props.report.caseNumber}
        required={true}
        onValidationChanged={onCaseNumberValidationChanged}
        onChange={(value) => onChangeReport('caseNumber', value)}
      />
      <Input
        label={'Dane identyfikujące właściciela kryptoaktywa'}
        maxLength={100}
        id={'ownerId'}
        required={true}
        value={props.report.ownerId}
        onValidationChanged={onOwnerIdValidationChanged}
        onChange={(value) => onChangeReport('ownerId', value)}
      />
    </fieldset>
  );
}
