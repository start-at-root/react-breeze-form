import React from 'react';
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
import {InputType} from 'reactstrap/lib/Input';

import {DefaultInputProps, FormConfig} from '../interfaces/FormConfig';

/** Input field */
export default ({elementConfig, formHooks, valid}: DefaultInputProps) => {
  const {t} = useTranslation();
  const {errors, formState, getValues, register, triggerValidation} = formHooks;
  const values = getValues();

  const {addon, className, inputType, name, placeholder} = elementConfig;

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

  const {touched} = formState;

  return (
    <FormGroup className="rbf-group">
      <InputGroup className={`${className || ''}`}>
        {addon && (
          <InputGroupAddon addonType={addon.type as 'prepend' | 'append'}>
            <InputGroupText>
              {addon.icon && <>{addon.icon}</>}{' '}
              {addon.text && <>{t(addon.text)}</>}
            </InputGroupText>
          </InputGroupAddon>
        )}
        <Input
          type={inputType as InputType}
          name={name}
          innerRef={register({...getInputRegisters(elementConfig)})}
          valid={
            valid
              ? !!valid[name]
              : !errors[name] && !!(values[name] ? values[name].trim() : false)
          }
          invalid={!!errors[name]}
          placeholder={t(placeholder)}
          onBlur={(e) => {
            triggerValidation([{name}]);
            if (elementConfig.onBlur) {
              elementConfig.onBlur(e, formHooks);
            }
          }}
          onKeyUp={(e) => {
            if (elementConfig.onKeyUp) {
              elementConfig.onKeyUp(e, formHooks);
            }
          }}
          onFocus={(e) => {
            if (elementConfig.onFocus) {
              elementConfig.onFocus(e, formHooks);
            }
          }}
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
            className={`rbf-feedback ${!!errors[name] ? 'rbf-invalid' : ''}`}>
            <span>{t(errors[name].message)}</span>
          </FormFeedback>
        )}
      </InputGroup>
    </FormGroup>
  );
};
