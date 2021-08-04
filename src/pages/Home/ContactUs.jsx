import React from 'react';
import { Row, Col } from 'Components/Grid';
import ContactUsForm from 'Forms/ContactUsForm';

const ContactUs = () => {
  const { en: { labels } } = ContactUs.constants;
  return (
    <Row>
      <Col span={5}>
        <div className="home__volunteer-info home__volunteer-info--dark home__volunteer-info--contact-us">
          <p>{labels.message}</p>
          <div className="home__contact-us-image" />
        </div>
      </Col>
      <Col span={6} offset={1}>
        <ContactUsForm />
      </Col>
    </Row>
  );
};

ContactUs.constants = {
  en: {
    labels: {
      message: "Feel like contacting us? Send us a mesage here and we will get back to you as soon as possible.",
    }
  }
};

export default ContactUs;