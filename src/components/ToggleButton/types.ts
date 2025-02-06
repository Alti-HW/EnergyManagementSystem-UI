export interface Option {
  label: string;
  value: string;
}

export interface ToggleButtonProps {
  onChange: (active: string) => void;
  options: Option[];
  btnWidth?: string;
  variant?: string;
  value?: string;
}
