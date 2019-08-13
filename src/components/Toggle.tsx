import * as React from 'react';
import {FormProps} from 'react-hook-form/dist/types';
import {useTranslation} from 'react-i18next';
import {Input, Label} from 'reactstrap';

import {FormConfig} from '../interfaces/FormConfig';

interface Props extends Omit<Partial<FormProps>, 'formState'> {
  elementConfig: FormConfig;
  formState: FormProps['formState'] | unknown[] | unknown;
}

/** Toggle button */
export default ({elementConfig, register, watch}: Props) => {
  const {
    className,
    name,
    shape,
    required,
    maxLength,
    minLength,
    max,
    min,
    pattern,
    validate,
    placeholder,
  } = elementConfig;
  const {t} = useTranslation();
  const isToggled = watch(name);

  return (
    <>
      <div className="rbf-toggle-placeholder">{t(placeholder)}</div>
      <Label className={`rbf-switch ${className ? className : ''}`}>
        <Input
          type="checkbox"
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
        />
        <span className={`rbf-slider ${shape ? shape : 'round'}`}>
          <span
            className={['rbf-slider-label', isToggled ? 'on' : 'off'].join(
              ' ',
            )}>
            {isToggled ? t('common:yes') : t('common:no')}
          </span>
        </span>
      </Label>
    </>
  );
};
