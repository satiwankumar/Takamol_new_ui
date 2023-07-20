import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';
import { Button, Loader } from '@takamol/qiwa-react-library';
import { useHistory, useParams, withRouter } from 'react-router-dom';
import ArrowBackwordIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';

import { DetailsHeader } from '../../../../components/ui/DetailsHeader';
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLocale } from 'src/hooks/useLocale/useLocale';
import { PATCHPERFORMANCECARDREQUEST, PCREQUESTSCARD } from '../../../../utils/common/endpoint';
import { BASEURLFile, BASEURLFiles, GetRequest, PostRequestProxy, PatchRequest, PostRequest } from 'src/Axios/axios';

import CompareAssessmentScoring from './CompareAssessmentScoring';
import CompareAssessmentComment from './CompareAssessmentComment';
import CompareAssessmentAnswerSection from './CompareAssessmentAnswerSection';
import { AcceptRejectSubmitDialog } from './AcceptRejectSubmitDialog';
import { RejectSubmitDialogBox } from './RejectSubmitDialogBox';

const useStyles = makeStyles(() => ({
  root: {
    // "& .btnReject": {
    //   marginRight: theme.spacing(1),
    // },
  },
  btnHeader: {
    marginRight: '10px!important',
    marginLeft: '10px!important',
    padding: '10px 25px!important',
  },
  btnReject: {
    marginRight: '10px!important',
    padding: '10px !important',
  },
  btnApprove: {
    padding: '10px !important',
    border: '1px solid #148287!important',
  },
}));

