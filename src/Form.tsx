import React, {useEffect, useState} from 'react';
import useForm from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Col, Form, Row} from 'reactstrap';

import {FormConfig, FormHeader} from './interfaces/FormConfig';
import fetch from './utils/fetch';
import InputForm from './components/Input';
import SelectForm from './components/SingleSelect';
import SubmitBtn from './components/SubmitBtn';
import ToggleForm from './components/Toggle';

interface Props {
  form: FormConfig[];
  defaultValues?: {
    [key: string]: any;
  };
  csrfUrl?: string;
  onSubmit: <T>(...args: any) => Promise<T | void> | T | void;
}

const dependencies = [
  {name: 'input', component: InputForm},
  {name: 'toggle', component: ToggleForm},
  {name: 'singleselect', component: SelectForm},
  {name: 'submitbtn', component: SubmitBtn},
];

/** Form generator */
export default ({csrfUrl, defaultValues, form, onSubmit}: Props) => {
  const formHooks = useForm({defaultValues});
  const [csrf, setCsrf] = useState();
  const {t} = useTranslation();

  /**
   * Get csrf protection token, if required.
   */
  useEffect(() => {
    const setCsrfToken = async () => {
      const {token} = await fetch(csrfUrl);

      if (token && token.csrf) {
        setCsrf(token.csrf);
      }
    };

    if (csrfUrl) {
      try {
        setCsrfToken();
      } catch (e) {}
    }
  }, [csrfUrl]);

  const mapper = {};

  dependencies.forEach((dep) => {
    mapper[dep.name] = (elementConfig: FormConfig) => (
      <dep.component
        key={`${dep.name}-${elementConfig.name}-${elementConfig.type}`}
        elementConfig={elementConfig}
        {...formHooks}
      />
    );
  });

  /**
   * Render header.
   * @param header Header configuration object.
   */
  const renderHeader = (header: FormHeader): React.ReactNode => (
    <Row key={`${header.id}`}>
      <Col md={12}>
        <h6 className={header.className || ''}>{t(header.text || '')}</h6>
      </Col>
    </Row>
  );

  /**
   * Render multiple inputs.
   * @param elementConfig Component/element form configuration object.
   */
  const renderMultipleInputs = (elementConfig: FormConfig): React.ReactNode => (
    <Row key={`br-${elementConfig.name}-${elementConfig.type}`}>
      {elementConfig.inputs.map((input, i) => {
        if (
          !mapper.hasOwnProperty(input.type) ||
          typeof (mapper as any)[input.type] !== 'function'
        ) {
          return null;
        }

        return (
          <Col
            key={`bc-${name}-${input.type}-${i}`}
            md={input.col || 12 / elementConfig.inputs.length}>
            {(mapper as any)[input.type](input)}
          </Col>
        );
      })}
    </Row>
  );

  /**
   * Render single input.
   * @param elementConfig Component/element form configuration object.
   */
  const renderInput = (elementConfig: FormConfig): React.ReactNode => (
    <Row key={`br-${elementConfig.name}-${elementConfig.type}`}>
      <Col md={12}>{(mapper as any)[elementConfig.type](elementConfig)}</Col>
    </Row>
  );

  /**
   * Render form element based on passed form config.
   * @param elementConfig Form configuration object to render form element.
   */
  const renderElement = (elementConfig: FormConfig) => {
    if (
      !mapper.hasOwnProperty(elementConfig.type) ||
      typeof (mapper as any)[elementConfig.type] !== 'function'
    ) {
      return null;
    }

    const nodes = [];

    if (elementConfig.header) {
      nodes.push(renderHeader(elementConfig.header));
    }

    if (elementConfig.inputs) {
      nodes.push(renderMultipleInputs(elementConfig));
    } else {
      nodes.push(renderInput(elementConfig));
    }

    return (
      <React.Fragment key={`rf-${elementConfig.name}-${elementConfig.type}`}>
        {nodes.map((node) => node)}
      </React.Fragment>
    );
  };

  /**
   * On submit form action.
   * @param data Form data.
   */
  const submitWrapper = (data: any) => {
    if (csrfUrl && csrf) {
      data.csrf = csrf;
    }

    return onSubmit(data);
  };

  return (
    <Form onSubmit={formHooks.handleSubmit(submitWrapper)}>
      {form.map((elementConfig) => renderElement(elementConfig))}
    </Form>
  );
};
