import axios from 'axios';
import cookies from 'react-cookies';

const getBaseHeader = () => {
  const accessToken = cookies.load('accessToken');
  return ({
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export const getCauses = () => {
  return new Promise(async (resolve, reject) => {
    axios.get('http://localhost:4000/cause-api/v1/causes', getBaseHeader())
      .then(res => {
        console.log('GET CAUSES RES:', res);
        return resolve(res.data);
      })
      .catch(err => {
        console.log('GET CAUSES ERR:', err);
        return reject();
      });
  });
}

export const addCause = (name, description) => {
  return new Promise(async (resolve, reject) => {  
    const body = {
      name,
      description
    };
    axios.post('http://localhost:4000/cause-api/v1/causes', body, getBaseHeader())
      .then(res => {
        console.log('ADD CAUSE RES:', res);
        return resolve(res.data);
      })
      .catch(err => {
        console.log('ADD CAUSE ERR:', err);
        return reject();
      });
  });
}

export const deleteCause = (id) => {
  return new Promise(async (resolve, reject) => {
    console.clear();
    console.log('deleteCause:', id);

    axios.delete(`http://localhost:4000/cause-api/v1/causes/${id}`, getBaseHeader())
      .then(res => {
        console.log('DELETE CAUSE RES:', res);
        if (res && res.data && res.data.id) {
          return resolve(res.data.id);
        }
        return reject();
      })
      .catch(err => {
        console.log('DELETE CAUSE ERR:', err);
        return reject();
      });
  });
}