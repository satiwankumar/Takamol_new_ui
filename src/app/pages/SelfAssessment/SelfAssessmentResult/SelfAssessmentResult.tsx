// import "./SelfAssessment.css";
import React from 'react';
import { Container, Typography } from '@mui/material';
import { Button } from '@takamol/qiwa-react-library';
import { makeStyles } from '@mui/styles';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useLocation, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import BoxWrapper from '../../../../components/ui/BoxWrapper';
import { useLocale } from 'src/hooks/useLocale/useLocale';

const useStyles = makeStyles((theme: any) => ({
  root: {
    '& .MuiTypography-body1': {
      margin: '12px 0',
      color: 'rgba(0, 0, 0, 0.6)',
      lettetSpacing: '0.15px',
      fontSize: '0.9rem',
      fontWeight: 700,
      marginBottom: '0px',
    },
    '& .MuiTypography-body2': {
      margin: '12px 0',
      color: 'rgba(0, 0, 0, 0.6)',
      lettetSpacing: '0.15px',
      fontSize: '1rem',
      marginBottom: '22px',
    },
    '& .MuiTypography-h5': {
      margin: '12px 0',
      fontWeight: 700,
      marginBottom: '20px',
    },
    '& .MuiButton-contained': {
      width: '260px',
      padding: '7px 10px',
      margin: '20px 8px',
      backgroundColor: '#ECF5F5',
      color: '#148287',
      border: '1px solid #148287',
      fontWeight: 500,
      marginTop: '20px',
      letterSpacing: '0.46px',
      '&:hover': {
        backgroundColor: '#148287',
        color: '#fff',
      },
    },
    '& .MuiButton-outlined': {
      width: '260px',
      padding: '7px 10px',
      margin: '20px 8px',
      backgroundColor: '#148287',
      color: '#fff',
      border: '1px solid #148287',
      fontWeight: 500,
      marginTop: '20px',
      letterSpacing: '0.46px',
      '&:hover': {
        backgroundColor: '#ECF5F5',
      },
    },
  },
  resultPage: {
    padding: '50px',
    textAlign: 'center',
  },
  content: {},
  iconTick: {},
  tickIcon: {
    border: '1px solid #148287',
    borderRadius: '50px',
    padding: '10px',
    color: '#148287',
    marginBottom: '-1px',
  },
  crossIcon: {
    border: '1px solid #F88078',
    borderRadius: '50px',
    padding: '10px',
    color: '#F88078',
    marginBottom: '-1px',
  },
  textContent: {},
  textContentp1: {
    textTransform: 'uppercase',
    marginTop: '28px!important',
  },
  textContenth5: {},
  textContentp2: {},
}));

function SelfAssessmentResult() {
  const { t } = useLocale();
  const history = useHistory();
  const classes = useStyles();
  const [percentage, setPercentage] = useState<any>();
  const location = useLocation<any>();

  useEffect(() => {
    if (location?.state != undefined && location?.state != null) {
      setPercentage(location?.state?.percentage);
    }
  }, [location?.state]);

  return percentage != undefined && percentage >= 50 ? (
    <>
      <Container className={classes.root}>
        <BoxWrapper>
          <div className={classes.resultPage}>
            <div className={classes.iconTick}>
              <DoneIcon sx={{ fontSize: '50px' }} className={classes.tickIcon} />
            </div>
            <div>
              <Typography variant="body1" className={classes.textContentp1}>
                {t('result')}
              </Typography>
              <Typography variant="h5" className={classes.textContenth5}>
                {t('Passedwithscore') + ' ' + percentage + '%'}
              </Typography>
              <Typography variant="body2" className={classes.textContentp2}>
                {t('CongratulationsPassedAssessment')}
              </Typography>
              <Button color="primary" onClick={() => history.push('/ohs-certificate')} size="large">
                {t('Gobackcompanyselection')}
              </Button>
              {/* <Button variant="outlined" size="large">
                {t("SeeAnswers")}
              </Button> */}
            </div>
          </div>
        </BoxWrapper>
      </Container>
    </>
  ) : (
    <>
      <Container className={classes.root}>
        <BoxWrapper>
          <div className={classes.resultPage}>
            <div className={classes.iconTick}>
              <CloseRoundedIcon sx={{ fontSize: '50px' }} className={classes.crossIcon} />
            </div>
            <div>
              <Typography variant="body1" className={classes.textContentp1}>
                {t('result')}
              </Typography>
              <Typography variant="h5" className={classes.textContenth5}>
                {t('FailedWithScore') + ' ' + percentage + '%'}
              </Typography>
              <Typography variant="body2" className={classes.textContentp2}>
                {t('FailedAssessment')}
              </Typography>
              {/* <Button variant="contained" size="large">
                {t("SeeAnswers")}
              </Button> */}
              {/*  */}
              <Button variant="outlined" onClick={() => history.push('/start-self-assessment')} size="large">
                {t('Retry')}
              </Button>
            </div>
          </div>
        </BoxWrapper>
      </Container>
    </>
  );
}

export default SelfAssessmentResult;
