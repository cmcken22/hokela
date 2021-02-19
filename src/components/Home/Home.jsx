import React, { Component } from 'react'
import { Row, Col } from '../Grid';

import Hero from '../Hero';
import Card from '../Card';
import Section from '../Section';
import Button from '../Button';
import Footer from '../Footer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.hokelaIconLink = "https://static.wixstatic.com/media/52f6ee_51619d63cc534115b41aa20c749e4564~mv2_d_1835_1843_s_2.png/v1/crop/x_0,y_4,w_1835,h_1835/fill/w_146,h_144,al_c,q_85,usm_0.66_1.00_0.01/Original%20on%20Transparent_edited.webp";
    this.state = {
      latestCauses: [
        {
          title: "Breakfast Drop-in Assistant",
          company: "St. John the Compassionate Mission",
          location: "Toronto, ON",
          imageLink: 'https://lh3.google.com/u/0/d/1j3n2XcdmiOeYJN3TjFc4CPQl7DPwr5aG=w1974-h1800-iv1'
        },
        {
          title: "Sewing for Paws",
          company: "Toronto Humane Society",
          location: "Remote",
          imageLink: 'https://lh3.google.com/u/0/d/1pEbWz5CywxJilXsRuZ9mLRni7sebnwgy=w1974-h1800-iv1'
        },
        {
          title: "Volunteer Driver",
          company: "Meals on Wheels",
          location: "Toronto, ON",
          imageLink: 'https://lh3.google.com/u/0/d/19htasegyKy_nbuC0Nln4rttldHDkVITF=w1974-h1800-iv1'
        },
      ],
      positions: [
        {
          title: "Fundraising Coordinator",
          company: "Hokela Technologies",
          location: "Remote",
          imageLink: 'https://lh3.google.com/u/0/d/19htasegyKy_nbuC0Nln4rttldHDkVITF=w1974-h1800-iv1'
        },
        {
          title: "Outreach Coordinator",
          company: "Hokela Technologies",
          location: "Remote",
          imageLink: 'https://lh3.google.com/u/0/d/1_YnXEDeHFJiuo8QvxFJo8Nb-hN53p6lE=w1974-h1800-iv1'
        },
        {
          title: "Social Media Coordinator",
          company: "Hokela Technologies",
          location: "Remote",
          imageLink: 'https://lh3.google.com/u/0/d/1QNif8euCYSlldY8Wc9iN5m4nYSO8bUoN=w1974-h1800-iv1'
        },
      ],
    }
  }
  
  renderLatestCauses = () => {
    const { latestCauses } = this.state;
    return (
      <>
        <Row>
          {latestCauses && latestCauses.map(cause =>
            <Col span={4}>
              <Card {...cause} />
            </Col>
          )}
        </Row>
        <Row>
          <Col span={3} offset={9}>
            <Button
              caseSensitive
              secondary
              style={{
                width: '100%',
                marginTop: '52px'
              }}
            >
              Browse all causes
            </Button>
          </Col>
        </Row>
      </>
    );
  }

  renderVolunteerWithUs = () => {
    const { positions } = this.state;
    return (
      <>
        <Row>
          {positions && positions.map(cause =>
            <Col span={4}>
              <Card {...cause} dark />
            </Col>
          )}
        </Row>
        <Row>
          <Col span={3} offset={9}>
            <Button
              caseSensitive
              secondary
              style={{
                width: '100%',
                marginTop: '52px'
              }}
            >
              Browse all causes
            </Button>
          </Col>
        </Row>
      </>
    );
  }

  renderInfoSection = () => {
    return (
      <Row>
        <Col span={8}>
          <div className="home__volunteer-image" />
        </Col>
        <Col span={4}>
          <div className="home__volunteer-info">
            <p>We understand that finding the ideal volunteer candidate isn’t always easy.</p>
            <p>So, let us help with that.</p>
            <p>
              Our platform enables volunteer recruiters to increase their program 
              visibility for free and maximize their volunteer candidate pool.
            </p>
            <Button
              caseSensitive
              style={{
                marginTop: '50px'
              }}
            >
              Learn more
            </Button>
          </div>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <div className="home">
        <Hero />
        <Section
          title="Latest Causes"
          content={this.renderLatestCauses}
        />
        <Section
          title="Volunteer With Us"
          content={this.renderVolunteerWithUs}
          icon={this.hokelaIconLink}
          dark
        />
        <Section
          title="Do You Need Volunteers?"
          content={this.renderInfoSection}
        />
        <Footer />
      </div>
    );
  }
}

export default Home;
