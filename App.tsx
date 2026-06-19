import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';
import { Portal } from 'react-native-paper';
import { StyleSheet, Text, TextInput } from 'react-native';
import Toast from 'react-native-toast-message';
import * as Sentry from '@sentry/react-native';

import { QueryClient, QueryClientProvider } from 'react-query';

import { RootNavigator } from 'navigation';
import { store } from 'core';
import { KeyboardRegulator } from 'atoms';
import { useOnLostInternet } from 'hooks';

Sentry.init({
  dsn: 'https://7a8bbf72299a46d79ff2b842061dd4da@o1169122.ingest.sentry.io/6261621',
  tracesSampleRate: 1.0,
});

enableScreens(true);

const queryClient = new QueryClient();

const App = () => {
  useOnLostInternet();

  return (
    <QueryClientProvider client={queryClient}>
      <Portal.Host>
        <KeyboardRegulator>
          <GestureHandlerRootView style={styles.container}>
            <Provider store={store}>
              <RootNavigator />
            </Provider>
            <Toast position="top" />
          </GestureHandlerRootView>
        </KeyboardRegulator>
      </Portal.Host>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

export default Sentry.wrap(App);
