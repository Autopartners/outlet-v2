import axios from 'axios';
import Qs from 'qs';

const api = axios.create({
  headers: {
    Accept: 'application/json'
    // 'Content-Type': 'application/json',
  },
  withCredentials: true,
  paramsSerializer: (params) =>
    Qs.stringify(params, {
      arrayFormat: 'brackets',
      encode: false
    })
});

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

let authurl = 'http://localhost:3005';
let connecturl = 'http://localhost:3006/';

const getApi = async () => {
  let path = 'https://auth-test.ap-ru.com/api/v4/ping'; // временно тест
  // if (!isLocalhost) {
  //   try {
  //     // const local = axios.get('https://a.ap-ru.com/api/v4/ping');
  //     // const external = axios.get('https://auth.ap-ru.com/api/v4/ping');
  //     // const {
  //     //   config: { url }
  //     // } = await Promise.race([local, external]);
  //     // path = url;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  connecturl = 'https://connect.ap-ru.com/';
  path = path.replace('/api/v4/ping', '');
  if (isLocalhost) {
    return 'http://localhost:3005';
  }
  return path;
};

const initialize = async (callback) => {
  try {
    authurl = await getApi();
    if (isLocalhost) {
      connecturl = 'http://localhost:3006';
    }
    api.defaults.baseURL = `${authurl}/api/v4`;
    callback('server_loaded');
  } catch {
    callback('server_unavailable');
  }
};

const ermurl = 'https://e.ap-ru.com';

export { initialize, connecturl, ermurl, getApi, isLocalhost, api };
