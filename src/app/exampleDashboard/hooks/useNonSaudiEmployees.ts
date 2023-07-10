import { useQuery } from '@tanstack/react-query';

import { exampleApiService } from '../services/exampleApiService';
import { exampleApiQueryKeys } from '../constants/exampleApiQueryKeys';

export const useNonSaudiEmployees = () => {
  return useQuery([exampleApiQueryKeys.nonSaudiEmployees], exampleApiService.getNonSaudisEmployees);
};
