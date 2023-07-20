import React, { ReactElement } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { DefaultTheme, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    //flexDirection: "row-reverse",
    // marginTop: theme.spacing(0),
    color: '#144158',
  },
  headerSubTitle: {
    flip: false,
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '1.1rem!important',
    fontWeight: '600!important',
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'end',
    // margin: `0 -${theme.spacing(1)}`,

    '& > *': {
      // margin: `0 ${theme.spacing(1)}px`,
    },
  },

  // [theme.breakpoints.down("sm")]: {
  //   header: {
  //     display: "flex",
  //     alignItems: "flex-start",
  //     justifyContent: "space-between",
  //     flexDirection: "column",
  //   },
  //   actionContainer: {
  //     paddingTop: theme.spacing(2),
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

export const SelfAssessmentTopHeader = ({ title, subtitle, children }: WithChildren<AdminDetailsHeaderProps>) => {
  const classes = useStyles();

  return (
    <Container className="esb-container-2" style={{ marginTop: '20px' }}>
      <Grid container>
        <Grid item xs={12}>
          <>
            <div className="innerContainer">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {subtitle && (
                    <Typography className={classes.headerSubTitle} color="info" mt={1} variant="h4">
                      {subtitle}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={6} display="flex" justifyContent={'end'}>
                  {children}
                </Grid>
              </Grid>
            </div>
          </>
        </Grid>
      </Grid>
    </Container>
    // <div className="">
    //   <div className={classes.header}>
    //     <div className="mblw-25">

    //     </div>
    //     <div className="mblw-75">
    //       <div className={classes.actionContainer}></div>
    //     </div>
    //   </div>
    // </div>
  );
};
