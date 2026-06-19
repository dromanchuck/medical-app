/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import Config from 'react-native-config';
import axios from 'axios';

import App from './App';
import { name as appName } from './app.json';

import {
  authService,
  placeService,
  homeService,
  publicationService,
  feedbackService,
  algorithmsService,
} from './src/services';

import { ServerErrors } from './src/types/errors';
import { store } from './src/core/store';
import { logOut, setAppServerError } from './src/core/actions';
import { reportService } from './src/services/ReportService';

axios.interceptors.response.use(
  res => res,
  error => {
    const {
      message,
      code,
      response: {
        status = undefined,
        config = undefined,
        data: { detail = undefined } = {},
      } = {},
    } = error;

    reportService.reportError(error);

    if (detail?.includes('Token is invalid or expired')) {
      store.dispatch(logOut());
    }

    if (
      status === ServerErrors.NotFound ||
      status === ServerErrors.BadGateway ||
      status === ServerErrors.TimeoutGateway ||
      message === ServerErrors.Network ||
      code === ServerErrors.Econnaborted
    ) {
      store.dispatch(setAppServerError({ error: status ?? code ?? message }));
    }

    if (
      status === 401 &&
      detail?.includes('Given token not valid for any token type')
    ) {
      return authService.refreshToken().then(token => {
        config.headers.Authorization = `Bearer ${token}`;
        return axios.request(config);
      });
    }

    return Promise.reject(error);
  },
);

authService.setCredentials({ URL: Config.REACT_API_URL || '' });
authService.prefix = '';

placeService.setCredentials({ URL: Config.REACT_API_URL || '' });
placeService.prefix = '';

homeService.setCredentials({ URL: Config.REACT_API_URL || '' });
homeService.prefix = '';

publicationService.setCredentials({ URL: Config.REACT_API_URL || '' });
publicationService.prefix = '';

feedbackService.setCredentials({ URL: Config.REACT_API_URL || '' });
feedbackService.prefix = 'send_feedback';

algorithmsService.setCredentials({ URL: Config.REACT_API_URL || '' });
algorithmsService.prefix = 'algorithms';

AppRegistry.registerComponent(appName, () => App);
