import { makeStyles } from '@mui/styles';
import React, { ReactElement } from 'react';
import { Container, Grid, Typography } from '@mui/material';

const useStyles = makeStyles((theme: any) => ({
  headerContainer: {
    // marginBottom: theme.spacing(5),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    // marginTop: theme.spacing(5),
    // color:"#144158",
  },
  headerSubTitle: {
    flip: false,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '10px',
    // margin: `0 -${theme.spacing(1)}`,

    // "& > *": {
    //   margin: `0 ${theme.spacing(1)}px`,
    // },
  },

  // [theme.breakpoints.down("sm")]: {
  //   header: {
  //     display: "flex",
  //     alignItems: "flex-start",
  //     justifyContent: "space-between",
  //     flexDirection: "column-reverse!important",
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

export const DetailsHeader = ({ title, subtitle, children }: WithChildren<AdminDetailsHeaderProps>) => {
  const classes = useStyles();

  return (
    <div className={classes.headerContainer}>
      <Container className="esb-container-2" style={{ marginTop: '20px' }}>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.header}>
              <div dir="rtl" className={classes.actionContainer}>
                {children}
              </div>

              <div className="innerContainer">
                <Grid container spacing={2}>
                  <Grid item>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      {title}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
