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