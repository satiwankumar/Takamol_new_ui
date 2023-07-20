import React from 'react';
import { Divider, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { ReactComponent as CommentIcon } from '../../../../assets/images/icons/comment-icon.svg';
import { ReactComponent as AlertIcon } from '../../../../assets/images/icons/alert-icon.svg';
// import { useTranslation } from "react-i18next";
import { useLocale } from 'src/hooks/useLocale/useLocale';
import BoxWrapper from 'src/components/ui/BoxWrapper';

const useStyles = makeStyles((theme: any) => ({
  headingtext: {
    textDecoration: 'none',
    '@media (max-width: 820px)': {
      fontSize: '1.4rem !important',
    },
  },
  icon: {
    textDecoration: 'none',
  },
  alerticon: {
    marginTop: '2px',
    marginRight: '12px',
    display: 'inline',
    float: 'left',
  },
  textareaSupervisor: {
    border: '1px solid #ccc',
    resize: 'none',
    width: '100%',
    color: 'rgba(0, 0, 0, 0.74)',
    lineHeight: '20px',
    fontSize: '0.9rem',
    fontFamily: 'Frutiger LT Arabic 55 Roman',
    height: '100px',
  },
  sectionNumberWrapper: {
    flexShrink: 0,
    height: '48px',
    width: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid #14415A`,
    borderRadius: '50%',
  },
  mainbox: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  info__belt: {
    background: '#E8F4FE',
    marginTop: '15px !important',
    display: 'inline-block',
    borderRadius: '3px',
    padding: '0.5rem 1rem 0.5rem 1rem',
    fontSize: '0.9rem !important',
    color: '#285375',
    fontWeight: '500 !important',
  },
  contentheading: {
    textDecoration: 'none',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '5px',
  },
}));

function CompareAssessmentComment(props: any) {
  const classes = useStyles();
  const { t } = useLocale();
  return (
    <BoxWrapper>
      <div>
        <div className={classes.mainbox}>
          <div className={classes.sectionNumberWrapper}>
            <CommentIcon className={classes.icon} />
          </div>

          <div className={classes.contentheading}>
            <Typography variant="h5" className={classes.headingtext}>
              {t('Finalcomment')}
            </Typography>
            {/* <p>{t("Providefinalcommenttheassesment")}</p> */}
          </div>
        </div>

        <Divider sx={{ mb: 3, mt: 3 }} />
        <textarea className={classes.textareaSupervisor} value={props?.finalComment} disabled></textarea>

        {/* <Typography className={classes.info__belt}>
          <p>
            {t("Lengthcommentbetween10500characters")}
            <AlertIcon className={classes.alerticon} />{" "}
          </p>
        </Typography> */}
      </div>
    </BoxWrapper>
  );
}

export default CompareAssessmentComment;
