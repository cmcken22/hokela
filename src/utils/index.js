import cookies from 'react-cookies';
import Immutable from 'immutable';
import store from '../index';

export const getBaseHeader = () => {
  const accessToken = cookies.load('accessToken');
  return ({
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export const saveCookie = (name, value) => {
  const cookiesAccepted = store.getState().getIn(['app', 'cookiesAccepted']);
  if (cookiesAccepted) cookies.save(name, value, { path: '/' });
}

export const confirmLoggedIn = () => {
  const accessToken = cookies.load('accessToken');
  return !!accessToken;
}

export const dateToString = (date) => {
  if (!date) return '';
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentDate = new Date(date).toLocaleDateString();

  // safari creates dates with - as the separator
  if (currentDate.indexOf('-') !== -1) {
    const res = currentDate.split('-');
    const [y, m, d] = res;
    return `${monthNames[parseInt(m)]} ${d}, ${y}`;
  } else if (currentDate.indexOf('/') !== -1) {
    const res = currentDate.split('/');
    const [m, d, y] = res;
    return `${monthNames[parseInt(m)]} ${d}, ${y}`;
  }
}

export const convertDaysToDuration = (data) => {
  let days = data;
  if (days instanceof Immutable.Map || days instanceof Immutable.List) days = days.toJS();
  if (!days || !days.length) return "";

  const dayMap = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6
  };

  const shortDayMap = {
    "Sunday": "Sun",
    "Monday": "Mon",
    "Tuesday": "Tues",
    "Wednesday": "Wed",
    "Thursday": "Thurs",
    "Friday": "Fri",
    "Saturday": "Sat"
  };

  const getRanges = (array) => {
    let ranges = [], rStart, rStartDay, rEnd, rEndDay;
    for (var i = 0; i < array.length; i++) {
      rStartDay = array[i];
      rStart = dayMap[rStartDay];
      rEnd = rStart;
      rEndDay = rStartDay;

      while (dayMap[array[i + 1]] - dayMap[array[i]] == 1) {
        rEndDay = array[i + 1];
        rEnd = dayMap[rEndDay]; // increment the index if the numbers sequential
        i++;
      }

      if (rEnd - rStart > 1) {
        ranges.push(rStart == rEnd ? shortDayMap[rStartDay] + '' : `${shortDayMap[rStartDay]} - ${shortDayMap[rEndDay]}`);
      } else {
        ranges.push(rStart == rEnd ? shortDayMap[rStartDay] + '' : `${shortDayMap[rStartDay]}, ${shortDayMap[rEndDay]}`);
      }

    }
    return ranges;
  }

  let result = getRanges(days);
  if (result[0] === 'Sun' && result[result.length - 1] === 'Sat') {
    result[0] = `Sat - Sun`;
    result.pop();
  }

  const finalString = result.join(', ');
  return finalString;
}


export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
