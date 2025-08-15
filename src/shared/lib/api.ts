import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3005/api/v4',
  headers: {
    Accept: 'application/json'
    // 'Content-Type': 'application/json'
  },
  withCredentials: true
});

export const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export const ermurl = 'https://e.ap-ru.com'