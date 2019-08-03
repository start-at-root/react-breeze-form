import * as React from 'react';
import {FormProps} from 'react-hook-form/dist/types';
import {useTranslation} from 'react-i18next';
import {Input, Label} from 'reactstrap';

import {FormConfig} from '../interfaces/FormConfig';

// import './Toggle.scss';

interface Props {
  elementConfig: FormConfig;
  register: FormProps['register'];
  triggerValidation: FormProps['triggerValidation'];
  touched: string[] | unknown;
  values: any;
  watch: FormProps['watch'];
}

/** Toggle button */
export default (props: Props) => {
  const {
    elementConfig: {
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
    },
    register,
    watch,
  } = props;
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
