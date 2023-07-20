import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Container, Divider, Typography } from '@mui/material';

import BoxWrapper from 'src/components/ui/BoxWrapper';
import { ReactComponent as FileIcon } from '../../../../assets/images/icon.svg';
// import { useTranslation } from "react-i18next";
import { useLocale } from 'src/hooks/useLocale/useLocale';
import { E2A } from 'src/utils/common/utils';
// import { CONVERTSTATUS, E2A } from "../../../../utils/utils";
// import { RootStateOrAny, useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    // "& .MuiButton-outlined": {
    //   marginRight: theme.spacing(1),
    // },
  },
  btnHeader: {
    marginRight: '10px!important',
    marginLeft: '10px!important',
    borderRadius: '6px!important',
    backgroundColor: '#ECF5F5!important',
    border: '1px solid #148287!important',
    color: '#148287!important',
    padding: '10px 25px!important',
  },
  headingtextmb: {
    marginBottom: '0px!important',
  },
  tpbox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    marginBottom: '-12px',
    marginRight: '12px',
    marginLeft: '12px',
  },
  textarea: {
    marginBottom: '20px!important',
    fontFamily: 'Frutiger LT Arabic',
    fontSize: '20px!important',
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  textareapp: {
    marginBottom: '20px!important',
    fontFamily: 'Frutiger LT Arabic',
    fontSize: '20px!important',
    fontWeight: '700',
    color: '#E31B0C',
  },
  headtextarea: {
    fontFamily: 'Frutiger LT Arabic',
    fontSize: '14px!important',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.65)',
  },
}));

function CompareAssessmentScoring(props: any) {
  const { t, locale } = useLocale();
  const classes = useStyles();
  // const locale = useSelector((state: RootStateOrAny) => state.locale);

  return (
    <BoxWrapper>
      <React.Fragment>
        <div className={classes.tpbox}>
          <Typography variant="h5" className={classes.headingtextmb}>
            {' '}
            <FileIcon className={classes.icon} />
            {t('Scoring')}
          </Typography>
        </div>

        <Divider sx={{ mb: 3, mt: 4 }} />
        <div className="px-2">
          <Typography variant="body2" className={classes.headtextarea}>
            {t('EstablishmentScore')}
          </Typography>
          <Typography color="info" variant="h6" className={classes.textarea}>
            {E2A(String(props.scoring?.score), locale)} %
          </Typography>

          <Typography variant="body2" className={classes.headtextarea}>
            {t('Auditorscore')}{' '}
          </Typography>
          <Typography color="info" variant="h6" className={classes.textarea}>
            {props.scoring?.verifierComment != null ? E2A(String(props.scoring?.verifierScore), locale) + '%' : '-'}
          </Typography>

          {/* <Typography variant="body2" className={classes.headtextarea}>
            {t('DifferencebetweenCRandAuditorscore')}
          </Typography>
          <Typography color="info" variant="h6" className={classes.textarea}>
            {props.scoring?.verifierComment != null
              ? E2A(String(Math.abs(props.scoring?.score - props.scoring?.verifierScore)), locale) + '%'
              : '-'}
          </Typography> */}

          <Typography variant="body2" className={classes.headtextarea}>
            {t('Inspectorscore')}{' '}
          </Typography>
          <Typography color="info" variant="h6" className={classes.textarea}>
            {props?.scoring?.inspectorComment != null ? E2A(String(props.scoring?.inspectorScore), locale) + '%' : '-'}
          </Typography>

          {/* <Typography variant="body2" className={classes.headtextarea}>
            {t('DifferencebetweenAuditorandInspectorscore')}
          </Typography>
          <Typography color="info" variant="h6" className={classes.textarea}>
            {props?.scoring?.inspectorComment != null
              ? E2A(String(Math.abs(props.scoring?.verifierScore - props.scoring?.inspectorScore)), locale) + '%'
              : '-'}
          </Typography> */}
          <Typography className={classes.headtextarea} variant="body2">
            {t('SUPERVISORSCORE')}
          </Typography>
          <Typography className={classes.textarea} color="info" variant="h6">
            {props?.scoring?.supervisorComment != null
              ? E2A(String(props.scoring?.supervisorScore), locale) + '%'
              : '-'}
          </Typography>
          {/* <Typography className={classes.headtextarea} variant="body2">
            {t('DifferencebetweenAuditorandSupervisorscore')}
          </Typography>
          <Typography className={classes.textareapp} style={{ color: 'rgba(0, 0, 0, 0.87)' }} color="info" variant="h6">
            {props?.scoring?.supervisorComment != null
              ? E2A(String(Math.abs(props.scoring?.verifierScore - props.scoring?.supervisorScore)), locale) + '%'
              : '-'}
          </Typography> */}
        </div>
      </React.Fragment>
    </BoxWrapper>
  );
}

export default CompareAssessmentScoring;
