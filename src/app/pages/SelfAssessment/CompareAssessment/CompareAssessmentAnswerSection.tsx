import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Container, Divider, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
// import { useTranslation } from "react-i18next";
import { DownloadDoneOutlined } from '@mui/icons-material';
import axios from 'axios';

import { useLocale } from 'src/hooks/useLocale/useLocale';
import { theme } from '../../../../App.theme';
import { ReactComponent as FileDownload } from '../../../../assets/images/icons/download.svg';
// import store from "../../../../store/myStore";
import { SelfAssessmentSectionTopic } from '../SelfAssessmentQuestions/SelfAssessmentSectionTopic';
import BoxWrapper from 'src/components/ui/BoxWrapper';
import { BASEURLFile, PostRequestProxy } from 'src/Axios/axios';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiTypography-h6 ': {
      fontSize: '1.4rem',
      marginBottom: '8px',
      fontWeight: 700,
      fontFamily: 'Frutiger LT Arabic 55 Roman',
      letterSpacing: '0.15px',
      color: 'rgba(0, 0, 0, 0.87)',
    },
    '& .MuiAccordion': {
      boxShadow: 'none',
    },
  },
  main: {
    // flip: false,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    // marginTop: theme.spacing(2),
  },
  youranswer: { marginBottom: '20px!important' },
  sectionNumberWrapper: {
    flexShrink: 0,
    height: '48px',
    width: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid #14415A`,
    border: `1px solid `,

    borderRadius: '50%',
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
  },
  icon_expand: {
    backgroundColor: '#ecf5f5!important',
    borderRadius: '50px',
    padding: '7px',
    color: '#148287',
    width: '40px !important',
    height: '40px !important',
  },
  AdditionalComment: {
    marginBottom: '40px!important',
  },
  inputcomment: { width: '100px' },
  textarea: {
    // paddingTop: theme.spacing(1),
    fontSize: '0.875rem',
    letterSpacing: '0.15px',
    textOverflow: 'ellipsis',
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  answer__option: {
    marginTop: '20px',
  },
  textareaSupervisor: {
    border: 'none',
    backgroundColor: '#f5f5f5',
    resize: 'none',
    color: '#000',
    fontSize: '0.875rem',
    fontFamily: 'Frutiger LT Arabic 55 Roman',
    width: '100%',
    height: '100px',
  },
  commentpara: {
    marginBottom: '20px!important',
  },
  headingcomment: { marginTop: '20px!important' },
  dropdown: {
    backgroundColor: '#fff',
    marginTop: '-10px',
    width: '290px!important',
  },
  notapplicables: {
    marginTop: '-12px',
  },
}));

