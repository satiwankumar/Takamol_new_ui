import * as React from 'react';
import { Box, Grid, Link, Text } from '@takamol/qiwa-design-system/components';
import { useWindowUtils } from '@takamol/qiwa-design-system/utils/windowUtils';

import { Section } from '../Section';
import { useEmployees } from '../../hooks/useEmployees';
import { useLocale } from 'src/app/translations/hooks/useLocale';

const Employees = () => {
  const { isMobileWidth } = useWindowUtils();
  const { data } = useEmployees();
  const { t } = useLocale();

  return (
    <Section mb={16} pb={[24, 48]} pt={[32, 40]}>
      <Box direction={['column', 'row']} mb={[24, 32]} justify="space-between" align={['stretch', 'center']}>
        <Text variant="heading-xs" weight="semibold">
          {t('EXAMPLE_DASHBOARD.EMPLOYEES')}
        </Text>
        {!isMobileWidth && <Link href="#">{t('EXAMPLE_DASHBOARD.MANAGE_EMPLOYEES')}</Link>}
      </Box>
      <Grid columns={[1, 2]} gap={[8, 24]}>
        <Box padding={[16, 24]} pb={[16, 48]} bgColor="grayscale_50">
          <Text variant="body-l" weight="semibold" mb={8}>
            {t('EXAMPLE_DASHBOARD.NUMBER.EMPLOYEES')}
          </Text>
          <Text variant={['heading-s', 'heading-xl']} weight="semibold" mb={8}>
            {data?.numberOfEmployees?.total}
          </Text>
          <Box gap={12} direction="row" withDividers>
            <Text variant="body-m" color="grayscale_700">
              {data?.numberOfEmployees?.saudis} {t('EXAMPLE_DASHBOARD.EMPLOYEES.SAUDIS')}
            </Text>
            <Text variant="body-m" color="grayscale_700">
              {data?.numberOfEmployees?.nonSaudis} {t('EXAMPLE_DASHBOARD.EMPLOYEES.NON_SAUDIS')}
            </Text>
          </Box>
        </Box>
        <Box padding={[16, 24]} bgColor="grayscale_50" mb={[16, 0]}>
          <Text variant="body-l" weight="semibold" mb={8}>
            {t('EXAMPLE_DASHBOARD.EMPLOYEES.RATE')}
          </Text>
          <Text variant={['heading-s', 'heading-xl']} weight="semibold" mb={8}>
            {data?.saudizationRate?.percentageScore}%
          </Text>
          <Text variant="body-m" color="grayscale_700">
            {t('EXAMPLE_DASHBOARD.EMPLOYEES.RATE.DESCRIPTION')}
          </Text>
        </Box>
        {isMobileWidth && <Link href="#">{t('EXAMPLE_DASHBOARD.MANAGE_EMPLOYEES')}</Link>}
      </Grid>
    </Section>
  );
};

export default Employees;
