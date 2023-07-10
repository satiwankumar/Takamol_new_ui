import * as React from 'react';
import { Box, Layout } from '@takamol/qiwa-design-system/components';
import { Link } from 'react-router-dom';

import { AuthRoute } from '../routing/enums/AuthRoute.enum';

import { TodoList } from './components/TodoList';
import { YourCompany } from './components/YourCompany';
import { Compliance } from './components/Compliance';
import { EconomicActivity } from './components/EconomicActivity';
import { Employees } from './components/Employees';
import { NonSaudiEmployees } from './components/NonSaudiEmployees';
import { TopSection } from './components/TopSection';

const ExampleDashboard = () => {
  return (
    <>
      <Box bgColor="business_700">
        <Layout variant="with-sidebar-condensed">
          <TopSection />
        </Layout>
      </Box>
      <Layout variant="with-sidebar-condensed">
        <Link to={AuthRoute.example}>Hello World page</Link>
        {/* <Box pt={24} pb={16} gap={16} direction="row" align="center">
          <Link to={AuthRoute.example}>Example page</Link>
        </Box>
        <TodoList />
        <YourCompany />
        <Compliance />
        <EconomicActivity />
        <Employees />
        <NonSaudiEmployees /> */}
      </Layout>
    </>
  );
};

export default ExampleDashboard;
