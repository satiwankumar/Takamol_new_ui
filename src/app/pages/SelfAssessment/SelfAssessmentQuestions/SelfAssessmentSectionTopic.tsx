import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

export type SectionTopicProps = {
  topicHeader?: string;
  topic?: string;
  topicDescription?: string;
};

const useStyles = makeStyles((theme: any) => ({
  topic: {
    // flip: false,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'start',
    // marginLeft: theme.spacing(3),
    // marginRight: theme.spacing(3),
  },

  topicHeader: {
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.87)',
  },

  typography: {
    // marginTop: theme.spacing(1),
  },

  description: {
    color: 'rgba(0, 0, 0, 0.6)',
  },
}));

export const SelfAssessmentSectionTopic: React.FC<SectionTopicProps> = ({
  topicHeader,
  topic,
  topicDescription,
}: SectionTopicProps) => {
  const classes = useStyles();

  return (
    <div className={classes.topic}>
      <Typography className={classes.topicHeader} variant="body2">
        {topicHeader}
      </Typography>
      <Typography className={classes.typography} variant="h5">
        {topic}
      </Typography>
      {/* <Typography className={`${classes.typography} ${classes.description}`} variant="body1">
        {topicDescription}
      </Typography> */}
    </div>
  );
};
