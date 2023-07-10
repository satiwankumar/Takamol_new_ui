import { Compliance } from '../models/Compliance';

type UiComplianceWithMinistryColor = 'success_500' | 'warning_500' | 'danger_500';

type ComplianceColorProps = Compliance['levelScoreColor'];

export const getComplianceWithMinistryColor = (levelScoreColor: ComplianceColorProps) => {
  const colorMap: Record<ComplianceColorProps, UiComplianceWithMinistryColor> = {
    green: 'success_500',
    yellow: 'warning_500',
    red: 'danger_500',
  };

  return colorMap[levelScoreColor];
};
