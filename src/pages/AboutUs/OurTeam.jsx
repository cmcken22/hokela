import React from 'react';
import cx from 'classnames';
import TeamMemberIcon from 'Components/TeamMemberIcon';

const MATT = {
  id: 'matt',
  name: 'Mathieu Mackay',
  title: 'CEO',
  subtitle: 'Head of Strategy & Growth',
  linkedIn: 'https://www.linkedin.com/in/mathieumackay/'
}
const GABI = {
  id: 'gabi',
  name: 'Gabriela Nunez',
  title: 'CTO',
  subtitle: 'Head of Experince & Design',
  linkedIn: 'https://www.linkedin.com/in/gnunezvasquez'
}
const CONNER = {
  id: 'conner',
  name: 'Conner McKenna',
  title: 'Full-Stack Developer',
  // linkedIn: 'https://google.com'
}
const CINDY = {
  id: 'cindy',
  name: 'Cindy Mena',
  title: 'UX/UI Designer',
  // linkedIn: 'https://google.com'
}
const CODY = {
  id: 'cody',
  name: 'Cody Joy',
  title: 'Outreach Coordinator',
  // linkedIn: 'https://google.com'
}
const ANDREA = {
  id: 'andrea',
  name: 'Andrea Florez',
  title: 'Outreach Coordinator',
  // linkedIn: 'https://google.com'
}
const DAWSON = {
  id: 'dawson',
  name: 'Dawson Mercer',
  title: 'Marketing Consultant',
  // linkedIn: 'https://google.com'
}

const Grid = ({ title, users }) => {
  const gridSize = users.length;

  return (
    <div className="our-team__section">
      <p>{title}</p>

      <div className={cx("our-team__grid", {
        [`our-team__grid--${gridSize}`]: !!gridSize
      })}>
        {users && users.map(user => (
          <TeamMemberIcon
            key={user.name}
            {...user}
          />
        ))}
      </div>
    </div>
  );
}

const OurTeam = () => {
  return (
    <div className="about__section our-team">
      <Grid
        title="The Founders"
        users={[MATT, GABI]}
      />
      <Grid
        title="The Dream Team"
        users={[CONNER, CODY, ANDREA]}
      />
    </div>
  );
};

export default OurTeam;