import { ApiTranslation } from './ApiTranslation';

type NitaqatLevel = 'lowGreen' | 'mediumGreen' | 'highGreen' | 'red' | 'platinum';

export interface NitaqatScore {
  numberOfSaudisToHire: number;
  saudizationLevel: ApiTranslation;
  nitaqatLevel: NitaqatLevel;
  nitaqatLevelName: ApiTranslation;
}
