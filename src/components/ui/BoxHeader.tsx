import { Divider, Typography } from '@mui/material';
import { DefaultTheme, makeStyles } from '@mui/styles';
import React, { ReactElement } from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const useStyles = makeStyles((theme: any) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // color:"#144158",
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    // margin: `0 -${theme.spacing(1)}`,

    // "& > *": {
    //   // margin: `0 ${theme.spacing(1)}px`,
    // },
  },

  // [theme.breakpoints.down("sm")]: {
  //   header: {
  //     display: "flex!important",
  //     textAlign: "center",
  //     alignItems: "flex-end !important",
  //     justifyContent: "space-between",
  //     flexDirection: "column-reverse",
  //   },
  // },
}));

type AdminDetailsHeaderProps = {
  title: string;
  subtitle?: string;
};

export type WithChildren<T> = T & {
  children?: ReactElement;
};

export const BoxHeader = ({ title, children }: WithChildren<AdminDetailsHeaderProps>) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.header} dir="ltr">
        <div className={classes.actionContainer}>{children}</div>
        <Typography variant="h5" dir="rtl">
          {' '}
          <InsertDriveFileIcon
            fontSize="large"
            style={{ color: '#1C5A7D!important' }}
            sx={{
              border: '1px solid black',
              width: '20px',
              height: '20px',
              padding: '10px',
              borderRadius: '50%',
              position: 'relative',
              top: '10px',
              marginLeft: 1,
            }}
          />{' '}
          {title}
        </Typography>
      </div>
      <Divider sx={{ mb: 3, mt: 3, borderColor: '#EEEEEE' }} />
    </div>
  );
};
