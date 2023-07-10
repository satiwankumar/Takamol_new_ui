type selfAssessmentTemplateSectionQuestions = {
  description: string;
  id: number;
  question: string;
  weight: number;
}[];

type selfAssessmentTemplateSections = {
  id: number;
  sectionLineNumber: number;
  sectionName: string;
  selfAssessmentTemplateSectionQuestions: selfAssessmentTemplateSectionQuestions;
}[];

type economicActivity = [
  {
    economicActivity: string;
    economicActivityEn: string;
    id: number;
  },
];
type category = {
  categoryName: string;
  id: number;
};
type selfAssessmentDetail = {
  creationDate: string;
  economicActivities: economicActivity;
  category: category;
  id: string;
  publishedDate: number;
  selfAssessmentName: string;
  selfAssessmentTemplateSections: selfAssessmentTemplateSections;
  status: string;
  versionNumber: number;
}[];

type assessmentDetail = {
  creationDate: number;
  economicActivity: economicActivity;
  id: number;
  publishedDate: number;
  selfAssessmentName: string;
  selfAssessmentTemplateSections: selfAssessmentTemplateSections;
  status: string;
  versionNumber: number;
};
