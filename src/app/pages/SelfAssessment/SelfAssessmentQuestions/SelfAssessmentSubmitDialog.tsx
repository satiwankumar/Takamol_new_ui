import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import { Button } from '@takamol/qiwa-react-library';
import Dialog from '@mui/material/Dialog';

import { useLocale } from 'src/hooks/useLocale/useLocale';

const useStyles = makeStyles((theme: any) => ({
  dialog: {
    textAlign: 'center',
  },

  description: {
    // marginTop: theme.spacing(1),
    minHeight: '40px',
    // color: theme.palette.text.secondary,
  },

  buttons: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  submitButton: {
    flex: 1,
    marginRight: '10px',
  },

  cancelButton: {
    flex: 1,
    flip: false,
    // marginLeft: theme.spacing(2),
  },
}));

type DialogProps = {
  open?: boolean;
  handleClose?: () => any;
  handleSubmit?: () => any;
};

export const SelfAssessmentSubmitDialog: React.FC<DialogProps> = ({ open, handleClose, handleSubmit }: DialogProps) => {
  const { t } = useLocale();

  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose} className={classes.dialog}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" dir="ltr">
          {t('AreyousurepublishtheSAtemplate')}
        </Typography>
        <Typography variant="body2" dir="ltr" className={classes.description}>
          {t('Youwillpublishminimumsuccessfulscoreof60')}
        </Typography>
        <div dir="ltr" className={classes.buttons}>
          <Button size="medium" color="primary" className={classes.submitButton} onClick={handleSubmit}>
            {t('Publish')}
          </Button>

          <Button
            variant="outlined"
            size="medium"
            color="primary"
            className={classes.cancelButton}
            onClick={handleClose}
          >
            {t('Cancel')}
          </Button>
        </div>
      </Box>
    </Dialog>
  );
};
