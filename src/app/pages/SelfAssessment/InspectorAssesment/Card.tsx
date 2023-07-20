import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button } from '@takamol/qiwa-react-library';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Error from 'src/components/Modal.Error';
import { useLocale } from 'src/hooks/useLocale/useLocale';
const bull = (
  <Box component="span" sx={{ width: '10vw', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);
const cardStyle = {
  transitionDuration: '0.3s',
  border: '1px solid #1C5A7D',
  boxShadow: '0 0 10px 5px #dde5eb',
  borderRadius: '10px',
  backgroundColor: 'white',
};

export default function OutlinedCard(props: any) {
  const { t, locale } = useLocale();

  const { data, handleVisit, actionButton = true } = props;
  const { visitName, visitStatus, visitDateTime, id } = data;
  return (
    <div className="cstmbox">
      <Box className="cstminbox cutotom-action-box">
        <CardContent style={{ ...cardStyle }}>
          <Typography variant="button" component="div">
            {moment(visitDateTime).format('YYYY-MM-DD')}
          </Typography>
          {/* <Typography variant="body2">{visitStatus ? 'Visited' : 'InProcess'}</Typography> */}
        </CardContent>
        {actionButton && (
          <Button
            style={{ marginTop: '5px', borderRadius: '5px' }}
            color="primary"
            disabled={visitStatus ? true : false}
            onClick={() => {
              if (visitStatus) {
                return 0;
              }
              if (moment(visitDateTime).isAfter(moment(new Date()))) {
                Error(t('Visit is in Future Date please wait till the Date'));
              } else {
                handleVisit(id);
              }
            }}
            size="small"
          >
            {visitStatus ? 'Visited' : 'Mark Visited'}
          </Button>
        )}
      </Box>
    </div>
  );
}
