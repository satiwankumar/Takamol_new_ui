import * as React from 'react';
import { useWindowUtils } from '@takamol/qiwa-design-system/utils';
import { Box, Link, Skeleton, Text } from '@takamol/qiwa-design-system/components';
import { LinkArrow } from '@takamol/qiwa-design-system/icons';

import { Section } from '../Section';
import { useEconomicActivity } from '../../hooks/useEconomicActivity';
import { NitaqatLevel } from '../NitaqatLevel';
import { useLocale } from 'src/app/translations/hooks/useLocale';
import { getLocaleName } from '../../utils/locale';

import { Styled } from './EconomicActivity.styles';

const EconomicActivity = () => {
  const { isMobileWidth } = useWindowUtils();
  const { data, isLoading } = useEconomicActivity();
  const { t, locale } = useLocale();

  if (isLoading) {
    return (
      <Section mt={16} mb={16} pt={[32, 40]} pb={[24, 48]}>
        <div role="progressbar">
          <Skeleton count={3} height={30} />
        </div>
      </Section>
    );
  }

  return (
    <Section mt={16} mb={16} pt={[32, 40]} pb={[24, 48]}>
      <Box withDividers>
        <Box mb={[32, 48]}>
          <Box direction="row" align="center" justify="space-between">
            <Text variant="special-captionSmall" color="grayscale_600" weight="semibold">
              <Styled.BoxTitle>{t('EXAMPLE_DASHBOARD.ECONOMIC_ACTIVITY.TITLE')}</Styled.BoxTitle>
            </Text>
            {!isMobileWidth && <Link>{t('EXAMPLE_DASHBOARD.MANAGE_ENTITY')}</Link>}
          </Box>
          <Text variant="heading-xs" color="grayscale_900" weight="semibold" mt={4}>
            <Styled.ActivityName>{getLocaleName(data?.activityName, locale)}</Styled.ActivityName>
          </Text>
          <Text variant="body-m" color="grayscale_600" weight="medium" mt={16}>
            {data?.numberOfCompanies} {t('EXAMPLE_DASHBOARD.COMPANIES_FROM_UID')} {data?.uidOfCompany}{' '}
            {t('EXAMPLE_DASHBOARD.PART_OF_ECONOMIC_ACTIVITY')}
          </Text>
          <Box mt={4} direction={['column', 'row']} gap={[24, 0]}>
            <Link iconComponent={LinkArrow} iconPlacement="start" href="#">
              {t('EXAMPLE_DASHBOARD.WHAT_IS_ECONOMIC_ACTIVITY')}
            </Link>
            {isMobileWidth && <Link href="#">{t('EXAMPLE_DASHBOARD.MANAGE_ENTITY')}</Link>}
          </Box>
        </Box>
        <NitaqatLevel />
      </Box>
    </Section>
  );
};

export default EconomicActivity;
