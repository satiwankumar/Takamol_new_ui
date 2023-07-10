type pcRequest = {
  pcRequestId: string;
  createdOn: string;
  issuedOn: string;
  expirationDate: string;
  zone: string;
};
type pcRequestArray = pcRequest[];

type pcRequests = {
  establishment: any;
  assignedTo: any;
  createdOn: number;
  ecnomicActivity: null;
  companyNameEnglish: string;
  establishmentNumber: number;
  grade: null;
  issuedOn: number;
  numberOfRequests: number;
  numberOfEmployees: number;
  selfAssessmentName: null;
  performanceCardRequestStatus: string;
  validityDate: null;
}[];
