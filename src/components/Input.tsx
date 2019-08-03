import React from 'react';
import {FormProps} from 'react-hook-form/dist/types';
import {useTranslation} from 'react-i18next';
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from 'reactstrap';

import {FormConfig} from '../interfaces/Forms';

interface Props {
  elementConfig: FormConfig;
  register: FormProps['register'];
  triggerValidation: FormProps['triggerValidation'];
  touched: string[] | unknown;
  values: any;
}

/** Input field */
export default (props: Props) => {
  const {elementConfig, register, triggerValidation, touched, values} = props;
  const {t} = useTranslation();

  const {
    addon,
    className,
    max,
    maxLength,
    min,
    minLength,
    name,
    pattern,
    placeholder,
    required,
    validate,
  } = elementConfig;

  return (
    <FormGroup className="rbf-group">
      <InputGroup>
        {addon && (
          <InputGroupAddon addonType={addon.type}>
            <InputGroupText>{addon.icon && <>{addon.icon}</>}</InputGroupText>
          </InputGroupAddon>
        )}
        <Input
          name={name}
          innerRef={register({
            required,
            maxLength,
            minLength,
            max,
            min,
            pattern,
            validate,
          })}
          placeholder={t(placeholder)}
          className={`${className || ''}`}
          onBlur={() => triggerValidation([{name}])}
        />
        <Label
          for={name}
          sm={6}
          className={`rbf-label-index ${
            addon && addon.type === 'prepend' ? 'rbf-m-40' : ''
          }`}
          visible={`${!!values[name]}`}
          touched={`${(touched as string[]).includes(name)}`}>
          <span>{t(placeholder)}</span>
        </Label>
      </InputGroup>
    </FormGroup>
  );
};
