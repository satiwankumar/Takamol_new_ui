import { useWindowUtils } from '@takamol/qiwa-design-system/utils';
import * as React from 'react';
import { Box, Button, CircleBadge, Text } from '@takamol/qiwa-design-system/components';
import { useAuth } from '@takamol/react-qiwa-core';

import { SectionTitleBar } from '../SectionTitleBar';
import { useLocale } from 'src/app/translations/hooks/useLocale';

const YourCompany = () => {
  const { isMobileWidth } = useWindowUtils();
  const { company } = useAuth();
  const { t } = useLocale();

  return (
    <>
      <SectionTitleBar
        title={t('EXAMPLE_DASHBOARD.YOUR_COMPANY.MANAGE_COMPANY')}
        buttonLabel={t('EXAMPLE_DASHBOARD.YOUR_COMPANY.MANAGE_COMPANY')}
      />
      <Box gap={16}>
        <Box gap={4} pt={[8, 0]}>
          <Text variant="heading-xxs" weight="semibold">
            {company?.establishmentName}
          </Text>
          <CircleBadge variant="success">
            <Text variant="special-caption" weight="bold">
              {company?.establishmentId}
            </Text>
          </CircleBadge>
        </Box>
        {isMobileWidth && (
          <Button variant="business_ghost">{t('EXAMPLE_DASHBOARD.YOUR_COMPANY.MANAGE_COMPANY')}</Button>
        )}
      </Box>
    </>
  );
};

export default YourCompany;
