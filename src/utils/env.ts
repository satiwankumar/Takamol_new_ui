import { Environment, ExternalURL, getEnvironmentVar, getExternalUrl } from '@takamol/qiwa-react-library';

const getEnvironmentName = (): Environment => {
  return getEnvironmentVar('ENVIRONMENT_NAME') as Environment;
};

export const getAuthApiUrl = () => {
  const environment = getEnvironmentName();
  return getExternalUrl(ExternalURL.authApi, environment);
};

export const getLoginPageUrl = () => {
  const environment = getEnvironmentName();
  return getExternalUrl(ExternalURL.login, environment);
};
