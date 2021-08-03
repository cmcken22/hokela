import React from 'react';
import { Map } from 'immutable';

import { Row, Col } from 'Components/Grid';
import Card from 'Components/Card';
import Button from 'Components/Button';

const filterLatestCauses = (latestCauses) => {
  let count = 0;
  let nextCauses = new Map({});
  if (!latestCauses || latestCauses.size === 0) return nextCauses;
  latestCauses.entrySeq().forEach(([id, cause]) => {
    const { organization, image_link: imageLink } = cause.toJS();
    if (organization !== "Hokela Technologies" && !!imageLink && count < 3) {
      nextCauses = nextCauses.set(id, cause);
      count++;
    }
  });
  return nextCauses;
}

const LatestCauses = ({ causes, openCause, browseAllCauses }) => {
  const latestCauses = causes && filterLatestCauses(causes);

  return (
    <>
      <Row>
        {latestCauses && latestCauses.entrySeq().map(([id, cause], index) => {
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
            onClick={() => browseAllCauses()}
            caseSensitive
            style={{
              width: '100%',
              marginTop: '62px'
            }}
          >
            Browse all causes
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default LatestCauses;