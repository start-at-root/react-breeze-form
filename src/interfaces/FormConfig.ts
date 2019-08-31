import {FormProps, RegisterInput} from 'react-hook-form/dist/types';
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

export interface FormConfig extends RegisterInput {
  name: string;
  type: string | React.ReactNode;
  col?: number;
  inputType?: InputType | string;
  addon?: {
    type: 'prepend' | 'append' | string;
    icon?: React.ReactNode;
    text?: string;
  };
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
  color?: string;
  block?: boolean;
  disabled?: boolean;
  onKeyUp?: (
    e: React.FormEvent<HTMLInputElement>,
    formHooks: Hooks,
  ) => Promise<void> | void;
  onBlur?: (
    e: React.FormEvent<HTMLInputElement> | React.FocusEvent<HTMLElement>,
    formHooks: Hooks,
  ) => Promise<void> | void;
  onFocus?: (
    e: React.FormEvent<HTMLInputElement> | React.FocusEvent<HTMLElement>,
    formHooks: Hooks,
  ) => Promise<void> | void;
  onClick?: (
    e: React.FormEvent<HTMLInputElement>,
    formHooks: Hooks,
  ) => Promise<void> | void;
}

export interface Hooks extends Omit<Partial<FormProps>, 'formState'> {
  formState: FormProps['formState'] | unknown[] | unknown;
  csrf?: string;
}

export interface DefaultInputProps {
  formHooks: Hooks;
  elementConfig: FormConfig;
  valid?: {[key: string]: any};
}

export interface FormHooks extends Omit<DefaultInputProps, 'elementConfig'> {
  csrf?: string;
}
