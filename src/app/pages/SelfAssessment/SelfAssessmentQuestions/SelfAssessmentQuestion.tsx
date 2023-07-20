import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useParams, withRouter } from 'react-router-dom';
import { Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { Button, Loader } from '@takamol/qiwa-react-library';
import { makeStyles } from '@mui/styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../../../../public/css/SelfAssessment.css';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackwordIcon from '@mui/icons-material/ArrowBack';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { useLocale } from 'src/hooks/useLocale/useLocale';
import { PostRequestProxy, PostRequestProxyWithLoader } from 'src/Axios/axios';
import { SELFASSESSMENTQUESTIONANSWER } from '../../../../utils/common/endpoint';
import BoxWrapper from '../../../../components/ui/BoxWrapper';
import { AppRoute } from 'src/routing/routes';
import { setLoading, setNotLoading } from 'src/store/actions';
import { CircularProgressWithLabel } from 'src/components/progessBar/progressBar';
import Error from 'src/components/Modal.Error';
import { fileToBase64 } from 'src/utils/common/utils';

import { SelfAssessmentSubmitDialog } from './SelfAssessmentSubmitDialog';
import { SelfAssessmentTopHeader } from './SelfAssessmentTopHeader';

const useStyles = makeStyles((theme: any) => ({
  root: {
    '& .MuiTypography-h6 ': {
      fontSize: '1.4rem',
      // marginBottom: theme.spacing(0),
      fontWeight: 700,
      fontFamily: 'Frutiger LT Arabic 55 Roman',
      letterSpacing: '0.15px',
      color: 'rgba(0, 0, 0, 0.87)',
    },
    '& .MuiPaper-elevation': {
      boxShadow: 'none',
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      // marginTop: theme.spacing(0),
      marginBottom: '0px',
    },
  },
  main: {
    flip: false,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    // marginTop: theme.spacing(2),
  },
  sectionNumberWrapper: {
    flexShrink: 0,
    height: '48px',
    width: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '50%',
    '@media (max-width: 820px)': {
      height: '25px',
      width: '25px',
      '& h5': {
        fontSize: '1rem',
        lineHeight: '1',
      },
    },
  },
  box: {
    width: '800px',
    marginTop: '10px',
    padding: 0,
  },
  notApplicable: {
    marginTop: '50px',
  },
  paragraph: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '14px',
    fontFamily: 'Frutiger LT Arabic 55 Roman',
    fontWeight: 400,
  },
  question: {
    textAlign: 'start',
  },
  nxtBtn: {
    minWidth: '120px !important',
    marginLeft: '8px !important',
    padding: '12px !important',
  },
  saveBtn: {
    backgroundColor: '#1482870a',
    padding: '12px !important',
  },
  saveBtnIcon: {
    fontSize: '1.4rem !important',
    // paddingRight: theme.spacing(1),
    // paddingLeft: theme.spacing(1),
    color: '#148287',
  },
  doneIcon: {
    position: 'absolute',
    left: '6px',
  },
  closeIcon: {
    position: 'absolute',
    left: '6px',
    // top: "100px",
  },
  done__icon: {
    backgroundColor: '#1c5a7d',
    borderRadius: '50%',
    color: '#fff',
    padding: '3px',
    marginTop: '12px',
  },

  close__icon: {
    backgroundColor: '#F88078',
    borderRadius: '50%',
    color: '#fff',
    padding: '3px',
    marginTop: '20px',
    marginRight: '20px',
  },
  accordian: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon_expand: {
    backgroundColor: '#f0f1f1!important',
    borderRadius: '50px',
    padding: '7px',
    color: '#1c5a7d',
    width: '40px !important',
    height: '40px !important',
  },
  commentBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  commentArea: {
    border: '1px solid #E3E4E9',
    borderRadius: '5px',
    marginTop: '5px',
  },
}));
interface MyObject {
  [key: string]: any;
}
function SelfAssessmentQuestion() {
  const { register, handleSubmit } = useForm<any>();
  const classes = useStyles();
  const { t, locale } = useLocale();
  const history = useHistory();
  const { id } = useParams<any>();
  const dispatch = useDispatch();
  const pcRequestId = localStorage.getItem('pcrId');
  const user = useSelector((state: any) => state.user);
  const [openPublishDialog, setOpenPublishDialog] = useState(false);
  const [fileErrors, setFileErrors] = useState<any>({});
  const [selfAssessmentQuestions, setSelfAssessmentQuestions] = useState<any>();
  const [assessmentAnswers, setAssessmentAnswers] = useState<any>([]);
  const [totalWeight, setTotalWeight] = useState<any>(0);
  const [file, setFile] = useState<any>('');
  const loading = useSelector((state: any) => state.loading);

  interface MyObject {
    [key: string]: any;
  }

  function handlePublish() {
    setOpenPublishDialog(true);
  }

  useEffect(() => {
    getSelfAssessmentQuestions(id);
  }, [id, user]);

  async function getSelfAssessmentQuestions(id: string) {
    dispatch(setLoading());
    const body = {
      id: id,
    };
    const result = await PostRequestProxy('GetSelfAssessmentQuestionByEconomicActivityId', body);
    const tempUsers: any = [];
    if (result?.data?.GetSelfAssessmentQuestionByEconomicActivityId?.Header?.ResponseStatus?.Code == '000') {
      const templateQeustoins: any = [];
      console.log(
        'result?.data?.GetSelfAssessmentQuestionByEconomicActivityId?.Body',
        result?.data?.GetSelfAssessmentQuestionByEconomicActivityId?.Body,
      );
      result?.data?.GetSelfAssessmentQuestionByEconomicActivityId?.Body?.forEach((template: any) => {
        const tempQuestionIDS: any = [];
        template?.selfAssessmentQuestions?.forEach((tempQuestionForID: any) => {
          tempQuestionIDS.push(tempQuestionForID);
        });
        const temp = {
          categoryId: template.categoryId,
          categoryName: template.categoryName,
          categoryNameEn: template.categoryNameEnglish,
          selfAssessmentQuestions: tempQuestionIDS,
        };
        templateQeustoins.push(temp);
      });

      setSelfAssessmentQuestions(templateQeustoins);

      let InitialAnswers: any = [];
      let totalWeight = 0;
      const innerObj: any = [];
      result?.data?.GetSelfAssessmentQuestionByEconomicActivityId?.Body?.length > 0 &&
        result?.data?.GetSelfAssessmentQuestionByEconomicActivityId?.Body?.forEach((questionArray: any) => {
          questionArray?.selfAssessmentQuestions?.map((question: any) => {
            const AnswerPayload = {
              selfAssessmentQuestion: {
                id: question?.id,
              },
              user: {
                userId: user?.userId,
              },
              userAnswer: '',
              userComment: '',
              userFile: [],
              performanceCardRequest: {
                id: pcRequestId,
              },
              weightage: question?.weightage,
              loading: false,
              progress: 0,
            };
            totalWeight += parseInt(question?.weightage);
            innerObj[question.id] = AnswerPayload;
            // InitialAnswers.push(AnswerPayload);
          });
        });
      InitialAnswers = innerObj;
      setTotalWeight(totalWeight);
      setAssessmentAnswers(InitialAnswers);
      dispatch(setNotLoading());
    }
  }
  const handleRemove = (index: number, fileindex: number) => {
    const updatedAnswer = [...assessmentAnswers];
    if (updatedAnswer[index]?.userFile) {
      updatedAnswer[index]?.userFile?.splice(fileindex, 1);
    }
    setAssessmentAnswers(updatedAnswer);
  };
  const handleAnswers = (e: any, index: number) => {
    const updatedAnswer = [...assessmentAnswers];
    if (e.target.value == 'NO' || e.target.value == 'NOT_APPLICABLE') {
      if (Object.prototype.hasOwnProperty.call(updatedAnswer[index], 'userFile')) {
        updatedAnswer[index].userFile = [];
      }
    }
    if (e.target.name == `userAnswer${index}`) {
      updatedAnswer[index]['userAnswer'] = e.target.value;
    } else {
      updatedAnswer[index][e.target.name] = e.target.value;
    }
    setAssessmentAnswers(updatedAnswer);
  };
  const handleFileUpload = async (e: any, index: number) => {
    const updatedAnswer = [...assessmentAnswers];
    const files = e.target.files;
    const allowedformats = ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp', 'application/pdf'];
    if (!allowedformats.includes(files[0].type)) {
      Error('Only PDFs and Images are valid.');
      return;
    }
    const fileSize = files[0].size / 1024 / 1024;
    if (fileSize > 5) {
      Error('Upload File upto 5mb only.');
      return;
    } else {
      setFile(files[0]);
      updatedAnswer[index].loading = true;
      setAssessmentAnswers(updatedAnswer);
      const newupdate = [...assessmentAnswers];
      const base64 = await fileToBase64(files[0]);
      const body = {
        fileDetails: {
          fileName: files[0]?.name,
          contentType: files[0].type,
          fileContent: base64,
        },
      };
      const response = await PostRequestProxyWithLoader('UploadFile', body, handleProgress, index);
      if (response?.data?.UploadFile?.Header?.ResponseStatus?.Code == '000') {
        newupdate[index]['userFile'].push({
          id: response?.data?.UploadFile?.Body?.id,
          name: response?.data?.UploadFile?.Body?.name,
          diskName: response?.data?.UploadFile?.Body?.diskName,
          fileName: response?.data?.UploadFile?.Body?.fileName,
        });
        newupdate[index].loading = false;
        newupdate[index].progress = 0;

        setAssessmentAnswers(newupdate);
      }
    }
  };
  const handleSubmitAnswers = async () => {
    let errors = {};
    assessmentAnswers &&
      assessmentAnswers?.forEach((payload: any) => {
        if (payload) {
          if (payload.userAnswer == 'YES' && payload.userFile.length <= 0) {
            errors = { ...errors, [payload.selfAssessmentQuestion.id]: true };
          }
        }
      });

    setFileErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    const isFileMissing = false;
    if (isFileMissing) return;

    let totalYes = 0;
    let notApplicableTotal = 0;
    assessmentAnswers &&
      assessmentAnswers?.forEach((payload: any) => {
        if (payload) {
          if (payload.userAnswer == 'YES') {
            totalYes += payload.weightage;
          } else if (payload.userAnswer == 'NOT_APPLICABLE') {
            notApplicableTotal += payload.weightage;
          }
        }
      });

    let percentage = 0;
    if (notApplicableTotal == totalWeight) {
      percentage = Math.floor(0);
    } else {
      percentage = Math.floor((totalYes / (totalWeight - notApplicableTotal)) * 100);
    }

    const obj: any = {
      score: percentage,
      published: true,
    };

    const url = `/${SELFASSESSMENTQUESTIONANSWER}`;
    const filtered = assessmentAnswers.filter(function (el: any) {
      return el != null;
    });

    const keysToRemove: string[] = ['progress', 'weightage', 'loading', 'filename'];

    const newArray: MyObject[] = filtered.map((data: any) => {
      const newObj: MyObject = {};
      for (const key in data) {
        if (!keysToRemove.includes(key)) {
          newObj[key] = data[key];
        }
      }
      return newObj;
    });
    const payload = {
      selfAssessmentTemplateSectionQuestionsAnswersList: newArray,
    };

    const result = await PostRequestProxy('SaveAllSelfAssessmentTemplateSectionQuestionAnswer', payload);
    if (result?.data?.SaveAllSelfAssessmentTemplateSectionQuestionAnswer?.Header?.ResponseStatus?.Code == '000') {
      if (percentage < 50) {
        obj['performanceCardRequestStatus'] = 'Rejected';
      }
      const finalObj = {
        id: pcRequestId,
        performanceCardRequest: obj,
      };
      const result1 = await PostRequestProxy('PatchPerformanceCardRequest', finalObj);
      history.push(AppRoute.SelfAssessmentResult, { percentage: percentage });
    }
  };
  const handleFileDownload = async (id: any, diskname: string, filename: string) => {
    const payload = {
      filename: filename,
      fileDiskId: diskname,
    };
    const response = await PostRequestProxy('GetFileByFileName', payload).then((response: any) => {
      const url = 'data:image/png;base64,' + response?.data?.fileContent;
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${filename}`); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };

  const handleProgress = (progressData: any, index: any) => {
    const data = [...assessmentAnswers];
    // data[index].pro
    data[index].progress = progressData;
    setAssessmentAnswers(data);
  };

  return (
    <Container className={classes.root}>
      <form onSubmit={handleSubmit(handleSubmitAnswers)}>
        {loading ? (
          <div className="loading">
            <Loader size={200} style={{ textAlign: 'center' }} thickness={6} />
          </div>
        ) : selfAssessmentQuestions?.length > 0 ? (
          <>
            <SelfAssessmentTopHeader
              title={selfAssessmentQuestions?.selfAssessmentName}
              subtitle={selfAssessmentQuestions?.selfAssessmentName}
            >
              <Fragment>
                <Button
                  color="primary"
                  className={classes.nxtBtn}
                  // onClick={handlePublish}
                  type="submit"
                >
                  {t('submit')}
                </Button>
              </Fragment>
            </SelfAssessmentTopHeader>
            <BoxWrapper>
              <>
                {assessmentAnswers &&
                  assessmentAnswers.length > 0 &&
                  selfAssessmentQuestions &&
                  selfAssessmentQuestions.length > 0 &&
                  selfAssessmentQuestions?.map((mappedArray: any, indexing: number) => {
                    return (
                      <>
                        <div className={classes.main}>
                          <div className="inspTitle">
                            <Typography color="#1c5a7d" variant="h5">
                              {locale == 'ar' ? mappedArray.categoryName : mappedArray.categoryNameEn}
                            </Typography>
                          </div>
                        </div>
                        <Divider sx={{ mt: 2, mb: 2 }}></Divider>
                        {mappedArray?.selfAssessmentQuestions?.map((item: any, index: number) => {
                          if (item) {
                            return (
                              <div key={item?.id}>
                                <Grid container>
                                  <Grid item xs={12} md={12}>
                                    <div key={item.id}>
                                      <Accordion defaultExpanded={true} expanded={true} className="accordiondiv">
                                        <div className="w-100 divflex">
                                          <div className="text-center mblw-5">
                                            {assessmentAnswers[item.id].userAnswer == 'YES' ||
                                            assessmentAnswers[item.id].userAnswer == 'NOT_APPLICABLE' ? (
                                              <DoneIcon className={classes.done__icon} />
                                            ) : assessmentAnswers[item.id].userAnswer == 'NO' ? (
                                              <CloseRoundedIcon
                                                sx={{ fontSize: '25px', color: 'red', marginTop: '10px' }}
                                              />
                                            ) : (
                                              ''
                                            )}
                                          </div>
                                          <div className="mblw-95 mt-1 title">
                                            <AccordionSummary
                                              expandIcon={<ExpandMoreIcon className={classes.icon_expand} />}
                                              aria-controls="panel1a-content"
                                              id="panel1a-header"
                                            >
                                              <Typography variant="h6" className={classes.question}>
                                                <span>{t(`${index + 1}`)}. &nbsp;</span>
                                                {locale == 'ar' ? item?.questionArabic : item?.questionEnglish}
                                              </Typography>
                                            </AccordionSummary>
                                          </div>
                                        </div>
                                        <div className="w-100 px-2-5">
                                          <AccordionDetails>
                                            <div className="form__bg">
                                              <div className="form__qs">
                                                <div className="question">
                                                  <p>{item.description}</p>
                                                </div>

                                                <div className="answer__option">
                                                  <input
                                                    type="radio"
                                                    name={`userAnswer${item.id}`}
                                                    value="YES"
                                                    id={`index${item.id}`}
                                                    checked={assessmentAnswers[item.id].userAnswer == 'YES'}
                                                    onChange={(e) => handleAnswers(e, item.id)}
                                                    required
                                                  />
                                                  <label htmlFor="">{t('YES')} </label> <br />
                                                  <input
                                                    type="radio"
                                                    name={`userAnswer${item.id}`}
                                                    value="NO"
                                                    id={`index${item.id}`}
                                                    checked={assessmentAnswers[item.id].userAnswer == 'NO'}
                                                    onChange={(e) => handleAnswers(e, item.id)}
                                                    required
                                                  />
                                                  <label htmlFor="">{t('NO')} </label> <br />
                                                  <input
                                                    type="radio"
                                                    name={`userAnswer${item.id}`}
                                                    value="NOT_APPLICABLE"
                                                    id={`index${item.id}`}
                                                    checked={assessmentAnswers[item.id].userAnswer == 'NOT_APPLICABLE'}
                                                    onChange={(e) => handleAnswers(e, item.id)}
                                                    required
                                                  />
                                                  <label htmlFor="">{t('Not_applicable')} </label>{' '}
                                                </div>
                                                {assessmentAnswers[item.id].userAnswer == 'YES' && (
                                                  <div className="upload__document">
                                                    <div className="heading upload">
                                                      <Typography variant="h6" className={classes.question}>
                                                        {t('UploadDocuments')}
                                                      </Typography>
                                                      <p>{t('UploadDocumentsDesc')}</p>
                                                      {fileErrors && fileErrors[item.id] && (
                                                        <p style={{ color: 'red' }}>{t('Document is required')}</p>
                                                      )}
                                                    </div>
                                                    {assessmentAnswers[item.id]?.userAnswer == 'YES' &&
                                                      assessmentAnswers[item.id]?.userFile?.length < 5 &&
                                                      !assessmentAnswers[item.id].loading && (
                                                        <div className="upload__option">
                                                          <div className="upload__input">
                                                            <label
                                                              className={
                                                                locale == 'ar'
                                                                  ? 'custom-file-upload'
                                                                  : 'custom-file-uploadLTR'
                                                              }
                                                            >
                                                              <input
                                                                type="file"
                                                                id={`userFile${index}`}
                                                                name={`userFile${item.id}`}
                                                                onClick={(event: any) => {
                                                                  event.currentTarget.value = null;
                                                                }}
                                                                onChange={(e) => {
                                                                  handleFileUpload(e, item.id);
                                                                }}
                                                                // required={
                                                                //   assessmentAnswers[item.id]?.userFile <= 0
                                                                //     ? true
                                                                //     : false
                                                                // }
                                                              />
                                                              {t('Upload')}
                                                            </label>
                                                          </div>
                                                          <div className="guide__uploading">
                                                            <p>{t('Maximumfiles5MBperfile')}</p>
                                                            <p>{t('SupportsPDFPNGJPGHEIC')}</p>
                                                          </div>
                                                        </div>
                                                      )}
                                                    <Stack spacing={2} direction="row">
                                                      {assessmentAnswers[item.id].loading && (
                                                        <CircularProgressWithLabel
                                                          value={assessmentAnswers[item.id].progress}
                                                        />
                                                      )}
                                                    </Stack>
                                                    <div className="upload-parentinsp">
                                                      {assessmentAnswers[item.id]?.userFile?.length > 0 &&
                                                        assessmentAnswers[item.id]?.userFile?.map(
                                                          (file: any, fileindex: number) => (
                                                            <div
                                                              key={fileindex}
                                                              className="upload__preview btn-preview"
                                                            >
                                                              <div className="file__upload__preview">
                                                                <div className="file__name">
                                                                  <DoneIcon className="file__uploaded__tick" />
                                                                  <p className="px-1 mb-0 divflex">
                                                                    <button
                                                                      // href="#" // href="#" button converted from anchor
                                                                      onClick={() =>
                                                                        handleFileDownload(
                                                                          file?.id,
                                                                          file?.diskName,
                                                                          file?.fileName,
                                                                        )
                                                                      }
                                                                    >
                                                                      {file?.fileName}
                                                                    </button>
                                                                  </p>
                                                                </div>
                                                                <div className="file__remove">
                                                                  <CloseIcon
                                                                    onClick={() => handleRemove(item.id, fileindex)}
                                                                    className="file__uploaded__close"
                                                                  />
                                                                </div>
                                                              </div>
                                                            </div>
                                                          ),
                                                        )}
                                                    </div>
                                                  </div>
                                                )}
                                                {assessmentAnswers[item.id].userAnswer == 'NOT_APPLICABLE' && (
                                                  <>
                                                    <div className={classes.commentBox}>
                                                      <Typography variant="h6" dir="ltr">
                                                        {t('Whyapplycase')}
                                                      </Typography>
                                                      <Typography variant="body1" dir="ltr">
                                                        {t('AddcommentAnswer')}
                                                      </Typography>
                                                    </div>
                                                    <textarea
                                                      rows={4}
                                                      cols={100}
                                                      name="userComment"
                                                      maxLength={2000}
                                                      className={classes.commentArea}
                                                      value={assessmentAnswers[item.id].userComment}
                                                      onChange={(e) => handleAnswers(e, item.id)}
                                                      required
                                                    ></textarea>
                                                  </>
                                                )}
                                              </div>
                                            </div>
                                          </AccordionDetails>
                                        </div>
                                      </Accordion>
                                    </div>
                                  </Grid>
                                </Grid>
                                <Divider sx={{ mt: 2, mb: 2 }}></Divider>
                              </div>
                            );
                          }
                        })}
                      </>
                    );
                  })}
              </>
            </BoxWrapper>

            <SelfAssessmentTopHeader
              title={selfAssessmentQuestions?.selfAssessmentName}
              subtitle={selfAssessmentQuestions?.selfAssessmentName}
            >
              <Fragment>
                <Button
                  color="primary"
                  className={classes.nxtBtn}
                  // onClick={handlePublish}
                  type="submit"
                >
                  {t('submit')}
                </Button>
              </Fragment>
            </SelfAssessmentTopHeader>

            <SelfAssessmentSubmitDialog
              handleClose={() => {
                setOpenPublishDialog(false);
              }}
              open={openPublishDialog}
              handleSubmit={() => handleSubmitAnswers()}
            />
          </>
        ) : (
          // <BoxWrapper>
          //   <Button
          //     color="primary"
          //     className={classes.btnHeader}
          //     variant="outlined"
          //     onClick={() => history.push(AppRoute.OSHCERTIFICATE1)}
          //   >
          //     <ArrowBackwordIcon />
          //   </Button>
          //   <p>{t('NO_QUESTIONARE')}</p>
          // </BoxWrapper>
          <Container className="esb-container-2">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <>
                  <div className="no_question_found_container">
                    <Typography variant="h6">{t('NO_QUESTIONARE')}</Typography>

                    <Button
                      color="primary"
                      style={{ textAlign: 'center' }}
                      onClick={() => history.push(AppRoute.OSHCERTIFICATE1)}
                    >
                      {t('Go Back')}
                    </Button>
                  </div>
                </>
              </Grid>
            </Grid>
          </Container>
        )}
      </form>
    </Container>
  );
}

export default withRouter(SelfAssessmentQuestion);
// {/*  */}withRouter ))uterwithRuter outer)())withRouter// {/*  */}withRouter ))uterwithRuteter)())withRouter