function CompareAssessment() {
  const { t, locale } = useLocale();
  const { id } = useParams<any>();
  // const { id } =useState<any>([]);
  const classes = useStyles();
  const role = useSelector((state: any) => state.role);
  const [loader, setLoader] = useState(true);
  const [openPublishDialog, setOpenPublishDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [scoring, setScoring] = useState<any>({});
  const [finalComment, setFinalComment] = useState<any>('');
  const [isVerifier, setIsVerifier] = useState<any>(false);
  const [isInspector, setIsInspector] = useState<any>(false);
  const [isSuperVisor, setIsSuperVisor] = useState<any>(false);
  const [companyName, setCompanyName] = useState('');
  const [assessmentAnswers, setAssessmentAnswers] = useState<any>([]);
  const user = useSelector((state: any) => state.user);

  const navigate = '';
  const history = useHistory();
  function handlePublish() {
    setOpenPublishDialog(true);
  }

  function handleRejectPublish() {
    setOpenRejectDialog(true);
  }
  async function ApproveRejectPCR(status: any) {
    const obj = {
      performanceCardRequestStatus: status ? 'Card Issued' : 'Rejected',
    };
    const body = {
      id: id,
      performanceCardRequest: obj,
    };
    const result = await PostRequestProxy(PATCHPERFORMANCECARDREQUEST, body);
    if (result && result.status === 200) {
      history.push('/ohs-certificate-requests');
    }
  }
  async function getAssesmentData() {
    setLoader(true);
    // const url = `/${PCREQUESTSCARD}/${id}`;
    // const result = await GetRequest(url);
    // if (result && result.status === 200) {
    const body = {
      id: id,
    };

    const result = await PostRequestProxy('GetPerformanceCardRequestById', body);
    // const url = `/${PCREQUESTSLIST}${id}`;
    // const result = await GetRequest(url);

    if (result?.data?.GetPerformanceCardRequestById?.Header?.ResponseStatus?.Code == '000') {
      const {
        score,
        inspectorScore,
        verifierScore,
        supervisorScore,
        verifierComment,
        inspectorComment,
        supervisorComment,
        finalScore,
      } = result?.data?.GetPerformanceCardRequestById?.Body;
      setScoring({
        score,
        inspectorScore,
        verifierScore,
        supervisorScore,
        verifierComment,
        inspectorComment,
        supervisorComment,
        finalScore,
      });
      setCompanyName(
        locale == 'ar'
          ? result?.data?.GetPerformanceCardRequestById?.Body.establishment?.companyNameArabic
          : result?.data?.GetPerformanceCardRequestById?.Body?.establishment?.companyNameEnglish,
      );
      setAssessmentAnswers(
        result?.data?.GetPerformanceCardRequestById?.Body?.selfAssessmentTemplateSectionQuestionsAnswers,
      );
      if (role?.role == 'VERIFIER') {
        const { verifierComment } = result?.data?.GetPerformanceCardRequestById?.Body;
        setIsVerifier(true);
        setFinalComment(verifierComment);
      }
      if (role?.role == 'INSPECTOR') {
        const { inspectorComment } = result?.data?.GetPerformanceCardRequestById?.Body;
        setIsInspector(true);
        setFinalComment(inspectorComment);
      }
      if (role?.role == 'SUPERVISIOR') {
        const { supervisorComment } = result?.data?.GetPerformanceCardRequestById?.Body;
        setIsSuperVisor(true);
        setFinalComment(supervisorComment);
      }
    }
    setLoader(false);
  }
  useEffect(() => {
    getAssesmentData();
  }, [role]);
  return loader ? (
    <div className="loading">
      <Loader size={100} style={{ textAlign: 'center' }} thickness={6} />
    </div>
  ) : (
    <Container maxWidth="lg">
      <DetailsHeader
        title={t('CompareAssessments')}
        // subtitle={t("Herescoringquestionsanswersattachedevidences")}
      >
        <React.Fragment>
          <div style={{ marginRight: '10px !import' }}>
            {isSuperVisor && scoring?.finalScore != null && scoring?.score >= 50 && (
              <Button color="primary" className={classes.btnApprove} onClick={handleRejectPublish}>
                {t('Approve')}
              </Button>
            )}
            {isSuperVisor && scoring?.finalScore != null && scoring?.score >= 50 && (
              <Button variant="outlined" color="primary" className={classes.btnReject} onClick={handlePublish}>
                {t('Reject')}
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              className={classes.btnHeader}
              onClick={() => {
                history.push('/ohs-certificate-requests');
              }}
            >
              <ArrowBackwordIcon />
            </Button>
          </div>
        </React.Fragment>
      </DetailsHeader>
      <CompareAssessmentScoring scoring={scoring}></CompareAssessmentScoring>
      <CompareAssessmentAnswerSection
        isVerifier={isVerifier}
        isInspector={isInspector}
        isSuperVisor={isSuperVisor}
        assessmentAnswers={assessmentAnswers}
        companyName={companyName}
      ></CompareAssessmentAnswerSection>
      <CompareAssessmentComment finalComment={finalComment}></CompareAssessmentComment>
      <AcceptRejectSubmitDialog
        handleClose={() => {
          setOpenRejectDialog(false);
        }}
        open={openRejectDialog}
        handleSubmit={() => ApproveRejectPCR('Card Issued')}
        // handleSubmit={() => {}}
      />

      <RejectSubmitDialogBox
        handleClose={() => {
          setOpenPublishDialog(false);
        }}
        open={openPublishDialog}
        handleSubmit={
          () => ApproveRejectPCR('Rejected')
          // handleSubmit={() => {}
        }
      />
      <DetailsHeader
        title={''}
        // subtitle={t("Herescoringquestionsanswersattachedevidences")}
      >
        <React.Fragment>
          {isSuperVisor && scoring?.score >= 50 && (
            <Button variant="contained" className={classes.btnApprove} onClick={handleRejectPublish}>
              {t('Approve')}
            </Button>
          )}
          {isSuperVisor && (
            <Button variant="outlined" color="primary" className={classes.btnReject} onClick={handlePublish}>
              {t('Reject')}
            </Button>
          )}
          <Button
            variant="outlined"
            color="primary"
            className={classes.btnHeader}
            onClick={() => {
              history.push('/ohs-certificate-requests');
            }}
          >
            <ArrowBackwordIcon />
          </Button>
        </React.Fragment>
      </DetailsHeader>
    </Container>
  );
}
export default withRouter(CompareAssessment);

// export default CompareAssessment;
