import { useQuery } from '@tanstack/react-query';

import { exampleApiService } from '../services/exampleApiService';
import { exampleApiQueryKeys } from '../constants/exampleApiQueryKeys';

export const useEmployees = () => {
  return useQuery([exampleApiQueryKeys.employees], exampleApiService.getEmployees);
};
