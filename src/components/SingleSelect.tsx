import React, {useEffect, useState} from 'react';
import {FormProps} from 'react-hook-form/dist/types';
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

/** Render a generic single select input */
export default ({elementConfig, formState, register, setValue}: Props) => {
  const {
    className,
    isMulti,
    name,
    options,
    placeholder,
    required,
  } = elementConfig;
  const {touched} = formState as FormProps['formState'];
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

  return (
    <FormGroup className="rbf-group">
      <Select
        className={className}
        onChange={handleChange}
        placeholder={t(placeholder) || t('common:select')}
        options={translateLabels(options as SelectSelectionInterface[])}
        value={translateLabels(values.selectedOption)}
        isMulti={isMulti || false}
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
