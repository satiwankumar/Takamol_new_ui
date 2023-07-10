import { NodeEnvironment } from '../config/setup';
import { loadEnvs } from '../config/utils';

process.env.BABEL_ENV = NodeEnvironment.test;
process.env.NODE_ENV = NodeEnvironment.test;

loadEnvs(NodeEnvironment.test);

const argv = process.argv.slice(2);

import('jest').then((jest) => {
  jest.run(argv);
});
