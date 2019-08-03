import {InputType} from 'reactstrap/lib/Input';

export interface SelectSelectionInterface {
  value: string;
  label: string;
}

export interface FormHeader {
  text: string;
  className?: string;
}

export interface FormConfig {
  name: string;
  type: string;
  col?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '9' | '10' | '11' | '12';
  inputType?: InputType;
  translation?: string;
  addon?: {
    type: 'prepend' | 'append';
    icon?: React.ReactNode;
    text?: string;
  };
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
  required?: boolean;
  className?: string;
  placeholder: string;
  shape?: string;
  options?: SelectSelectionInterface[];
  inputs?: FormConfig[];
  header?: FormHeader;
  info?: string;
  pattern?: RegExp;
  validate?: any;
  isMulti?: boolean;
}
