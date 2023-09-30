import './Input.css';

export interface InputProps {
  onChange(value: string): void;
  value: string;
  label?: string;
  id: string;
  maxLength?: number;
  type?: string;
}

export function Input(props: InputProps): JSX.Element {
  return (
    <div className={'field field--input'}>
      {props.label ? <label htmlFor={props.id}>{props.label}</label> : null}
      <input
        type={props.type ? props.type : 'text'}
        value={props.value}
        name={props.id}
        id={props.id}
        maxLength={props.maxLength}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}