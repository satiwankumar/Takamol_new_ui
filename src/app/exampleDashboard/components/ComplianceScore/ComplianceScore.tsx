import * as React from 'react';
import { Text } from '@takamol/qiwa-design-system/components';

import { getLocaleName } from '../../utils/locale';
import { useLocale } from 'src/app/translations/hooks/useLocale';
import { Compliance } from '../../models/Compliance';
import { getComplianceWithMinistryColor } from '../../utils/getComplianceWithMinistryColor';

interface ComplianceScoreProps {
  levelName: Compliance['levelName'];
  complianceColor: Compliance['levelScoreColor'];
}

const ComplianceScore = ({ levelName, complianceColor }: ComplianceScoreProps) => {
  const { t, locale } = useLocale();
  const color = getComplianceWithMinistryColor(complianceColor);

  return (
    <Text variant="heading-xs" weight="semibold">
      {t('EXAMPLE_DASHBOARD.COMPLIANCE_WITH_MINISTRY')}{' '}
      <Text variant="heading-xs" weight="semibold" color={color} as="strong">
        {getLocaleName(levelName, locale)}
      </Text>
    </Text>
  );
};

export default ComplianceScore;
