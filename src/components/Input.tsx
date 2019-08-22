import React from 'react';
import {FormProps} from 'react-hook-form/dist/types';
import {useTranslation} from 'react-i18next';
import {
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from 'reactstrap';

import {DefaultInputProps, FormConfig} from '../interfaces/FormConfig';

/** Input field */
export default ({
  elementConfig,
  errors,
  formState,
  getValues,
  register,
  triggerValidation,
  valid,
}: DefaultInputProps) => {
  const {t} = useTranslation();
  const values = getValues();

  const {addon, className, name, placeholder} = elementConfig;

  const getInputRegisters = (
    elementConfig: FormConfig,
  ): {[key: string]: any} => {
    const allowed = [
      'required',
      'maxLength',
      'minLength',
      'max',
      'min',
      'pattern',
      'validate',
    ];

    return Object.keys(elementConfig)
      .filter((key) => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = elementConfig[key];

        return obj;
      }, {});
  };

  const {touched} = formState as FormProps['formState'];

  return (
    <FormGroup className="rbf-group">
      <InputGroup className={`${className || ''}`}>
        {addon && (
          <InputGroupAddon addonType={addon.type as 'prepend' | 'append'}>
            <InputGroupText>
              {addon.icon && <>{addon.icon}</>}{' '}
              {addon.text && <>{addon.text}</>}
            </InputGroupText>
          </InputGroupAddon>
        )}
        <Input
          name={name}
          innerRef={register({...getInputRegisters(elementConfig)})}
          valid={
            valid
              ? !!valid[name]
              : !errors[name] && !!(values[name] ? values[name].trim() : false)
          }
          invalid={!!errors[name]}
          placeholder={t(placeholder)}
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
        {errors[name] && (
          <FormFeedback
            className={`rfb-feedback ${!!errors[name] ? 'rfb-invalid' : ''}`}>
            <span>{errors[name].message}</span>
          </FormFeedback>
        )}
      </InputGroup>
    </FormGroup>
  );
};
