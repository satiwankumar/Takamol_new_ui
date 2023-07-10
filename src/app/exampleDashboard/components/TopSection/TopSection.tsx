import * as React from 'react';
import { Box, Text } from '@takamol/qiwa-design-system/components';
import { useAuth } from '@takamol/react-qiwa-core';

import { useLocale } from 'src/app/translations/hooks/useLocale';

const TopSection = () => {
  const { company } = useAuth();
  const { t } = useLocale();

  return (
    <Box pt={[32, 48]} pb={48} maxWidth={606}>
      <Text variant="heading-m" color="grayscale_0" weight="semibold" as="h1" mb={[32, 24]}>
        {t('EXAMPLE_DASHBOARD.TOP_SECTION.WELCOME')}{' '}
        <Text variant="heading-m" color="business_300" weight="semibold" as="span">
          {company?.establishmentName}
        </Text>
      </Text>
    </Box>
  );
};

export default TopSection;
