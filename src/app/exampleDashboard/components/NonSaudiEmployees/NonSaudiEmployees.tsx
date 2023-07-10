import * as React from 'react';
import { Box, CircleBadge, Link, LinkGroup, Skeleton, Text } from '@takamol/qiwa-design-system/components';
import { useWindowUtils } from '@takamol/qiwa-design-system/utils';
import { LinkArrow } from '@takamol/qiwa-design-system/icons';
import { useAuth } from '@takamol/react-qiwa-core';

import { Section } from '../Section';
import { NonSaudiEmployeesList } from '../NonSaudiEmployeesList';
import { useNonSaudiEmployees } from '../../hooks/useNonSaudiEmployees';
import { useLocale } from 'src/app/translations/hooks/useLocale';
import { useCreateNonSaudiList } from '../../hooks/useCreateNonSaudiList';

const NonSaudiEmployees = () => {
  const { company, authStatus } = useAuth();
  const { isTabletWidth } = useWindowUtils();
  const { data, isLoading } = useNonSaudiEmployees();
  const { list } = useCreateNonSaudiList(data);
  const { t } = useLocale();

  if (isLoading || authStatus === 'loading') {
    return (
      <Section pt={40} pb={48} mt={[24, 16]} mb={16}>
        <div role="progressbar">
          <Skeleton count={3} height={30} />
        </div>
      </Section>
    );
  }

  return (
    <Section mb={16} pb={[24, 40]} pt={[32, 40]}>
      <Box direction={['column', 'row']} justify="space-between">
        <Text variant="heading-xs" weight="semibold">
          {t('EXAMPLE_DASHBOARD.NUMBER_OF_NON_SAUDIS_TO_HIRE')}
        </Text>
        {!isTabletWidth && (
          <Box ms={16} width="fit-content" hasNoShrink>
            <LinkGroup direction="row">
              <Link href="#">{t('EXAMPLE_DASHBOARD.ISSUE_VISA')}</Link>
              <Link href="#">{t('EXAMPLE_DASHBOARD.TRANSFER_EMPLOYEE')}</Link>
            </LinkGroup>
          </Box>
        )}
      </Box>
      <Box direction={['column', 'row']} mt={8} align={['stretch', 'center']}>
        <div style={{ display: 'flex', marginInlineEnd: 16 }}>
          <Text variant="body-m" me={4} color="grayscale_700">
            for
          </Text>
          <Text variant="body-m" weight="semibold" color="grayscale_900" mb={[8, 0]}>
            {company?.establishmentName}
          </Text>
        </div>
        <CircleBadge variant="success">
          <Text variant="special-captionSmall" weight="bold">
            {company?.establishmentId}
          </Text>
        </CircleBadge>
      </Box>
      <Box mt={8}>
        <Link iconComponent={LinkArrow} iconPlacement="start" size="small" href="#">
          {t('EXAMPLE_DASHBOARD.HOW_TO_HIRE')}
        </Link>
      </Box>
      <Box direction={['column', isTabletWidth ? 'column' : 'row']} mt={[32, 40]} gap={40}>
        <NonSaudiEmployeesList nonSaudiEmployeesList={list} />
      </Box>
      {isTabletWidth ? (
        <Box pt={56} pb={[16, 0]} direction="row" gap={24}>
          <LinkGroup direction="row">
            <Link href="#">{t('EXAMPLE_DASHBOARD.ISSUE_VISA')}</Link>
            <Link href="#">{t('EXAMPLE_DASHBOARD.TRANSFER_EMPLOYEE')}</Link>
          </LinkGroup>
        </Box>
      ) : (
        <></>
      )}
    </Section>
  );
};

export default NonSaudiEmployees;
