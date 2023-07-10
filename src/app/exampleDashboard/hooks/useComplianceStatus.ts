import { useQuery } from '@tanstack/react-query';

import { exampleApiService } from '../services/exampleApiService';
import { exampleApiQueryKeys } from '../constants/exampleApiQueryKeys';

export const useComplianceStatus = () => {
  return useQuery([exampleApiQueryKeys.compliance], exampleApiService.getComplianceStatus);
};
