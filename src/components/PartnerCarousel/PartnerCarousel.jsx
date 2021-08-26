import React, { Component } from 'react'
import cx from 'classnames';
import InfiniteCarousel from 'react-leaf-carousel';

const ANIMATION_DURATION = 4000;

class PartnerCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: [
        {
          id: "toronto-humane-society",
          link: "https://storage.googleapis.com/hokela-bucket/icons/toronto-humane-society.png"
        },
        {
          id: "seilo",
          link: "https://storage.googleapis.com/hokela-bucket/icons/seilo.png"
        },
        {
          id: "cirlce-of-care",
          link: "https://storage.googleapis.com/hokela-bucket/icons/cirlce-of-care.png"
        },
        {
          id: "habitat-for-humanity",
          link: "https://storage.googleapis.com/hokela-bucket/icons/habitat-for-humanity.png"
        },
        {
          id: "frontier-college",
          link: "https://storage.googleapis.com/hokela-bucket/icons/frontier-college.png"
        },
        {
          id: "ottawa-childrens-choir",
          link: "https://storage.googleapis.com/hokela-bucket/icons/ottawa-childrens-choir.png"
        }
      ]
    };
  }

  createRef = (id, ref) => {
    if (id === 'habitat-for-humanity') {
      console.clear();
      console.log('ref:', ref);
      
      setTimeout(() => {
        ref.parentElement.style.width = '100px !important';
        ref.parentElement.style.backgroundColor = 'red !important';
        console.log('ref:', ref.parentElement);
      }, 1000);
    }
  }

  render() {
    const { partners } = this.state;

    return (
      <div className="partner-carousel">
        <InfiniteCarousel
          dots={false}
          arrows={false}
          showSides={false}
          sidesOpacity={1}
          slidesToScroll={1}
          slidesToShow={4}
          slidesSpacing={16}
          autoCycle
          cycleInterval={ANIMATION_DURATION}
        >
          {partners && partners.map(icon => {
            const { id, link } = icon;
            return (
              <img
                // ref={(r) => this.createRef(id, r)}
                src={link}
              />
            );
          })}
        </InfiniteCarousel>
      </div>
    );
  }
}

PartnerCarousel.constants = {
  en: {
    labels: {}
  }
};

export default PartnerCarousel;
