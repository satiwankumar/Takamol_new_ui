import { useQuery } from '@tanstack/react-query';

import { exampleApiService } from '../services/exampleApiService';
import { exampleApiQueryKeys } from '../constants/exampleApiQueryKeys';

export const useEconomicActivity = () => {
  return useQuery([exampleApiQueryKeys.economicActivity], exampleApiService.getEconomicActivity);
};
