import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: 'https://mystoremanager.herokuapp.com/api/v1'
});

export default class Util {
  static makeRequest(url, options = { method: 'GET' }) {
    return apiInstance({
      url,
      method: options.method,
      data: options.body,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    }).then(response => response.data);
  }

  static formatCurrency(num) {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(2).replace(/\.0$/, '')}G`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(2).replace(/\.0$/, '')}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
    return num;
  }

  static formatDate(date) {
    return new Date(date)
      .toJSON()
      .slice(2, 10)
      .split('-')
      .reverse()
      .join('/');
  }
}
