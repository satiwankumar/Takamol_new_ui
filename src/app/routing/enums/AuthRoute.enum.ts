export enum AuthRoute {
  dashboard = '/',
  example = '/example',
  OSHCERTIFICATE1 = '/ohs-certificate',
  startSelfAssessment = '/example',
}

export enum ErrorRoute {
  error = '/error',
  forbidden = '/forbidden',
  unauthorized = '/unauthorized',
  notVerified = '/not-verified',
  notFound = '/not-found',
}

export const ADMIN_ROUTES = ['/users', '/questions', '/establishment-detail'];

export const USER_ROUTES = [
  '/start-self-assessment',
  '/self-assessment-result',
  '/certification',
  '/ohs-certificate',
  '/osh-certificate2',
  '/osh-certificate3',
  '/self-assessment-questions/:id',
  '/pcrequest/performance-certificate/:id',
];

export const SPECIALISTROUTE = [
  '/ohs-certificate-requests',
  '/performance-card-details/:id',
  '/self-assessment-result',
  '/establishment-detail',

  '/compare-assessment/:id',
  '/inspector-assessment/:id',
];

export const ROUTES: any = {
  SUPERVISIOR: '/ohs-certificate-requests',
  INSPECTOR: '/ohs-certificate-requests',
  VERIFIER: '/ohs-certificate-requests',
  ADMIN: '/questions',
  USER: '/ohs-certificate',
};
