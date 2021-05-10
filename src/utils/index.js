import cookies from 'react-cookies';

export const getBaseHeader = () => {
  const accessToken = cookies.load('accessToken');
  return ({
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export const confirmLoggedIn = () => {
  const accessToken = cookies.load('accessToken');
  return !!accessToken;
}

export const dateToString = (date) => {
  if (!date) return '';
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentDate = new Date(date).toLocaleDateString();
  const [m, d, y] = currentDate && currentDate.split('/');
  return `${monthNames[m]} ${d}, ${y}`;
}