import { loadDesignSystemFonts } from '@takamol/qiwa-design-system/utils';
import TagManager from 'react-gtm-module';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/myStore';

async function requestConfig(configJson: string) {
  try {
    const response = await fetch(configJson);
    window.reactQiwaConfig = await response.json();

    return window.reactQiwaConfig;
  } catch (e: unknown) {
    console.warn(e);
  }
}

export const render = async () => {
  const { getEnvironmentVar, ErrorBoundary } = await import('@takamol/react-qiwa-core');
  const { App } = await import('./App');
  const { RouterProvider } = await import('src/app/routing/contexts/RouterProvider');

  const { messages } = await import('./app/translations/i18n/messages');
  const { AppProviders } = await import('@takamol/react-qiwa-core');

  const { runMockServerWhenEnabled } = await import('src/mocks/server');

  const isLocalEnv = () => {
    return getEnvironmentVar('ENVIRONMENT_NAME') === 'local';
  };

  const tagManagerArgs = {
    gtmId: getEnvironmentVar('GTM_TAG'),
  };

  runMockServerWhenEnabled(false);
  loadDesignSystemFonts();

  if (!isLocalEnv()) {
    TagManager.initialize(tagManagerArgs);
  }

  const container = document.getElementById('root');
  const root = createRoot(container as Element);
  root.render(
    <RouterProvider>
      <AppProviders messages={messages}>
        <Provider store={store}>
          <ErrorBoundary>
            <StrictMode>
              <App />
            </StrictMode>
          </ErrorBoundary>
        </Provider>
      </AppProviders>
    </RouterProvider>,
  );
};

requestConfig('/config.json').then(() => render());
