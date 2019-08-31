import React, {useEffect, useState} from 'react';
import {Props as FormProps} from 'react-hook-form/dist/types';
import useForm from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Col, Form, Row} from 'reactstrap';

import {FormConfig, FormHeader, Hooks} from './interfaces/FormConfig';
import fetch from './utils/fetch';
import InputForm from './components/Input';
import SelectForm from './components/SingleSelect';
import SubmitBtn from './components/SubmitBtn';
import ToggleForm from './components/Toggle';

interface Props extends FormProps<any> {
  form: FormConfig[];
  csrfUrl?: string;
  getForm?: (formHooks: Hooks) => any;
  onSubmit: <T>(data: any, formHooks: Hooks) => Promise<T | void> | T | void;
  valid?: {[key: string]: any};
}

const dependencies = [
  {name: 'input', component: InputForm},
  {name: 'toggle', component: ToggleForm},
  {name: 'singleselect', component: SelectForm},
  {name: 'submitbtn', component: SubmitBtn},
];

/** Form generator */
export default ({
  csrfUrl,
  defaultValues,
  form,
  getForm,
  onSubmit,
  valid,
}: Props) => {
  const formHooks = useForm({defaultValues});
  const [csrf, setCsrf] = useState();
  const {t} = useTranslation();

  /**
   * Get csrf protection token, if required.
   */
  useEffect(() => {
    const setCsrfToken = async () => {
      const {csrf} = await fetch(csrfUrl);

      if (csrf) {
        setCsrf(csrf);
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
        valid={valid}
        formHooks={formHooks}
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
          !mapper.hasOwnProperty(input.type as string) ||
          typeof (mapper as any)[input.type as string] !== 'function'
        ) {
          return null;
        }

        return (
          <Col
            key={`bc-${name}-${input.type}-${i}`}
            md={input.col || 12 / elementConfig.inputs.length}>
            {(mapper as any)[input.type as string](input)}
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
      <Col md={12}>
        {(mapper as any)[elementConfig.type as string](elementConfig)}
      </Col>
    </Row>
  );

  /**
   * Render custom node as a form input.
   * @param elementConfig Component/element form configuration object.
   */
  const renderCustomNode = (elementConfig: FormConfig): React.ReactNode => (
    <React.Fragment key={elementConfig.name}>
      {elementConfig.type}
    </React.Fragment>
  );

  /**
   * Render form element based on passed form config.
   * @param elementConfig Form configuration object to render form element.
   */
  const renderElement = (elementConfig: FormConfig) => {
    if (
      typeof elementConfig.type === 'string' &&
      (!mapper.hasOwnProperty(elementConfig.type) ||
        typeof (mapper as any)[elementConfig.type] !== 'function')
    ) {
      return null;
    }

    const nodes = [];

    if (elementConfig.header) {
      nodes.push(renderHeader(elementConfig.header));
    }

    if (typeof elementConfig.type === 'string' && !elementConfig.inputs) {
      nodes.push(renderInput(elementConfig));
    } else if (elementConfig.inputs) {
      nodes.push(renderMultipleInputs(elementConfig));
    } else {
      nodes.push(renderCustomNode(elementConfig));
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

    return onSubmit(data, formHooks);
  };

  if (typeof getForm === 'function') {
    getForm({...formHooks, csrf});
  }

  return (
    <Form onSubmit={formHooks.handleSubmit(submitWrapper)}>
      {form.map((elementConfig) => renderElement(elementConfig))}
    </Form>
  );
};
