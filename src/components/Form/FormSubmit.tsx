import { MouseEvent, useContext } from 'react';
import { CustomFormContext } from '@/components/Form/Form';

export interface FormSubmitProps {
  label: string;
}

export function FormSubmit(props: FormSubmitProps) {
  const formContext = useContext(CustomFormContext);
  function onClick(e: MouseEvent) {
    e.preventDefault();
    if (formContext) {
      formContext.submit();
    }
  }
  return <button onClick={onClick}>{props.label}</button>;
}
