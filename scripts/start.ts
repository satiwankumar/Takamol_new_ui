import { NodeEnvironment } from '../config/setup';
import createWebpackConfig from '../config/webpack.config';
import { detectPort } from '../config/utils';

process.env.BABEL_ENV = NodeEnvironment.development;

// NOTE: You should use the following pattern 'dev.your-service-name.qiwa.info' which is presented in docs
// https://employeesgate.atlassian.net/wiki/spaces/QFA/pages/4263215146/How+to+start#Set-development-host-address
const serviceName = 'occupational-health-and-safety-spa.qiwa.info'; // This is used only for the starter purpose
const host = process.env.APP_API_MOCK ? 'localhost' : serviceName;
const defaultPort = Number(process.env.PORT) || 8080;

export default () => {
  return new Promise((resolve) => {
    detectPort(defaultPort).then((port) => resolve(createWebpackConfig(NodeEnvironment.development, { port, host })));
  });
};
