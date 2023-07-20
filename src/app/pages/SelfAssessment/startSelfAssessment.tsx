import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { Button } from '@takamol/qiwa-design-system/components';
// import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@takamol/react-qiwa-core';

import BoxWrapper from '../../../components/ui/BoxWrapper';
import { useLocale } from 'src/app/translations/hooks/useLocale';
import { PostRequestProxy, GetRequest, PostRequest } from 'src/Axios/axios';
import { PCREQUESTSCARD } from 'src/utils/common/endpoint';
// import { AppRoute } from 'src/routing/routes';
import { AuthRoute } from 'src/app/routing/enums/AuthRoute.enum';

import Error from 'src/components/Modal.Error';

// const useStyles = makeStyles((theme: any) => ({
//   box: {
//     textAlign: 'center',
//     // paddingTop: theme.spacing(5),
//     // paddingBottom: theme.spacing(5),
//     width: '700px',
//     margin: 'auto',
//     '@media (max-width: 820px)': {
//       width: '100%',
//     },
//   },
//   description: {
//     // paddingBottom: theme.spacing(5),
//     // paddingTop: theme.spacing(2),
//   },
//   startBtn: {
//     width: '70%',
//     letterSpacing: '0.5px',
//     fontSize: '1rem',
//   },
// }));
export const StartSelfAssessment = () => {
  const user = useSelector((state: any) => state.user);

  const navigate = useNavigate();
  const { session } = useAuth();
  const { t, locale } = useLocale();
  // const classes = useStyles();
  const classes = {};

  const [estab, setEstab] = useState<any>();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search); // id=123
    const status1 = params.get('status');
    if (status1 == 'resubmit') {
      setStatus(true);
    }
  }, []);

  const getEstablishmentDetails = async (id: any) => {
    const body = {
      companyId: id,
    };
    const result = await PostRequestProxy('GetEstablishmentByCompanyId', body);
    // const result = await GetRequest(`/user/uuid/${id}`);
    if (result?.data?.GetEstablishmentByCompanyId?.Header?.ResponseStatus?.Code == '000') {
      // const estab = await GetRequest(`/${'establishmentByCompanyId'}/${id}`);
      // if (estab?.status == 200) {
      setEstab(result?.data?.GetEstablishmentByCompanyId?.Body);
    }
  };

  useEffect(() => {
    getEstablishmentDetails(user?.establishment[0]?.companyId);
  }, [user?.establishment[0]]);

  const goToQuestion = async (company: any) => {
    const url = `/${PCREQUESTSCARD}`;
    const payload = {
      pcr: {
        establishment: {
          id: company?.id,
        },
        numberOfRequests: 1,
        score: 0,
        performanceCardRequestStatus: 'UNASSIGNED',
        resubmitStatus: status ? 'ReSubmit' : '',
        userAssigned: user?.userId,
      },
    };

    const result = await PostRequestProxy('CreatePerformanceCardRequest', payload);
    if (result?.data?.CreatePerformanceCardRequest?.Header?.ResponseStatus?.Code == '000') {
      setEstab(result?.data?.CreatePerformanceCardRequest?.Header?.Body);

      // const result = await PostRequest(url, payload);
      localStorage.setItem('pcrId', result?.data?.CreatePerformanceCardRequest?.Body?.id);
      localStorage.setItem('establishment', JSON.stringify(company));
      navigate(`/self-assessment-questions/` + company?.economicActivity?.id, {
        state: { id: company?.economicActivity?.id },
      });
    } else {
      if (result?.data?.CreatePerformanceCardRequest?.Header?.ResponseStatus?.Code == '109') {
        const langKey = `${locale === 'ar' ? 'Arabic' : 'English'}Msg`;
        Error(
          result?.data?.CreatePerformanceCardRequest?.Header?.ResponseStatus &&
            result?.data?.CreatePerformanceCardRequest?.Header?.ResponseStatus[langKey],
        );
      }
      navigate(`ohs-certificate`);
    }
    // history.push()
  };

  return (
    <Container>
      <BoxWrapper>
        <div className={classes.box}>
          <Typography variant="h4" gutterBottom component="div" dir="ltr">
            {t('FillyourSelfAssessment')}
          </Typography>
          <Typography className={classes.description} variant="body1" gutterBottom component="div" dir="ltr">
            {t('FillAssestmentPara')}
          </Typography>

          <Button
            variant="contained"
            className={classes.startBtn}
            size="large"
            color="primary"
            style={{ marginTop: '10px' }}
            // onClick={() => navigate("/fill-self-assessment-list")}
            // onClick={() => goToQuestion(props?.companyDetails?.selectedCompany[0].economicActivity.id,user?.userId)}
            onClick={() => goToQuestion(estab)}
          >
            {t('StartSelfAssessment')}
          </Button>
        </div>
      </BoxWrapper>
    </Container>
  );
};
