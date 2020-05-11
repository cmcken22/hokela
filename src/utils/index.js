import cookies from 'react-cookies';

export const getBaseHeader = () => {
  const accessToken = cookies.load('accessToken');
  return ({
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}