function CompareAssessmentAnswerSection(props: any) {
  const classes = useStyles();
  const { t, locale } = useLocale();

  const base64toBlob = (data: string) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);
    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    const out = new Uint8Array(length);

    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: 'application/pdf' });
  };
  // const handleFileDownload = async (id: any, name: string, filename: string) => {
  //   const response = await axios
  //     .get(`${BASEURLFile}/${name}`, {
  //       responseType: 'blob',
  //     })
  //     .then((response: any) => {
  //
  //       const url = window.URL.createObjectURL(new Blob([response.data]));
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.setAttribute('download', `${filename}`); //or any other extension
  //       document.body.appendChild(link);
  //       link.click();
  //     });
  // };

  const handleFileDownload = async (id: any, diskname: string, filename?: string) => {
    const payload = {
      filename: filename,
      fileDiskId: diskname,
    };
    const response = await PostRequestProxy('GetFileByFileName', payload).then((response: any) => {
      const url = 'data:image/png;base64,' + response?.data?.fileContent;
      // window.URL.createObjectURL(new Blob([]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${filename}`); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <BoxWrapper>
      <>
        <div className="pcrmaindiv">
          {/* <Typography className="pcricon">
            <span>1</span>
          </Typography> */}
          <SelfAssessmentSectionTopic
            topicHeader={''}
            topic={props.companyName}
            topicDescription={'Please provide us your answers about safety of your establishment.'}
          />
        </div>
        <Divider sx={{ mt: 3, mb: 2 }}></Divider>

        {props?.assessmentAnswers.map((answer: any, index: any) => (
          <>
            <Grid container>
              <Grid item xs={12} md={12}>
                <div>
                  <Accordion expanded={true} className="accordiondiv">
                    <div className="w-100 divflex">
                      <div className="text-center mblw-5">
                        <DoneIcon className={classes.done__icon} />
                      </div>
                      <div className="mblw-95 mt-1 title">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon className={classes.icon_expand} />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography variant="h6" className={classes.question}>
                            {locale == 'ar'
                              ? answer?.selfAssessmentQuestion?.questionArabic
                              : answer?.selfAssessmentQuestion?.questionEnglish}
                          </Typography>
                        </AccordionSummary>
                      </div>
                    </div>
                    <AccordionDetails>
                      <div className="form__bg">
                        <div className="form__qs">
                          <div className="question">
                            <p>{answer?.selfAssessmentTemplateSectionQuestions?.description}</p>
                          </div>
                          <Grid container>
                            <Grid item xs={12} md={6} className="supervisor__screen">
                              <div className="answer_screen">
                                <div className="answer__option">
                                  <Typography variant="h6" className={classes.youranswer}>
                                    {t('UserAnswer')}
                                  </Typography>
                                  <input
                                    type="radio"
                                    name={`radio-supervisor${index}`}
                                    checked={answer.userAnswer == 'YES'}
                                    id=""
                                    disabled
                                  />
                                  <label htmlFor="">{t('YES')} </label> <br />
                                  <input
                                    type="radio"
                                    name={`radio-supervisor${index}`}
                                    checked={answer.userAnswer == 'NO'}
                                    id=""
                                    disabled
                                  />
                                  <label htmlFor="">{t('NO')} </label> <br />
                                  <input
                                    type="radio"
                                    name={`radio-supervisor${index}`}
                                    checked={answer.userAnswer == 'NOT_APPLICABLE'}
                                    id=""
                                    disabled
                                  />
                                  <label htmlFor="">{t('Not_applicable')} </label>{' '}
                                  {answer?.userAnswer == 'NOT_APPLICABLE' && (
                                    <div className={classes.AdditionalComment}>
                                      <Typography variant="h6">{t('AdditionalComment')}</Typography>
                                      <Typography variant="body1" className={classes.commentpara}>
                                        {t('AdditionalCommentDesc')}
                                      </Typography>
                                      <Typography className={classes.textarea}>{answer?.userComment}</Typography>
                                    </div>
                                  )}
                                  {answer?.userAnswer == 'YES' && (
                                    <div className="upload__document">
                                      <div className="heading upload">
                                        <Typography variant="h6" className={classes.question}>
                                          {t('UploadDocuments')}
                                        </Typography>
                                        <p>{t('UploadDocumentsDesc')}</p>
                                      </div>
                                      <div className="upload__option">
                                        {/* <div className="upload__input">
                                        <label className="custom-file-upload">
                                          <input type="file"  value={item.userfile?item?.userFile?.file : null}/>
                                          Upload
                                        </label>
                                      </div> */}
                                        {/* <div className="guide__uploading">
                                        <p>Maximum 5 files, 5 MB per file</p>
                                        <p>Supports: PDF, PNG, JPG, HEIC</p>
                                      </div> */}

                                        {answer?.userFile?.length > 0 &&
                                          answer?.userFile?.map((item: any, fileindex: number) => (
                                            <div key={fileindex} className="upload__preview btn-preview">
                                              <div className="file__upload__preview">
                                                <div className="file__name">
                                                  <DoneIcon className="file__uploaded__tick" />
                                                  <p className="px-1 mb-0 divflex">
                                                    <button
                                                      //converted to button from anchor
                                                      onClick={() =>
                                                        handleFileDownload(item?.id, item.diskName, item?.fileName)
                                                      }
                                                    >
                                                      {item?.fileName}
                                                    </button>
                                                  </p>
                                                  <CloseIcon
                                                    // onClick={() => handleRemove(index, fileindex)}
                                                    className="file__uploaded__close"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          ))}

                                        {/* <div className="upload__preview btn-self">
                                    <div className="file__upload__preview">
                                      <div className="file__name">
                                        <DoneIcon className="file__uploaded__tick" />
                                        <p>
                                          <a
                                            href="#"
                                            onClick={() =>
                                              handleFileDownload(
                                                answer?.userFile?.id,
                                                  answer?.userFile?.fileName
                                              )
                                            }

                                          >
                                            {answer?.userFile?.fileName}
                                          </a>
                                        </p>
                                      </div>
                                     
                                    </div>
                                  </div> */}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Grid>
                            <Grid item xs={12} md={6} className="left__screen">
                              {props?.isVerifier && (
                                <div className="answer_screen">
                                  <div className="answer__option">
                                    <Typography variant="h6" className={classes.youranswer}>
                                      {t('VERIFIERAnswer')}
                                    </Typography>
                                    <input
                                      type="radio"
                                      name={`radio-verifier${index}`}
                                      checked={answer.verifierAnswer == 'YES'}
                                      id=""
                                      disabled
                                    />
                                    <label htmlFor="">{t('YES_SPECIALIST')} </label> <br />
                                    <input
                                      type="radio"
                                      name={`radio-verifier${index}`}
                                      checked={answer.verifierAnswer == 'NO'}
                                      id=""
                                      disabled
                                    />
                                    <label htmlFor="">{t('NO_SPECIALIST')} </label> <br />
                                    <input
                                      type="radio"
                                      name={`radio-verifier${index}`}
                                      checked={answer.verifierAnswer == 'NOT_APPLICABLE'}
                                      id=""
                                      disabled
                                    />
                                    <label htmlFor="">{t('Not_applicable')} </label>{' '}
                                    {answer?.verifierAnswer == 'NOT_APPLICABLE' && (
                                      <div className={classes.AdditionalComment}>
                                        <Typography variant="h6">{t('AdditionalComment')}</Typography>
                                        <Typography variant="body1" className={classes.commentpara}>
                                          {t('AdditionalCommentDesc')}
                                        </Typography>
                                        <Typography className={classes.textarea}>{answer?.verifierComment}</Typography>
                                      </div>
                                    )}
                                    {answer?.verifierAnswer == 'YES' && (
                                      <div className="upload__document">
                                        <div className="heading upload">
                                          <Typography variant="h6" className={classes.question}>
                                            {t('UploadDocuments_Optional')}
                                          </Typography>
                                          <p>{t('UploadDocumentsDesc')}</p>
                                        </div>
                                        <div className="upload__option">
                                          {/* <div className="upload__input">
                                      <label className="custom-file-upload">
                                        <input type="file"  value={item.userfile?item?.userFile?.file : null}/>
                                        Upload
                                      </label>
                                    </div> */}
                                          {/* <div className="guide__uploading">
                                      <p>Maximum 5 files, 5 MB per file</p>
                                      <p>Supports: PDF, PNG, JPG, HEIC</p>
                                    </div> */}
                                        </div>

                                        <div className="upload-parentinsp">
                                          {answer?.verifierFile?.length > 0 &&
                                            answer?.verifierFile?.map((item: any, fileindex: number) => (
                                              <div key={fileindex} className="upload__preview btn-self">
                                                <div className="file__upload__preview">
                                                  <div className="file__name">
                                                    <DoneIcon className="file__uploaded__tick" />
                                                    <p className="px-1 mb-0 divflex">
                                                      <button
                                                        //converted to button from anchor
                                                        onClick={() =>
                                                          handleFileDownload(item?.id, item.diskName, item?.fileName)
                                                        }
                                                      >
                                                        {item?.fileName}
                                                      </button>
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {props?.isInspector && (
                                <div className="answer_screen">
                                  <div className="answer__option">
                                    <Typography variant="h6" className={classes.youranswer}>
                                      {t('INSPECTORAnswer')}
                                    </Typography>
                                    <input
                                      type="radio"
                                      name={`radio-inspector${index}`}
                                      checked={answer.inspectorAnswer == 'YES'}
                                      id=""
                                      disabled
                                    />
                                    <label htmlFor="">{t('YES_SPECIALIST')} </label> <br />
                                    <input
                                      type="radio"
                                      name={`radio-inspector${index}`}
                                      checked={answer.inspectorAnswer == 'NO'}
                                      id=""
                                      disabled
                                    />
                                    <label htmlFor="">{t('NO_SPECIALIST')} </label> <br />
                                    <input
                                      type="radio"
                                      name={`radio-inspector${index}`}
                                      checked={answer.inspectorAnswer == 'NOT_APPLICABLE'}
                                      id=""
                                      disabled
                                    />
                                    <label htmlFor="">{t('Not_applicable')} </label>{' '}
                                    {answer?.inspectorAnswer == 'NOT_APPLICABLE' && (
                                      <div className={classes.AdditionalComment}>
                                        <Typography variant="h6">{t('AdditionalComment')}</Typography>
                                        <Typography variant="body1" className={classes.commentpara}>
                                          {t('AdditionalCommentDesc')}
                                        </Typography>
                                        <Typography className={classes.textarea}>{answer?.inspectorComment}</Typography>
                                      </div>
                                    )}
                                    {answer?.inspectorAnswer == 'YES' && (
                                      <div className="upload__document">
                                        <div className="heading upload">
                                          <Typography variant="h6" className={classes.question}>
                                            {t('UploadDocuments_Optional')}
                                          </Typography>
                                          <p>{t('UploadDocumentsDesc')}</p>
                                        </div>
                                        <div className="upload__option">
                                          {/* <div className="upload__input">
                                      <label className="custom-file-upload">
                                        <input type="file"  value={item.userfile?item?.userFile?.file : null}/>
                                        Upload
                                      </label>
                                    </div> */}
                                          {/* <div className="guide__uploading">
                                      <p>Maximum 5 files, 5 MB per file</p>
                                      <p>Supports: PDF, PNG, JPG, HEIC</p>
                                    </div> */}
                                        </div>
                                        <div className="upload-parentinsp">
                                          {answer?.inspectorFile?.length > 0 &&
                                            answer?.inspectorFile?.map((item: any, fileindex: number) => (
                                              <div key={fileindex} className="upload__preview btn-self">
                                                <div className="file__upload__preview">
                                                  <div className="file__name">
                                                    <DoneIcon className="file__uploaded__tick" />
                                                    <p className="px-1 mb-0 divflex">
                                                      <button
                                                        // href="#" //converted to button from anchor
                                                        onClick={() =>
                                                          handleFileDownload(item?.id, item.diskName, item?.fileName)
                                                        }
                                                      >
                                                        {item?.fileName}
                                                      </button>
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {props?.isSuperVisor && (
                                <div className="answer_screen">
                                  <div className="answer__option">
                                    <Typography variant="h6" className={classes.youranswer}>
                                      {t('SUPERVISIORAnswer')}
                                    </Typography>
                                    <input
                                      type="radio"
                                      name={`radio-visor${index}`}
                                      checked={answer.supervisorAnswer == 'YES'}
                                      id=""
                                      disabled
                                    />
                                    <label htmlFor="">{t('YES_SPECIALIST')} </label> <br />
                                    <input
                                      type="radio"
                                      name={`radio-visor${index}`}
                                      checked={answer.supervisorAnswer == 'NO'}
                                      id=""
                                      disabled
                                    />
                                    <label htmlFor="">{t('NO_SPECIALIST')} </label> <br />
                                    <input
                                      type="radio"
                                      name={`radio-visor${index}`}
                                      checked={answer.supervisorAnswer == 'NOT_APPLICABLE'}
                                      id=""
                                      disabled
                                    />
                                    <label htmlFor="">{t('Not_applicable')} </label>{' '}
                                    {answer?.supervisorAnswer == 'NOT_APPLICABLE' && (
                                      <div className={classes.AdditionalComment}>
                                        <Typography variant="h6">{t('AdditionalComment')}</Typography>
                                        <Typography variant="body1" className={classes.commentpara}>
                                          {t('AdditionalCommentDesc')}
                                        </Typography>
                                        <Typography className={classes.textarea}>
                                          {answer?.supervisorComment}
                                        </Typography>
                                      </div>
                                    )}
                                    {answer?.supervisorAnswer == 'YES' && (
                                      <div className="upload__document">
                                        <div className="heading upload">
                                          <Typography variant="h6" className={classes.question}>
                                            {t('UploadDocuments_Optional')}
                                          </Typography>
                                          <p>{t('UploadDocumentsDesc')}</p>
                                        </div>
                                        <div className="upload__option">
                                          {/* <div className="upload__input">
                                      <label className="custom-file-upload">
                                        <input type="file"  value={item.userfile?item?.userFile?.file : null}/>
                                        Upload
                                      </label>
                                    </div> */}
                                          {/* <div className="guide__uploading">
                                      <p>Maximum 5 files, 5 MB per file</p>
                                      <p>Supports: PDF, PNG, JPG, HEIC</p>
                                    </div> */}
                                        </div>

                                        <div className="upload__preview btn-self w-100 upload-parentinsp">
                                          {answer?.supervisorFile?.length > 0 &&
                                            answer?.supervisorFile?.map((item: any, fileindex: number) => (
                                              <div key={fileindex} className="upload__preview btn-self">
                                                <div className="file__upload__preview insp-preview">
                                                  <div className="file__name">
                                                    <DoneIcon className="file__uploaded__tick" />
                                                    <p className="px-1 mb-0 divflex">
                                                      <button
                                                        // href="#" //converted to button from anchor
                                                        onClick={() =>
                                                          handleFileDownload(item?.id, item?.diskName, item?.fileName)
                                                        }
                                                      >
                                                        {item?.fileName}
                                                      </button>
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Grid>
            </Grid>
            <Divider sx={{ mt: 3, mb: 2 }}></Divider>
          </>
        ))}
      </>
    </BoxWrapper>
  );
}

export default CompareAssessmentAnswerSection;
