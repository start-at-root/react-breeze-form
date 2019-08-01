import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Col, Form, Row } from 'reactstrap';

import { FormConfig } from './interfaces/Forms';
import fetch from './utils/fetch';
import InputForm from './Form/Input';
import SelectForm from './Form/SingleSelect';
import SubmitBtn from './Form/SubmitBtn';
import ToggleForm from './Form/Toggle';

interface Props {
  form: FormConfig[];
  defaultValues?: {
    [key: string]: any;
  };
  csrfUrl?: string;
}

/** Form generator */
export default ({ csrfUrl, defaultValues, form }: Props) => {
  const {
    formState: { touched },
    getValues,
    register,
    setValue,
    triggerValidation,
    watch,
  } = useForm({ defaultValues });

  const [csrf, setCsrf] = useState();
  const { t } = useTranslation();

  const values = getValues();

  useEffect(() => {
    const setCsrfToken = async () => {
      const { token } = await fetch(csrfUrl);

      if (token && token.csrf) {
        setCsrf(token.csrf);
      }
    };

    try {
      setCsrfToken();
    } catch (e) { }
  }, [csrfUrl]);

  const elementProps = {
    register,
    setValue,
    touched,
    triggerValidation,
    values,
    watch,
  };

  const mapper = {
    input: (elementConfig: FormConfig) => (
      <InputForm
        key={`if-${elementConfig.name}-${elementConfig.type}`}
        elementConfig={elementConfig}
        {...elementProps}
      />
    ),
    toggle: (elementConfig: FormConfig) => (
      <ToggleForm
        key={`tf-${elementConfig.name}-${elementConfig.type}`}
        elementConfig={elementConfig}
        {...elementProps}
      />
    ),
    singleselect: (elementConfig: FormConfig) => (
      <SelectForm
        key={`ss-${elementConfig.name}-${elementConfig.type}`}
        elementConfig={elementConfig}
        {...elementProps}
      />
    ),
    submitbtn: (elementConfig: FormConfig) => (
      <SubmitBtn
        key={`sb-${elementConfig.name}-${elementConfig.type}`}
        elementConfig={elementConfig}
        {...elementProps}
      />
    ),
  };

  /**
   * Render form element based on passed form config.
   * @param elementConfig Form configuration object to render form element.
   */
  const renderElement = (elementConfig: FormConfig) => {
    const { name, type, inputs } = elementConfig;

    if (
      !mapper.hasOwnProperty(type) ||
      typeof (mapper as any)[type] !== 'function'
    ) {
      return null;
    }

    const nodes = [];

    if (elementConfig.header) {
      nodes.push(
        <Row key={`h-${name}-${type}`}>
          <Col md={12}>
            <h6 className={elementConfig.header.className || ''}>
              {t(elementConfig.header.text || '')}
            </h6>
          </Col>
        </Row>,
      );
    }

    if (inputs) {
      nodes.push(
        <Row key={`r-${name}-${type}`}>
          {inputs.map((input, i) => {
            if (
              !mapper.hasOwnProperty(input.type) ||
              typeof (mapper as any)[input.type] !== 'function'
            ) {
              return null;
            }

            return (
              <Col
                key={`c-${name}-${input.type}-${i}`}
                md={input.col || 12 / inputs.length}>
                {(mapper as any)[input.type](input)}
              </Col>
            );
          })}
        </Row>,
      );
    } else {
      nodes.push(
        <Row key={`r-${name}-${type}`}>
          <Col md={12}>{(mapper as any)[type](elementConfig)}</Col>
        </Row>,
      );
    }

    return (
      <React.Fragment key={`rf-${name}-${type}`}>
        {nodes.map((node) => node)}
      </React.Fragment>
    );
  };

  const onSubmit = (data: any) => {
    data.csrf = csrf;
    console.log(data);
  };

  return (
    <Form onSubmit={onSubmit}>
      {form.map((elementConfig) => renderElement(elementConfig))}
    </Form>
  );
};
