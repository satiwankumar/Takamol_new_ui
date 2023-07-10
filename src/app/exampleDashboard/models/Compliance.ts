import { ApiTranslation } from 'src/app/exampleDashboard/models/ApiTranslation';

type ComplianceScoreColors = 'red' | 'yellow' | 'green';

export interface Compliance {
  levelScoreColor: ComplianceScoreColors;
  levelName: ApiTranslation;
}
