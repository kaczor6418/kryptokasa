import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { FormSubmit } from '@/components/Form/FormSubmit';
import { FormReset } from '@/components/Form/FormReset';

export interface FormProps {
  children: React.ReactElement[];
  onSubmit(): void;
  onReset(): void;
}
export interface FormErrorStatusChange {
  path: string;
  error: string;
  isValid: boolean;
}

type CallbackFunction = (...args: any[]) => void;

export interface IFormContext {
  isValid: boolean;
  isSubmitted: boolean;
  submit: () => void;
  reset: () => void;
  onValidationChanged: (error: FormErrorStatusChange) => void;
}

export const CustomFormContext = createContext<IFormContext | null>(null);

let errors: FormErrorStatusChange[] = [];

export function Form({ children, onSubmit, onReset }: FormProps): JSX.Element {
  const [validationIssues, setValidationIssues] = useState<FormErrorStatusChange[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const onChangeSubmit = useCallback(() => {
    setIsSubmitted(true);
    if (isValid) {
      onSubmit();
    }
  }, [isValid, onSubmit]);
  const onResetCallback = useCallback(() => {
    setIsSubmitted(false);
    onReset();
  }, [isSubmitted, onReset]);
  const onChangeValid = useCallback(
    (error: FormErrorStatusChange) => {
      let newValidationIssues = errors.filter((issue) => issue.path !== error.path);
      if (!error.isValid) {
        newValidationIssues = [...newValidationIssues, error];
      }
      errors = newValidationIssues;
      setValidationIssues(newValidationIssues);
    },
    [validationIssues]
  );

  useEffect(() => {
    setIsValid(validationIssues.length === 0);
  }, [validationIssues]);

  const value = useMemo<IFormContext>(() => {
    return {
      isValid: isValid,
      isSubmitted: isSubmitted,
      onValidationChanged: onChangeValid,
      submit: onChangeSubmit,
      reset: onResetCallback,
    };
  }, [onSubmit, isValid, isSubmitted]);

  return (
    <CustomFormContext.Provider value={value}>
      <form className={'form'}>
        {children}
        <div className={'form-errors'}>
          {isSubmitted && validationIssues.map((issue) => <p key={issue.path}>{issue.error}</p>)}
        </div>
        <div className={'form--footer'}>
          <FormReset label={'Wyczyść'} />
          <FormSubmit label={'Wygeneruj'} />
        </div>
      </form>
    </CustomFormContext.Provider>
  );
}
