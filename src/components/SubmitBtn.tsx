import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Col, Row} from 'reactstrap';

import {FormConfig} from '../interfaces/FormConfig';

interface Props {
  elementConfig: FormConfig;
}

/** Submit button */
export default (props: Props) => {
  const {
    elementConfig: {className, col, placeholder},
  } = props;
  const {t} = useTranslation();

  return (
    <Row className="justify-content-center">
      <Col md={col || 6}>
        <Button className={`${className} gradient mt-4`} type="submit" block>
          {t(placeholder)}
        </Button>
      </Col>
    </Row>
  );
};
