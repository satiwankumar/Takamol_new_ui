import React from 'react';
import { Divider, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { color } from 'html2canvas/dist/types/css/types/color';
import { NoEncryption } from '@mui/icons-material';

import BoxWrapper from '../../../components/ui/BoxWrapper';
import { ReactComponent as CommentIcon } from '../../../assets/images/icons/comment-icon.svg';
import { ReactComponent as AlertIcon } from '../../../assets/images/icons/alert-icon.svg';
import { useLocale } from 'src/hooks/useLocale/useLocale';

const useStyles = makeStyles((theme: any) => ({
  headingtext: {
    // marginBottom: "50px!important",
    textDecoration: 'none',
    '@media (max-width: 820px)': {
      fontSize: '1.4rem !important',
    },
  },
  icon: {
    // marginTop: "10px",
    //marginBottom: "-12px",
    //marginRight: "12px",
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
    color: 'rgba(0, 0, 0, 0.74)',
    lineHeight: '20px',
    fontSize: '0.9rem',
    fontFamily: 'Frutiger LT Arabic 55 Roman',
    width: '100%',
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
    marginTop: '-5px',
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
  },
}));

function FinalComment(props: { setComment: any; comment: string }) {
  const { setComment, comment } = props;
  const classes = useStyles();
  const { t } = useLocale();
  return (
    <div>
      <div className={classes.mainbox}>
        <div className={classes.sectionNumberWrapper}>
          <CommentIcon color="#1c5a7d" className={classes.icon} />
        </div>

        <div className={classes.contentheading}>
          {/* <p>{t('COMMENT')}</p> */}
          <Typography variant="h5" className={classes.headingtext}>
            {t('FComment')}
          </Typography>
        </div>
      </div>

      <Divider sx={{ mb: 3, mt: 3 }} />
      <textarea
        className={classes.textareaSupervisor}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={2000}
        required
      ></textarea>

      {/* <Typography className={classes.info__belt}>
        <p>
          {' '}
        </p>
      </Typography> */}
    </div>
  );
}

export default FinalComment;
