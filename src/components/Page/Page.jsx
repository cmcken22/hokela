import React from 'react';
import cx from 'classnames';

import { Row, Col } from 'Components/Grid';
import BreadCrumbs from 'Components/BreadCrumbs';
import Footer from 'Components/Footer';

function Header({ title, breadCrums }) {
  return (
    <Section className="page__section--less-padding">
      <div className="page__header">
        {breadCrums && breadCrums.length && (
          <BreadCrumbs crumbs={breadCrums} />
        )}
        {title && (
          <Row>
            <Col span={12}>
              <h1>{title}</h1>
            </Col>
          </Row>
        )}
      </div>
    </Section>
  );
}

function Section({ title, dark, darkGradient, icon, className, first, children }) {

  const renderIcon = () => {
    if (!!icon) return renderDisplayIcon();
    return renderLine();
  }

  const renderDisplayIcon = () => {
    return (
      <div className="page__section-icon">
        <img src={icon} />
      </div>
    );
  }

  const renderLine = () => {
    return (
      <div className="page__section-line" />
    );
  }

  return (
    <div className={cx("page__section", {
      "page__section--dark": dark,
      "page__section--dark-gradient": darkGradient,
      "page__section--first": first,
      [className]: !!className
    })}>
      <div className="page__content">
        {title && (
          <Row gutter={[20, 16]}>
            <Col span={24}>
              <div className="page__section-header">
                <h2>{title}</h2>
                {renderIcon()}
              </div>
            </Col>
          </Row>
        )}
        {React.Children.only(
          children
        )}
      </div>
    </div>
  );
}

function Page({ className, hideFooter, children }) {
  return (
    <div className={cx("page", {
      [className]: !!className,
      "page--hide-footer": hideFooter
    })}>
      {children}
      {!hideFooter && (
        <Footer />
      )}
    </div>
  );
}

Page.Section = Section;
Page.Header = Header;

export default Page;
