import { Box } from '@mui/material';
import React from 'react';

import classes from './BoxWrapper.module.css';

type Props = {
  children: JSX.Element;
};
function BoxWrapper(props: Props) {
  return (
    <>
      <Box mt={6} className={classes.boxWrapper}>
        {props.children}
      </Box>
    </>
  );
}

export default BoxWrapper;
