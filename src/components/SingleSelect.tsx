import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Select from 'react-select';
import {FormGroup, Label} from 'reactstrap';

import {DefaultInputProps} from '../interfaces/FormConfig';

export interface SelectSelectionInterface {
  value: string;
  label: string;
}

type Options = SelectSelectionInterface[];

interface Props extends DefaultInputProps {
  options?: Options;
}

/** Generic single select input */
export default ({defaultValues, elementConfig, formHooks}: Props) => {
  const {
    className,
    isMulti,
    name,
    options,
    placeholder,
    required,
  } = elementConfig;
  const initialValue = defaultValues ? defaultValues[name] : undefined;
  const {formState, register, setValue} = formHooks;
  const {touched} = formState;
  const {t} = useTranslation();
  const [values, setReactSelectValue] = useState({selectedOption: []} as any);

  /**
   * Handle select change.
   * @param selectedOption Selected option(s)
   */
  const handleChange = (selectedOption: SelectSelectionInterface[]): void => {
    setValue(name, selectedOption);
    setReactSelectValue({selectedOption: [selectedOption]});
  };

  /**
   * Translate select options.
   * @param selectOptions Select options to translate.
   */
  const translateLabels = (
    selectOptions?: SelectSelectionInterface[],
  ): Options | undefined => {
    if (!selectOptions) {
      return undefined;
    }

    return selectOptions.map((option) => ({
      label: t(option.label),
      value: option.value,
    }));
  };

  /**
   * React's use effect.
   */
  useEffect(() => {
    register({name, required});
  }, [name, register, required]);

  /**
   * React's use effect.
   */
  useEffect(() => {
    if (initialValue) {
      setReactSelectValue({selectedOption: [initialValue]});
    }
  }, [initialValue]);

  return (
    <FormGroup className="rbf-group">
      <Select
        className={className}
        onChange={handleChange}
        placeholder={t(placeholder) || t('common:select')}
        options={translateLabels(options as SelectSelectionInterface[])}
        value={translateLabels(values.selectedOption)}
        isMulti={isMulti || false}
        onBlur={(e) => {
          if (elementConfig.onBlur) {
            elementConfig.onBlur(e, formHooks);
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
        className="rbf-label-index"
        visible={`${values.selectedOption.length > 0}`}
        touched={`${(touched as string[]).includes(name)}`}>
        <span>{t(placeholder)}</span>
      </Label>
    </FormGroup>
  );
};
