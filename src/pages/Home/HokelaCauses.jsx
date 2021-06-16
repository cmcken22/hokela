import React from 'react';
import { Map } from 'immutable';

import { Row, Col } from 'Components/Grid';
import Card from 'Components/Card';
import Button from 'Components/Button';

const filterHokelaCauses = (hokelaCauses) => {
  let nextCauses = new Map({});
  if (!hokelaCauses || hokelaCauses.size === 0) return nextCauses;
  hokelaCauses.entrySeq().forEach(([id, cause]) => {
    const { image_link: imageLink } = cause.toJS();
    if (!!imageLink) {
      nextCauses = nextCauses.set(id, cause);
    }
  });
  return nextCauses;
}

const HokelaCauses = ({ causes, openCause, browseAllCauses }) => {
  const hokelaCauses = causes && filterHokelaCauses(causes);

  return (
    <>
      <Row>
        {hokelaCauses && hokelaCauses.entrySeq().map(([id, cause], index) => {
          if (index < 3) {
            return (
              <Col key={id} span={4}>
                <Card
                  {...cause.toJS()}
                  openCause={openCause}
                />
              </Col>
            );
          }
          return null;
        })}
      </Row>
      <Row>
        <Col span={3} offset={9}>
          <Button
            onClick={() => browseAllCauses(true)}
            caseSensitive
            style={{
              width: '100%',
              marginTop: '62px'
            }}
          >
            See more Hokela Causes
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default HokelaCauses;