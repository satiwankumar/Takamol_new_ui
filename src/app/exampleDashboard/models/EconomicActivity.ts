import { ApiTranslation } from 'src/app/exampleDashboard/models/ApiTranslation';

export interface EconomicActivity {
  activityName: ApiTranslation;
  numberOfCompanies: number;
  uidOfCompany: string;
}
