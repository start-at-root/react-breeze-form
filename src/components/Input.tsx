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

import {FormConfig} from '../interfaces/FormConfig';

interface Props extends Omit<Partial<FormProps>, 'formState'> {
  elementConfig: FormConfig;
  formState: FormProps['formState'] | unknown[] | unknown;
}

/** Input field */
export default ({
  elementConfig,
  errors,
  formState,
  getValues,
  register,
  triggerValidation,
}: Props) => {
  const {t} = useTranslation();
  const values = getValues();

  const {addon, className, name, placeholder} = elementConfig;

  const {touched} = formState as FormProps['formState'];

  return (
    <FormGroup className="rbf-group">
      <InputGroup>
        {addon && (
          <InputGroupAddon addonType={addon.type as 'prepend' | 'append'}>
            <InputGroupText>{addon.icon && <>{addon.icon}</>}</InputGroupText>
          </InputGroupAddon>
        )}
        <Input
          name={name}
          innerRef={register({...elementConfig})}
          invalid={!!errors[name]}
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
          touched={`${(touched as any).includes(name)}`}>
          <span>{t(placeholder)}</span>
        </Label>
      </InputGroup>
    </FormGroup>
  );
};
