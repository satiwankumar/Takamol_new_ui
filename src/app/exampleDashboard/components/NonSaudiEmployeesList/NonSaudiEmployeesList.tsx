import { useWindowUtils } from '@takamol/qiwa-design-system/utils';
import * as React from 'react';
import { Box } from '@takamol/qiwa-design-system/components';

import { NonSaudiEmployeesItem } from '../NonSaudiEmployeesItem';

interface NonSaudiEmployeesListProps {
  nonSaudiEmployeesList: {
    id: number;
    numberOfEmployees: number;
    title: string;
    description: string;
    linkName: string;
  }[];
}

const NonSaudiEmployeesList = ({ nonSaudiEmployeesList }: NonSaudiEmployeesListProps) => {
  const { isTabletWidth } = useWindowUtils();

  return (
    <>
      {isTabletWidth
        ? nonSaudiEmployeesList.map((item) => (
            <Box key={item.id} gap={40} direction={['column', 'row']}>
              <NonSaudiEmployeesItem
                key={String(item.id)}
                value={item.numberOfEmployees}
                description={item.description}
                title={item.title}
                linkTitle={item.linkName}
              />
            </Box>
          ))
        : nonSaudiEmployeesList.map((item) => (
            <NonSaudiEmployeesItem
              key={String(item.id)}
              value={item.numberOfEmployees}
              description={item.description}
              title={item.title}
              linkTitle={item.linkName}
            />
          ))}
    </>
  );
};

export default NonSaudiEmployeesList;
