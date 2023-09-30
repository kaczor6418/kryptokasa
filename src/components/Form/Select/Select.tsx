import './Select.css';

export interface SelectProps {
  onChange(value: string): void;
  value: string;
  label: string;
  id: string;
  options: [string | number, string][];
}

export function Select(props: SelectProps) {
  return (
    <div className={'field field--select'}>
      <label htmlFor={props.id}>{props.label}</label>
      <select
        name={props.id}
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {props.options.map((item) => (
          <option
            value={item[0]}
            key={item[0]}
          >
            {item[1]}
          </option>
        ))}
      </select>
    </div>
  );
}
