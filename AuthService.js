/* eslint-disable class-methods-use-this */
import { Buffer } from 'buffer';
import { AsyncStorage } from 'react-native';

const authKey = 'auth';
const userKey = 'user';

class AuthService {
  getAuthInfo(cb) {
    AsyncStorage.multiGet([authKey, userKey], (err, val) => {
      if (err || !val) return cb(err);

      if (!val[0]) return cb();

      const authInfo = {
        header: {
          Authorization: `Basic ${val[0][1]}`,
        },
        user: JSON.parse(val[1][1]),
      };

      return cb(null, authInfo);
    });
  }

  login(credentials, successCallBack, errorCallBack) {
    const userBuffer = Buffer.from(`${credentials.username}:${credentials.password}`);
    const encodedAuth = userBuffer.toString('base64');

    fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Basic ${encodedAuth}`,
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }

        if (response.status === 401) {
          throw new Error('Invalid username or password');
        }

        throw new Error('We experienced an unknown issue');
      })
      .then(response => response.json())
      .then((results) => {
        AsyncStorage.multiSet([
          [authKey, encodedAuth],
          [userKey, JSON.stringify(results)],
        ], (err) => {
          if (err) throw err;
          successCallBack(results);
        });
      })
      .catch(error => errorCallBack(error));
  }
}

module.exports = new AuthService();
