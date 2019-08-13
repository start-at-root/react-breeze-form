import {FormProps} from 'react-hook-form/dist/types';
import {InputType} from 'reactstrap/lib/Input';

export interface SelectSelectionInterface {
  value: string;
  label: string;
}

export interface FormHeader {
  id: string;
  text: string;
  className?: string;
}

export interface FormConfig {
  name: string;
  type: string;
  col?: number;
  inputType?: InputType | string;
  addon?: {
    type: 'prepend' | 'append' | string;
    icon?: React.ReactNode;
    text?: string;
  };
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
  required?: boolean;
  className?: string;
  placeholder?: string;
  shape?: string;
  options?: SelectSelectionInterface[];
  inputs?: FormConfig[];
  header?: FormHeader;
  info?: string;
  pattern?: RegExp;
  validate?: any;
  isMulti?: boolean;
}

export interface DefaultInputProps
  extends Omit<Partial<FormProps>, 'formState'> {
  elementConfig: FormConfig;
  formState: FormProps['formState'] | unknown[] | unknown;
}
