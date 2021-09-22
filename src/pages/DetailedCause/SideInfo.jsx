import React from 'react';
import { Tooltip } from 'antd';
import cx from 'classnames';
import { dateToString, convertDaysToDuration } from 'Utils/index';
import SectorIcon from 'Components/SectorIcon';
import TextWithTooltip from 'Components/TextWithTooltip';

const getLocations = (locations) => {
  let res = '';
  for (let i = 0; i < locations.length; i++) {
    const location = locations[i];
    const { city, province } = location;
    const string = `${city}${province ? `, ${province}` : ''}`;
    res += `${string}`;
    if (i !== locations.length - 1) res += '<br />';
  }

  return (
    <span dangerouslySetInnerHTML={{ __html: res }} />
  );
}

const formatLocations = (locations) => {
  if (!locations || !locations.length) return '';
  if (locations.length > 1) {
    return (
      <Tooltip placement="bottom" title={getLocations(locations)}>
        <p className="cause-card__location">Multiple Locations</p>
      </Tooltip>
    );
  }

  const [location] = locations;
  const { city, province } = location;
  const string = `${city}${province ? `, ${province}` : ''}`;

  return (
    <p className="cause-card__location">{string}</p>
  );
}

const RenderCell = ({ className, value, children } = {}) => {
  return (
    <div className="cell">
      <SectorIcon
        type={className}
        size={30}
      />
      {value && (
        <p>{value}</p>
      )}
      {children && children}
    </div>
  );
}

const openLink = (link) => {
  if (!link) return;
  if (link.indexOf('http') === -1) return window.open(`//${link}`, "_blank");
  return window.open(link, "_blank");
}

const openMailTo = (email) => {
  if (!email) return;
  return window.open(`mailto:${email}`, "_blank");
}

const SideInfo = ({ cause }) => {
  const contact = cause.get('contact');
  const formattedDate = dateToString(cause.get('created_date'));
  const location = formatLocations(cause.get('locations') && cause.get('locations').toJS());
  const area = cause.get('area');
  const otherSkills = cause && cause.get('other_skills');
  const idealFor = cause && cause.get('ideal_for');

  const renderOverview = () => {
    return (
      <div className="cause__section cause__section--small">
        <h4 className="title">Overview</h4>
        <div
          className="cause__section__icon cause__section__icon--centered"
          style={{
            backgroundImage: `url('${cause && cause.get('logo_link')}')`
          }}
        />
        <p>{cause && cause.get('organization')}</p>
        <hr className="divider" />
        <div className="table">
          <RenderCell className="location">
            {location}
          </RenderCell>
          <RenderCell
            className={cause && cause.get('sector')}
            value={cause && cause.get('sector')}
          />
          <RenderCell className="calendar">
            <p>{convertDaysToDuration(cause && cause.get('days'))}</p>
            <p>{cause && cause.get('hours')}</p>
          </RenderCell>
          <RenderCell
            className="clock"
            value={cause && cause.get('duration')}
          />
          <RenderCell
            className="ages"
            value={cause && cause.get('ages')}
          />
          <RenderCell
            className="posted"
            value={`Posted on: ${formattedDate}`}
          />
        </div>
      </div>
    );
  }

  const renderDevelopment = () => {
    return (
      <div className="cause__section cause__section--small">
        <h4 className="title">Development</h4>
        <div className="cause__section__icon-container">
          <SectorIcon
            type={area}
            size={70}
          />
          <p>{area}</p>
        </div>
        {(otherSkills && otherSkills.size) ? (
          <>
            <p>Other skills you'll develop</p>
            <hr className="divider" />
            <ul className="cause__section__list">
              {otherSkills && otherSkills.entrySeq().map(([, skill]) => (
                <li key={`skill--${skill}`}>{skill}</li>
              ))}
            </ul>
          </>
        ) : null}
        {(idealFor && idealFor.size) ? (
          <>
            <p>Suitable for</p>
            <hr className="divider" />
            <ul className="cause__section__list">
              {idealFor && idealFor.entrySeq().map(([, ideal]) => (
                <li key={`ideal--${ideal}`}>{ideal}</li>
              ))}
            </ul>
          </>
        ): null}
      </div>
    );
  }

  const renderContactInfo = () => {
    return (
      <div className="cause__section cause__section--small">
        <h4 className="title">Contact</h4>
        <hr className="divider" />
        <div className="cause__section__div-list">
          <div className="cause__section__div-list__item">
            <SectorIcon
              type="person"
              size={30}
            />
            <TextWithTooltip text={contact && contact.get('name')} />
          </div>
          <div className="cause__section__div-list__item cause__section__div-list__item--link">
            <SectorIcon
              type="email"
              size={30}
            />
            <TextWithTooltip
              text={contact && contact.get('email')}
              onClick={() => openMailTo(contact && contact.get('email'))}
            />
          </div>
          <div className="cause__section__div-list__item">
            <SectorIcon
              type="phone"
              size={30}
            />
            <TextWithTooltip text={contact && contact.get('phone')} />
          </div>
          <div className="cause__section__div-list__item">
            <SectorIcon
              type="location"
              size={30}
            />
            <TextWithTooltip text={contact && contact.get('address')} />
          </div>
          <div className="cause__section__div-list__item cause__section__div-list__item--link">
            <SectorIcon
              type="web"
              size={30}
            />
            <TextWithTooltip
              text={contact && contact.get('website')}
              onClick={() => openLink(contact && contact.get('website'))}
              // onClick={() => openLink("https://hokela.ca")}
            />
          </div>
        </div>
        {/* <ul className="cause__section__list cause__section__list--no-style">
          <li>
            <SectorIcon
              type="clock"
              size={30}
            />
            {contact && contact.get('name')}
          </li>
          <li>
            <SectorIcon
              type="clock"
              size={30}
            />
            {contact && contact.get('email')}
          </li>
          <li>
            <SectorIcon
              type="clock"
              size={30}
            />
            {contact && contact.get('phone')}
          </li>
          <li>
            <SectorIcon
              type="clock"
              size={30}
            />
            {contact && contact.get('address')}
          </li>
          <li>
            <SectorIcon
              type="clock"
              size={30}
            />
            {contact && contact.get('website')}
          </li>
        </ul> */}
      </div>
    );
  }

  return (
    <>
      {renderOverview()}
      {renderDevelopment()}
      {renderContactInfo()}
    </>
  );
}

export default SideInfo;