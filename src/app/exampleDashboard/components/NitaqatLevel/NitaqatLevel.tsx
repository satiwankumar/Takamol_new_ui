import {
  Box,
  Grid,
  Link,
  NitaqatBadge,
  Text,
  NitaqatLevel as DesingSystemNitaqatLevel,
  Skeleton,
} from '@takamol/qiwa-design-system/components';
import { LinkArrow } from '@takamol/qiwa-design-system/icons';
import * as React from 'react';

import { useNitaqatLevel } from '../../hooks/useNitaqatLevel';
import { getLocaleName } from '../../utils/locale';
import { useLocale } from 'src/app/translations/hooks/useLocale';

const MAX_NITAQAT_LEVEL = 5;
const NITAQAT_LEVEL = 2;

const NitaqatLevel = () => {
  const { data, isLoading } = useNitaqatLevel();
  const { t, locale } = useLocale();

  if (isLoading) {
    return (
      <>
        <Box mt={[32, 40]} gap={[32, 40]}>
          <Skeleton width={400} />
        </Box>
        <Grid columns={[1, 2]} gap={24}>
          <Box gap={24}>
            <Box gap={12} mt={[16, 24]} maxWidth={['100%', 336]}>
              <Skeleton />
            </Box>
            <Box gap={4} maxWidth={['100%', 336]}>
              <Skeleton />
              <Link iconComponent={LinkArrow} iconPlacement="start" size="small" href="#">
                {t('EXAMPLE_DASHBOARD.NITAQAT_IMPROVE')}
              </Link>
            </Box>
          </Box>
          <Box bgColor="grayscale_50" borderRadius={4} padding={24}>
            <Text variant="body-l" weight="bold" mb={8}>
              {t('EXAMPLE_DASHBOARD.NUMBER_OF_SAUDIS_TO_HIRE')}
            </Text>
            <Skeleton height={60} />
          </Box>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Box mt={[32, 40]} gap={[32, 40]}>
        <Text variant="heading-xs" color="grayscale_900" weight="semibold">
          {t('EXAMPLE_DASHBOARD.NITAQAT_LEVEL')}
        </Text>
      </Box>
      <Grid columns={[1, 2]} gap={24}>
        <Box gap={24}>
          <Box gap={12} mt={[16, 24]} maxWidth={['100%', 336]}>
            {data?.nitaqatLevel && (
              <NitaqatBadge
                fontWeight="semibold"
                variant={data.nitaqatLevel}
                text={getLocaleName(data.nitaqatLevelName, locale)}
                fontVariant="body-l"
              />
            )}
            <DesingSystemNitaqatLevel filled={NITAQAT_LEVEL} max={MAX_NITAQAT_LEVEL} />
          </Box>
          <Box gap={4} maxWidth={['100%', 336]}>
            <Text variant="body-m">
              {t('EXAMPLE_DASHBOARD.SUADIZATION_LEVEL')}{' '}
              <strong>{getLocaleName(data?.saudizationLevel, locale)}</strong>{' '}
              {t('EXAMPLE_DASHBOARD.SAUDIZATION_IMPROVE')}
            </Text>
            <Link iconComponent={LinkArrow} iconPlacement="start" size="small" href="#">
              {t('EXAMPLE_DASHBOARD.NITAQAT_IMPROVE')}
            </Link>
          </Box>
        </Box>
        <Box bgColor="grayscale_50" borderRadius={4} padding={24}>
          <Text variant="body-l" weight="bold" mb={8}>
            {t('EXAMPLE_DASHBOARD.NUMBER_OF_SAUDIS_TO_HIRE')}
          </Text>
          <Text variant="heading-xl" weight="bold">
            {data?.numberOfSaudisToHire}
          </Text>
        </Box>
      </Grid>
    </>
  );
};

export default NitaqatLevel;
