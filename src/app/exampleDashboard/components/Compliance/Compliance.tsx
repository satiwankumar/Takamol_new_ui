import * as React from 'react';
import { Box, Button, Link, Skeleton, Text } from '@takamol/qiwa-design-system/components';
import { LinkArrow } from '@takamol/qiwa-design-system/icons';

import { Section } from '../Section';
import { useLocale } from 'src/app/translations/hooks/useLocale';
import { useComplianceStatus } from '../../hooks/useComplianceStatus';
import { ComplianceScore } from '../ComplianceScore';

const Compliance = () => {
  const { t } = useLocale();
  const { data, isLoading, isRefetching, isError, refetch } = useComplianceStatus();
  const refetchComplianceStatus = () => {
    refetch();
  };

  if (isLoading || isRefetching) {
    return (
      <Section pt={40} pb={48} mt={[24, 16]} mb={16}>
        <div role="progressbar">
          <Skeleton count={3} height={30} />
        </div>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section pt={40} pb={48} mt={[24, 16]} mb={16}>
        <Box direction={['column', 'row']} gap={[24, 16]}>
          <Box gap={[8, 16]}>
            <Text color="danger_900">An error ocurred please try again</Text>
            <Button onClick={refetchComplianceStatus}>refetch</Button>
          </Box>
        </Box>
      </Section>
    );
  }

  const viewComplianceScores = () => null;
  const learnAboutComplianceScore = () => null;

  return (
    <Section pt={40} pb={48} mt={[24, 16]} mb={16}>
      <Box direction={['column', 'row']} gap={[24, 16]}>
        <Box gap={[8, 16]}>
          {data?.levelName && data?.levelScoreColor && (
            <ComplianceScore levelName={data.levelName} complianceColor={data.levelScoreColor} />
          )}
          <Box gap={4}>
            <Text variant="body-m" color="grayscale_700">
              {t('EXAMPLE_DASHBOARD.COMPANY_ADHERE')}
            </Text>
            <Link iconComponent={LinkArrow} iconPlacement="start" onClick={learnAboutComplianceScore} size="small">
              {t('EXAMPLE_DASHBOARD.WHAT_IS_COMPLIANCE_SCORE')}
            </Link>
          </Box>
        </Box>
        <Box hasNoShrink width="auto">
          <Link onClick={viewComplianceScores}>{t('EXAMPLE_DASHBOARD.VIEW_COMPLIANCE_SCORES')}</Link>
        </Box>
      </Box>
    </Section>
  );
};

export default Compliance;
