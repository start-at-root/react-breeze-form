import React, { useEffect, useState } from 'react';
import { FormProps } from 'react-hook-form/dist/types';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { FormGroup, Label } from 'reactstrap';

import { FormConfig } from '../interfaces/Forms';

// import '../Form.scss';
// import './SingleSelect.scss';

export interface SelectSelectionInterface {
  value: string;
  label: string;
}

type Options = SelectSelectionInterface[];

interface Props {
  options?: Options;
  elementConfig: FormConfig;
  register: FormProps['register'];
  triggerValidation: FormProps['triggerValidation'];
  setValue: FormProps['setValue'];
  touched: string[] | unknown;
  values: any;
}

/** Render a generic single select input */
export default (props: Props) => {
  const {
    elementConfig: { className, isMulti, name, options, placeholder, required },
    register,
    touched,
    setValue,
  } = props;
  const { t } = useTranslation();

  const [values, setReactSelectValue] = useState({ selectedOption: [] } as any);

  /**
   * Handle select change.
   * @param selectedOption Selected option(s)
   */
  const handleChange = (selectedOption: SelectSelectionInterface[]): void => {
    setValue(name, selectedOption);
    setReactSelectValue({ selectedOption: [selectedOption] });
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
    register({ name, required });
  }, [name, register, required]);

  return (
    <FormGroup className="d-group">
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
        className="f-label-index"
        visible={`${values.selectedOption.length > 0}`}
        touched={`${(touched as string[]).includes(name)}`}>
        <span>{t(placeholder)}</span>
      </Label>
    </FormGroup>
  );
};
