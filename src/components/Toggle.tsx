import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Input, Label} from 'reactstrap';

import {DefaultInputProps} from '../interfaces/FormConfig';

/** Toggle button */
export default ({elementConfig, formHooks}: DefaultInputProps) => {
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
  const {register, watch} = formHooks;
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
          onClick={(e) => {
            if (elementConfig.onClick) {
              elementConfig.onClick(e, formHooks);
            }
          }}
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
