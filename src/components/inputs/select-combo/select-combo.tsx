import style from './select-combo.module.scss';

export interface SelectComboProps {
  options: any[];
  value: string;
  className?: string;
  onChange: (value: string) => void;
}

export function SelectCombo({ className, options, value, onChange }: SelectComboProps) {
  return (
    <select className={`${style['select-combo']} ${className || ''}`} value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}