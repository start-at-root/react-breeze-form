import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Col, Row} from 'reactstrap';

import {DefaultInputProps} from '../interfaces/FormConfig';

/** Submit button */
export default (props: DefaultInputProps) => {
  const {
    elementConfig: {block, className, col, color, disabled, placeholder},
  } = props;
  const {t} = useTranslation();

  return (
    <Row className="justify-content-center">
      <Col md={col || 6}>
        <Button
          className={`${className} gradient mt-4`}
          type="submit"
          block={block || false}
          color={color || 'secondary'}
          disabled={disabled || false}>
          {t(placeholder)}
        </Button>
      </Col>
    </Row>
  );
};
