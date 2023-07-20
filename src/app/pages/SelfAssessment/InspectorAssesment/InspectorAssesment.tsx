// import "../SelfAssessment.css";
import { Container, Divider, Stack, Typography } from '@mui/material';
import { Button, Loader } from '@takamol/qiwa-react-library';
import { makeStyles } from '@mui/styles';
import React, { Fragment, useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { useHistory, useParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import { FormControl, MenuItem, Select } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import ArrowBackwordIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import '../../../../../public/css/InspectorAssesment.css';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { setLoading, setNotLoading } from 'src/store/actions';
import { CircularProgressWithLabel } from 'src/components/progessBar/progressBar';
import { RejectSubmitDialogBox } from '../CompareAssessment/RejectSubmitDialogBox';
import BoxWrapper from '../../../../components/ui/BoxWrapper';
import { AcceptRejectSubmitDialog } from '../CompareAssessment/AcceptRejectSubmitDialog';
import FinalComment from '../FinalComment';
import {
  GETSELFASSESSMENTBYECONOMICID,
  SELFASSESSMENTQUESTIONANSWER,
  PCREQUESTSCARD,
  ASSESSMENTFILEUPLOAD,
  PERFORMANCECARDREQUESTBYUSER,
  ASSESSMENTVISITS,
  MARKVISITCOMPLETE,
  ASSESSMENTVISITBYPERFORMACECARDREQUEST,
  PATCHASSESMENTVISIT,
} from '../../../../utils/common/endpoint';
import { E2A, fileToBase64, GetCurrentDate } from '../../../../utils/common/utils';
import {
  PostRequestProxy,
  GetRequest,
  PostRequest,
  PatchRequest,
  PutRequest,
  BASEURLFiles,
  BASEURLFile,
  axiosObject,
  PostRequestProxyWithLoader,
} from '../../../../Axios/axios';
import { SelfAssessmentTopHeader } from '../SelfAssessmentQuestions/SelfAssessmentTopHeader';
import { SelfAssessmentSectionTopic } from '../SelfAssessmentQuestions/SelfAssessmentSectionTopic';
import Success from '../../../../components/Modal.Success';
// import OutlinedCard from "../../../../components/";
import Error from '../../../../components/Modal.Error';
import { useLocale } from 'src/hooks/useLocale/useLocale';
import { AppRoute } from 'src/routing/routes';
import useAuthData from 'src/hooks/useAuthData';

import OutlinedCard from './Card';

const CREATE_ASSESMENT_VISITS = `CreateAssessmentVisits`;
interface MyObject {
  [key: string]: any;
}
interface keys {
  username: string;
  answername: string;
  filename: string;
  comment: string;
  score: string;
  status: string;
}

const useStyles = makeStyles((theme: any) => ({
  btnHeader: {
    marginLeft: '10px!important',
    border: '1px solid',
    padding: '10px 25px!important',
  },
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
    flip: true,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    // marginTop: theme.spacing(2),
    // marginRight: theme.spacing(1),
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
    marginLeft: '10px !important',
    padding: '12px !important',
    '@media (max-width: 820px)': {
      minWidth: '100px !important',
    },
  },
  saveBtn: {
    backgroundColor: '#1482870a',
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
    // marginBottom: theme.spacing(1),
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
    backgroundColor: '#f5f5f5!important',
    borderRadius: '50px',
    padding: '7px',
    color: '#1c5a7d',
    width: '40px !important',
    height: '40px !important',
  },
  youranswer: { marginBottom: '20px!important' },
  AdditionalComment: {
    marginBottom: '40px!important',
  },
  inputcomment: { width: '100px' },
  textarea: {
    border: '1px solid #E3E4E9',
    padding: '10px',
    resize: 'none',
    color: 'rgba(0, 0, 0, 0.54)',
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
  formoption: {
    height: '50px',
    marginBottom: '2px',
  },
  btnReject: {
    // color: "#ff5246!important",
    // border: "1px solid #ff5246!important",
    marginRight: '10px!important',
    marginLeft: '10px!important',
    // backgroundColor: "#ECF5F5!important",
    padding: '10px !important',
    border: '1px solid #1C5A7D!important',
  },
  btnApprove: {
    padding: '10px !important',
    marginLeft: '10px!important',
    border: '1px solid #1C5A7D!important',
  },
  commentBox: {
    textAlign: 'left',
  },
  commentArea: {
    border: '1px solid #E3E4E9',
    borderRadius: '5px',
    marginTop: '5px',
    width: '100%',
    height: '100px',
    resize: 'none',
  },
  dropdownhd: {
    flip: false,
    marginLeft: '10px',
    marginRight: '10px',
    '& .MuiSelect-select': {
      paddingTop: '9px',
      minWidth: '225px',
    },
  },
  visitDate: {
    margin: '20px',
    padding: '20px',
  },
}));

function SelfAssessmentQuestion() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const classes = useStyles();
  const { t, locale } = useLocale();
  const history = useHistory();
  const { id } = useParams<any>();
  const dispatch = useDispatch();

  const pcRequestId = localStorage.getItem('pcrId');
  const user = useSelector((state: any) => state.user);
  const [openPublishDialog, setOpenPublishDialog] = React.useState(false);
  const [assessmentAnswers, setAssessmentAnswers] = useState<any>({});
  const [totalWeight, setTotalWeight] = useState<any>(0);
  const [comment, setComment] = useState<string>('');
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [pcrRequest, setPcrRequest] = useState<any>('');
  const [status, setStatus] = useState(false);
  const [company, setCompany] = useState<any>('');
  const [file, setFile] = useState<any>('');
  const [progress, setProgress] = React.useState(0);

  interface MyObject {
    [key: string]: any;
  }

  const [establishmentVisit, setEstablishmentVisit] = useState<any>({
    visitStatus: 'false',
    visitDateTime: '',
    establishment: {
      id: '',
    },
    userId: {
      userId: user?.userId,
    },
    performanceCardRequestId: {
      id: id,
    },
  });

  const [establishmentVisitData, setEstablishmentVisitData] = useState<any>([]);
  const [selfAssessmentQuestions, setSelfAssessmentQuestions] = React.useState<any>();
  const [currentKeys, setCurrentKeys] = React.useState<any>('');
  const [selectedAssessmentUser, setSelectedAssessmentUser] = useState('self');
  const [Id, setId] = useState<any | null>(0);
  const loading = useSelector((state: any) => state.loading);

  const [userPcRequests, setUserPcRequests] = useState<any | null>();

  const verifierKeys: keys = {
    username: 'verifier',
    answername: 'verifierAnswer',
    filename: 'verifierFile',
    comment: 'verifierComment',
    score: 'verifierScore',
    status: 'Auditor Finished',
  };

  const inspectorKeys: keys = {
    username: 'inspector',
    answername: 'inspectorAnswer',
    filename: 'inspectorFile',
    comment: 'inspectorComment',
    score: 'inspectorScore',
    status: 'Inspector Finished',
  };
  const supervisorKeys: keys = {
    username: 'supervisor',
    answername: 'supervisorAnswer',
    filename: 'supervisorFile',
    comment: 'supervisorComment',
    score: 'supervisorScore',
    status: 'Supervised',
  };
  const [payloadKeys, setPayloadKeys] = React.useState<any>(
    user?.role?.role == 'INSPECTOR'
      ? inspectorKeys
      : user?.role?.role == 'VERIFIER'
      ? verifierKeys
      : user?.role?.role == 'SUPERVISIOR'
      ? supervisorKeys
      : '',
  );
  // useEffect(() => {

  // }, [user?.role]);

  function handlePublish() {
    setOpenPublishDialog(true);
  }

  function handleApprovePublish() {
    setOpenApproveDialog(true);
  }

  function handleRejectPublish() {
    setOpenRejectDialog(true);
  }

  async function ApproveRejectPCR(status: any) {
    let obj = {};
    if (status) {
      obj = {
        performanceCardRequestStatus: 'Card Issued',
      };
    } else {
      obj = {
        performanceCardRequestStatus: 'Rejected',
      };
    }
    const body = {
      id: id,
      performanceCardRequest: obj,
    };
    const result = await PostRequestProxy('PatchPerformanceCardRequest', body);
    const tempUsers: any = [];

    if (result?.data?.PatchPerformanceCardRequest?.Header?.ResponseStatus?.Code == '000') {
      const templateQeustoins: any = [];
      history.push(AppRoute.performanceCardRequests);
    }
  }
  const getVisitsByPerformanceCard = async (id: any) => {
    if (user?.role?.role != 'INSPECTOR') {
      return;
    }
    const body = {
      performanceCardId: id,
    };
    const result = await PostRequestProxy('GetAssessmentVisitsByPCRId', body);
    if (result?.data?.GetAssessmentVisitsByPCRId?.Header?.ResponseStatus?.Code == '000') {
      setEstablishmentVisitData(result?.data?.GetAssessmentVisitsByPCRId?.Body);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search); // id=123
    const status1 = params.get('resubmit');
    const establishmentId = params.get('establishmentId');
    setStatus(status1 ? true : false);
  }, [window.location.search]);

  useEffect(() => {
    if (user?.role) {
      if (user?.role != null) {
        if (user?.role?.role == 'INSPECTOR') {
          setPayloadKeys(inspectorKeys);
        } else if (user?.role?.role == 'VERIFIER') {
          setPayloadKeys(verifierKeys);
        } else if (user?.role?.role == 'SUPERVISIOR') {
          setPayloadKeys(supervisorKeys);
        }
      }
    }
  }, [user?.role]);

  useEffect(() => {
    if (payloadKeys) getPerformanceCardDetailsById(id);
  }, [payloadKeys]);

  // const getPerformanceCardRequestsByUserId = async (id: any) => {
  //   const url = `/${PERFORMANCECARDREQUESTBYUSER}${id}`;
  //   const result = await GetRequest(url);
  //   if (result && result.status === 200) {
  //     // setId(result.data[0].id)
  //     setUserPcRequests(result?.data?.map((item: any) => item?.id));
  //   }
  // };

  async function getPerformanceCardDetailsById(id: any) {
    dispatch(setLoading());

    // const url = `/${PCREQUESTSCARD}/${id}`;
    // const result = await GetRequest(url);
    // if (result && result.status === 200) {
    const body = {
      id: id,
    };
    const result = await PostRequestProxy('GetPerformanceCardRequestById', body);
    if (result?.data?.GetPerformanceCardRequestById?.Header?.ResponseStatus?.Code == '000') {
      // getPerformanceCardRequestsByUserId(result?.data?.userAssigned);
      setEstablishmentVisit({ ...establishmentVisit, establishment: { id: result?.data?.establishment?.id } });

      await getVisitsByPerformanceCard(result?.data?.GetPerformanceCardRequestById?.Body?.id);
      setPcrRequest(result?.data?.GetPerformanceCardRequestById?.Body);
      setSelfAssessmentQuestions(
        result?.data?.GetPerformanceCardRequestById?.Body?.selfAssessmentTemplateSectionQuestionsAnswers,
      );
      setCompany(result?.data?.GetPerformanceCardRequestById?.Body?.establishment?.companyNameArabic);
      const InitialAnswers: any = [];
      let totalWeight = 0;
      result?.data?.GetPerformanceCardRequestById?.Body?.selfAssessmentTemplateSectionQuestionsAnswers.length > 0 &&
        result?.data?.GetPerformanceCardRequestById?.Body?.selfAssessmentTemplateSectionQuestionsAnswers?.forEach(
          (item: any) => {
            const AnswerPayload = {
              id: item?.id,
              selfAssessmentQuestion: {
                id: item.selfAssessmentQuestion?.id,
              },
              [`${payloadKeys['username']}`]: {
                userId: user?.userId,
              },
              [`${payloadKeys['answername']}`]: '',
              [`${payloadKeys['comment']}`]: '',
              [`${payloadKeys['filename']}`]: [],
              performanceCardRequest: {
                id: id,
              },
              loading: false,
              progress: 0,
              weightage: item?.selfAssessmentQuestion?.weightage,
            };
            totalWeight += parseInt(item.selfAssessmentQuestion?.weightage);
            InitialAnswers.push(AnswerPayload);
          },
        );
      setTotalWeight(totalWeight);
      setAssessmentAnswers(InitialAnswers);
    }
    dispatch(setNotLoading());
  }

  useEffect(() => {
    if (selectedAssessmentUser == 'self') {
      setComment('');
    }
    if (selectedAssessmentUser == 'VERIFIER') {
      setCurrentKeys(verifierKeys);
      setComment(pcrRequest?.verifierComment);
    } else if (selectedAssessmentUser == 'INSPECTOR') {
      setCurrentKeys(inspectorKeys);
      setComment(pcrRequest?.inspectorComment);
    } else if (selectedAssessmentUser == 'SUPERVISIOR') {
      setCurrentKeys(supervisorKeys);
      setComment(pcrRequest?.supervisorComment);
    }
  }, [selectedAssessmentUser]);

  useEffect(() => {
    if (establishmentVisitData.length > 0) {
      setEstablishmentVisit({ ...establishmentVisit, visitStatus: 'true' });
    }
  }, [establishmentVisitData]);

  const handleAnswers = (e: any, index: number) => {
    const updatedAnswer = [...assessmentAnswers];
    if (e.target.value == 'NO' || e.target.value == 'NOT_APPLICABLE') {
      if (updatedAnswer[index][`${payloadKeys['filename']}`]) {
        updatedAnswer[index][`${payloadKeys['filename']}`] = [];
      }
    }
    if (e.target.name == `${payloadKeys['answername']}${index}`) {
      updatedAnswer[index][payloadKeys['answername']] = e.target.value;
    } else {
      updatedAnswer[index][e.target.name] = e.target.value;
    }
    setAssessmentAnswers(updatedAnswer);
  };

  const handleRemove = (index: number, fileindex: number) => {
    const updatedAnswer = [...assessmentAnswers];
    if (updatedAnswer[index][`${payloadKeys['filename']}`].length > 0) {
      updatedAnswer[index][`${payloadKeys['filename']}`].splice(fileindex, 1);
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
        newupdate[index][payloadKeys['filename']].push({
          id: response?.data?.UploadFile?.Body?.id,
          name: response?.data?.UploadFile?.Body?.name,
          diskName: response?.data?.UploadFile?.Body?.diskName,
          fileName: response?.data?.UploadFile?.Body?.fileName,
        });
        setProgress(0);
        newupdate[index].progress = false;
        newupdate[index].loading = false;
        setAssessmentAnswers(newupdate);
      }
      setFile('');
    }
  };

  const handleVisit = async () => {
    if (establishmentVisit?.visitDateTime == '') {
      Error('Please Select Date');
      return;
    }
    const params = new URLSearchParams(window.location.search); // id=123
    const establishmentId = params.get('establishmentId');
    establishmentVisit.establishment.id = establishmentId;
    const response = await PostRequestProxy(CREATE_ASSESMENT_VISITS, { assessmentVisits: establishmentVisit });
    Success(t('Visit scheduled successfully'));
    if (response.status == 200) {
      getVisitsByPerformanceCard(id);
      history.push(`/visits`);
    }
  };

  const markVisitComplete = async (aid: number) => {
    const obj = {
      id: aid,
      queryParams: {
        visitStatus: true,
      },
    };
    const response = await PostRequestProxy(PATCHASSESMENTVISIT, obj);
    if (response) {
      getVisitsByPerformanceCard(id);
      Success('Visit Completed Successfully');
    }
  };

  const handleSubmitAnswers = async () => {
    let totalYes = 0;
    let notApplicableTotal = 0;
    assessmentAnswers.forEach((data: any) => {
      if (data[payloadKeys.answername] == 'YES') {
        totalYes += data.weightage;
      } else if (data[payloadKeys.answername] == 'NOT_APPLICABLE') {
        notApplicableTotal += data.weightage;
      }
    });
    let percentage = 0;
    if (notApplicableTotal == totalWeight) {
      percentage = Math.floor(100);
    } else {
      percentage = Math.floor((totalYes / (totalWeight - notApplicableTotal)) * 100);
    }
    const keysToRemove: string[] = ['progress', 'weightage', 'loading'];
    const newArray: MyObject[] = assessmentAnswers.map((obj: any) => {
      const newObj: MyObject = {};
      for (const key in obj) {
        if (!keysToRemove.includes(key)) {
          newObj[key] = obj[key];
        }
      }
      return newObj;
    });
    const payload = {
      selfAssessmentTemplateSectionQuestionsAnswersList: newArray,
    };
    const result = await PostRequestProxy('UpdatePutSelfAssessmentTemplateSectionQuestionAnswer', payload);

    if (result?.data?.UpdatePutSelfAssessmentTemplateSectionQuestionAnswer?.Header?.ResponseStatus?.Code == '000') {
      const body = {
        id: id,
        performanceCardRequest: {
          [payloadKeys.score]: percentage ? percentage : 0,
          [payloadKeys.comment]: comment,
          performanceCardRequestStatus: payloadKeys?.status,
        },
      };
      const pcRequestResponse = await PostRequestProxy('PatchPerformanceCardRequest', body);
      const tempUsers: any = [];
      console.log(
        'result?.data?.PatchPerformanceCardRequest?.Header?.ResponseStatus?.Code',
        pcRequestResponse?.data?.PatchPerformanceCardRequest?.Header?.ResponseStatus?.Code,
      );
      if (pcRequestResponse?.data?.PatchPerformanceCardRequest?.Header?.ResponseStatus?.Code == '000') {
        history.push(`/compare-assessment/${id}`);
      }
    }
  };

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
  // const response = await axios
  //   .get(`${BASEURLFile}/${name}`, {
  //     responseType: 'blob',

  //     headers: {
  //       // Authorization: `Bearer ${store.getState().token}`, // add authentication information as required by the backend APIs.
  //     },
  //   })
  //   .then((response: any) => {
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', `${filename}`); //or any other extension
  //     document.body.appendChild(link);
  //     link.click();
  //   });

  const DropDownUsers = () => {
    const users = [];
    if (
      pcrRequest.selfAssessmentTemplateSectionQuestionsAnswers.length > 0 &&
      pcrRequest?.selfAssessmentTemplateSectionQuestionsAnswers[0].verifier != null &&
      (user?.role?.role == 'VERIFIER' || user?.role?.role == 'INSPECTOR' || user?.role?.role == 'SUPERVISIOR')
    ) {
      users.push({ key: 'VERIFIER ASSESSMENT', value: 'VERIFIER' });
    }
    if (
      pcrRequest.selfAssessmentTemplateSectionQuestionsAnswers.length > 0 &&
      pcrRequest?.selfAssessmentTemplateSectionQuestionsAnswers[0].inspector != null &&
      (user?.role?.role == 'INSPECTOR' || user?.role?.role == 'SUPERVISIOR')
    ) {
      users.push({ key: 'INSPECTOR ASSESSMENT', value: 'INSPECTOR' });
    }
    if (
      pcrRequest.selfAssessmentTemplateSectionQuestionsAnswers.length > 0 &&
      pcrRequest?.selfAssessmentTemplateSectionQuestionsAnswers[0].supervisor != null &&
      user?.role?.role == 'SUPERVISIOR'
    ) {
      users.push({ key: 'SUPERVISIOR ASSESSMENT', value: 'SUPERVISIOR' });
    }

    return users;
  };

  const handleProgress = (progressData: any, index: any) => {
    const data = [...assessmentAnswers];
    data[index].progress = progressData;
    setAssessmentAnswers(data);
  };

  return (
    <>
      {loading ? (
        <div className="loading">
          <Loader size={200} style={{ textAlign: 'center' }} thickness={6} />
        </div>
      ) : (
        assessmentAnswers &&
        assessmentAnswers.length > 0 && (
          <Container className={classes.root}>
            <form onSubmit={handleSubmit(handleSubmitAnswers)}>
              {/* {(establishmentVisit.visitStatus == 'true' || !(user?.role?.role == 'INSPECTOR')) && ( */}
              <>
                <Container className="esb-container-2" style={{ marginTop: '20px' }}>
                  <Grid container>
                    <Grid item xs={12}>
                      <>
                        <div className="innerContainer">
                          <Grid container spacing={2}>
                            <Grid xs={5}></Grid>
                            <Grid item xs={7} justifyItems={'end'} margin="auto" display="flex" justifyContent={'end'}>
                              <>
                                {/* {(pcrRequest?.resubmitStatus == 'ReSubmit' || status) && (
                                <Select
                                  variant="outlined"
                                  displayEmpty
                                  name="role"
                                  className={classes.dropdownhd}
                                  value={Id}
                                  onChange={(e) => setId(e.target.value)}
                                >
                                  <MenuItem value={Id}>{t(`Previous PCR Requests`)}</MenuItem>
                                  {userPcRequests && userPcRequests.length > 0
                                    ? userPcRequests.map((item: any, index: number) => (
                                        <MenuItem
                                          key={index}
                                          onClick={() => history.push(`/insepector-assessment/${item}?resubmit=true`)}
                                          value={item}
                                        >
                                          {index == 0
                                            ? `${t(`Current PCR Request`)}`
                                            : `${t(`PCR Request Attempt`)} ${E2A(
                                                String(userPcRequests.length - index),
                                                locale,
                                              )}`}
                                        </MenuItem>
                                      ))
                                    : ''}
                                </Select>
                              )} */}

                                <Button
                                  variant="outlined"
                                  color="primary"
                                  className={classes.btnHeader}
                                  onClick={() => history.goBack()}
                                >
                                  <ArrowBackwordIcon />
                                </Button>
                                {selectedAssessmentUser == 'self' && (
                                  <>
                                    {/* <Button
                    className={classes.saveBtn}
                    // hidden={stepIndex === 0}
                    color="primary"
                    size="large"
                    type="submit"
                    onClick={handleSubmit}
                    sx={{ ml: 2 }}
                  >
                    <SaveIcon color="primary" className={classes.saveBtnIcon} />
                    {t("Save&exit")}
                  </Button> */}

                                    {pcrRequest?.performanceCardRequestStatus != 'REJECTED' && (
                                      <Button
                                        color="primary"
                                        className={classes.nxtBtn}
                                        sx={{ ml: 1 }}
                                        type="submit"
                                        disabled={
                                          !(user?.role?.role == 'INSPECTOR'
                                            ? establishmentVisit?.visitStatus == 'false'
                                              ? false
                                              : true
                                            : true)
                                        }
                                      >
                                        {t('Submit')}
                                      </Button>
                                    )}
                                  </>
                                )}
                                {user?.role?.role == 'SUPERVISIOR' &&
                                pcrRequest?.performanceCardRequestStatus != 'CARD_ISSUED' &&
                                (pcrRequest?.finalScore == null
                                  ? pcrRequest?.score >= 50
                                  : pcrRequest?.finalScore >= 50) ? (
                                  <Button
                                    color="primary"
                                    className={classes.btnApprove}
                                    sx={{ ml: 1 }}
                                    onClick={handleApprovePublish}
                                    disabled={
                                      pcrRequest?.performanceCardRequestStatus == 'CARD_ISSUED' ||
                                      pcrRequest?.performanceCardRequestStatus == 'REJECTED'
                                    }
                                  >
                                    {t('Approve')}
                                  </Button>
                                ) : (
                                  ''
                                )}

                                {user?.role?.role == 'SUPERVISIOR' &&
                                pcrRequest?.performanceCardRequestStatus != 'CARD_ISSUED' ? (
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    className={classes.btnReject}
                                    onClick={handleRejectPublish}
                                    disabled={
                                      pcrRequest?.performanceCardRequestStatus == 'CARD_ISSUED' ||
                                      pcrRequest?.performanceCardRequestStatus == 'REJECTED'
                                    }
                                  >
                                    {t('Reject')}
                                  </Button>
                                ) : (
                                  ''
                                )}
                              </>
                            </Grid>
                          </Grid>
                        </div>
                      </>
                    </Grid>
                  </Grid>
                </Container>
                {/* <BoxWrapper>
                  <SelfAssessmentTopHeader
                    title={selfAssessmentQuestions?.selfAssessmentName}
                    subtitle={selfAssessmentQuestions?.selfAssessmentName}
                  >

                  </SelfAssessmentTopHeader>
                </BoxWrapper> */}

                {user?.role?.role == 'INSPECTOR' && (
                  <BoxWrapper>
                    <>
                      <Grid container>
                        <Grid item xs={12} md={1} textAlign="left">
                          <DoneIcon className={classes.done__icon} />
                        </Grid>

                        <Grid item xs={12} md={11}>
                          <div>
                            <Accordion expanded={true}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon className={classes.icon_expand} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography variant="h6" className={classes.question}>
                                  {t(`Have you visited the organization?`)}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <div className="form__bg">
                                  <div className="form__qs">
                                    <div className="question">{/* <p>{item.description}</p>  */}</div>

                                    <div className="answer__option" style={{ marginBottom: '0px' }}>
                                      <input
                                        type="radio"
                                        name="visitStatus"
                                        value={'true'}
                                        checked={establishmentVisit?.visitStatus == 'true' ? true : false}
                                        onChange={(e) =>
                                          setEstablishmentVisit({
                                            ...establishmentVisit,
                                            [e.target.name]: e.target.value,
                                          })
                                        }
                                        required
                                      />
                                      <label htmlFor="">{t('YES')} </label> <br />
                                      <input
                                        type="radio"
                                        name="visitStatus"
                                        value={'false'}
                                        onChange={(e) =>
                                          setEstablishmentVisit({
                                            ...establishmentVisit,
                                            [e.target.name]: e.target.value,
                                          })
                                        }
                                        required
                                      />
                                      <label htmlFor="">{t('NO')} </label> <br />
                                    </div>
                                  </div>
                                  <div></div>

                                  {establishmentVisit.visitStatus == 'true' &&
                                    Object.keys(establishmentVisitData).length > 0 &&
                                    establishmentVisitData?.map((item: any, index: number) => {
                                      return <OutlinedCard key={index} data={item} handleVisit={markVisitComplete} />;
                                    })}
                                  {establishmentVisit.visitStatus == 'false' && (
                                    <>
                                      <div>
                                        <label htmlFor="">{t('VisitDate')} </label>
                                        <input
                                          type="datetime-local"
                                          name="visitDateTime"
                                          className={classes.visitDate}
                                          min={GetCurrentDate()}
                                          onChange={(e) =>
                                            setEstablishmentVisit({
                                              ...establishmentVisit,
                                              visitDateTime: new Date(e.target.value).toISOString(),
                                            })
                                          }
                                          required
                                        />
                                      </div>
                                      <br />

                                      <Button
                                        color="primary"
                                        className={classes.nxtBtn}
                                        onClick={() => handleVisit()}
                                        style={{ marginLeft: '10px' }}
                                        type="submit"
                                      >
                                        {t('Submit')}
                                      </Button>
                                    </>
                                  )}
                                  <br />
                                </div>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        </Grid>
                      </Grid>

                      <Divider sx={{ mt: 1, mb: 1 }}></Divider>
                    </>
                  </BoxWrapper>
                )}
                {
                  <>
                    {' '}
                    <BoxWrapper>
                      <>
                        <div className={classes.main}>
                          {/* <div className={classes.sectionNumberWrapper}>
                      <Typography color="primary" variant="h5">
                        {t('1')}
                      </Typography>
                    </div> */}
                          <div className="inspTitle">
                            <SelfAssessmentSectionTopic
                              topicHeader={''}
                              topic={company}
                              topicDescription={'Please provide us your answers about safety of your establishment.'}
                            />
                          </div>
                        </div>
                        <Divider sx={{ mt: 3, mb: 2 }}></Divider>
                        {selfAssessmentQuestions?.map((item: any, index: number) => {
                          return (
                            <div key={index}>
                              <Grid container>
                                <Grid item xs={12} md={12}>
                                  <div key={item.id}>
                                    <Accordion defaultExpanded={true} expanded={true} className="accordiondiv">
                                      <div className="w-100 divflex">
                                        <div className="text-center mblw-5">
                                          {/* <DoneIcon className={classes.done__icon} /> */}
                                          {assessmentAnswers[index][payloadKeys?.answername] == 'YES' ||
                                          assessmentAnswers[index][payloadKeys?.answername] == 'NOT_APPLICABLE' ? (
                                            <DoneIcon className={classes.done__icon} />
                                          ) : assessmentAnswers[index][payloadKeys?.answername] == 'NO' ? (
                                            <CloseRoundedIcon
                                              sx={{ fontSize: '30px', color: 'red', marginTop: '10px' }}
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
                                              <span>{index + 1}. &nbsp;</span>
                                              {locale == 'ar'
                                                ? item?.selfAssessmentQuestion?.questionArabic
                                                : item?.selfAssessmentQuestion?.questionEnglish}
                                            </Typography>
                                          </AccordionSummary>
                                        </div>
                                      </div>
                                      <AccordionDetails>
                                        <div className="form__bg">
                                          <div className="form__qs">
                                            <div className="question">
                                              <p>{item?.selfAssessmentQuestion?.description}</p>
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
                                                      checked={item.userAnswer == 'YES'}
                                                      id=""
                                                      disabled
                                                    />
                                                    <label htmlFor="">{t('YES')} </label> <br />
                                                    <input
                                                      type="radio"
                                                      name={`radio-supervisor${index}`}
                                                      checked={item.userAnswer == 'NO'}
                                                      id=""
                                                      disabled
                                                    />
                                                    <label htmlFor="">{t('NO')} </label> <br />
                                                    <input
                                                      type="radio"
                                                      name={`radio-supervisor${index}`}
                                                      checked={item.userAnswer == 'NOT_APPLICABLE'}
                                                      id=""
                                                      disabled
                                                    />
                                                    <label htmlFor="">{t('Not_applicable')} </label>{' '}
                                                  </div>
                                                  {item.userAnswer == 'NOT_APPLICABLE' && (
                                                    <div className={classes.AdditionalComment}>
                                                      <Typography variant="h6">{t('AdditionalComment')}</Typography>
                                                      <Typography className={classes.textarea}>
                                                        {item.userComment}
                                                      </Typography>
                                                    </div>
                                                  )}
                                                  {item.userAnswer == 'YES' && (
                                                    <div className="upload__document">
                                                      <div className="heading upload">
                                                        <Typography variant="h6" className={classes.question}>
                                                          {t('UploadDocuments')}
                                                        </Typography>
                                                        <p>{t('UploadDocumentsDesc')}</p>
                                                      </div>
                                                      <div className="upload__option"></div>
                                                      <div className="upload__preview btn-self w-100 upload-parentinsp">
                                                        {item?.userFile?.length > 0 &&
                                                          item?.userFile?.map((file: any, fileindex: number) => (
                                                            <div
                                                              key={fileindex}
                                                              className="upload__preview btn-preview"
                                                            >
                                                              <div className="file__upload__preview">
                                                                <div className="file__name">
                                                                  <DoneIcon className="file__uploaded__tick" />
                                                                  <p className="px-1 mb-0 divflex">
                                                                    <button
                                                                      // href="#" button converted from anchor
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
                                                                  {/* <CloseIcon
                                                                onClick={() => handleRemove(index, fileindex)}
                                                                className="file__uploaded__close"
                                                              /> */}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          ))}
                                                      </div>
                                                    </div>
                                                  )}
                                                </div>
                                              </Grid>

                                              <Grid item xs={12} md={6} className="left__screen">
                                                <div className="answer_screen">
                                                  {index === 0 && (
                                                    <div className="mt-15p">
                                                      <Select
                                                        variant="outlined"
                                                        displayEmpty
                                                        fullWidth
                                                        name="role"
                                                        className={classes.formoption}
                                                        value={selectedAssessmentUser}
                                                        onChange={(e) => setSelectedAssessmentUser(e.target.value)}
                                                        required
                                                      >
                                                        <MenuItem value={'self'}>{t(`MyAssesment`)}</MenuItem>
                                                        {DropDownUsers().map((item: any, index: any) => (
                                                          <MenuItem key={index} value={item.value}>
                                                            {t(item.key)}
                                                          </MenuItem>
                                                        ))}
                                                      </Select>
                                                    </div>
                                                  )}
                                                  {selectedAssessmentUser == 'self' &&
                                                    pcrRequest?.performanceCardRequestStatus !== 'CARD_ISSUED' && (
                                                      <div className="answer__option">
                                                        <Typography variant="h6" className={classes.youranswer}>
                                                          {t(`${user?.role?.role}Answer`)}
                                                          &nbsp;
                                                        </Typography>
                                                        <input
                                                          type="radio"
                                                          name={`${payloadKeys?.answername}${index}`}
                                                          value="YES"
                                                          checked={
                                                            assessmentAnswers[index][payloadKeys?.answername] == 'YES'
                                                          }
                                                          id={`index${index}`}
                                                          disabled={
                                                            !(user?.role?.role == 'INSPECTOR'
                                                              ? establishmentVisit?.visitStatus == 'false'
                                                                ? false
                                                                : true
                                                              : true)
                                                          }
                                                          // checked={assessmentAnswers[index][payloadKeys?.answername] == 'YES'}
                                                          onChange={(e) => handleAnswers(e, index)}
                                                        />
                                                        <label htmlFor="">{t('YES_SPECIALIST')} </label> <br />
                                                        <input
                                                          type="radio"
                                                          name={`${payloadKeys?.answername}${index}`}
                                                          value="NO"
                                                          id={`index${index}`}
                                                          checked={
                                                            assessmentAnswers[index][payloadKeys?.answername] == 'NO'
                                                          }
                                                          onChange={(e) => handleAnswers(e, index)}
                                                          disabled={
                                                            !(user?.role?.role == 'INSPECTOR'
                                                              ? establishmentVisit?.visitStatus == 'false'
                                                                ? false
                                                                : true
                                                              : true)
                                                          }
                                                          required
                                                        />
                                                        <label htmlFor="">{t('NO_SPECIALIST')} </label> <br />
                                                        <input
                                                          type="radio"
                                                          name={`${payloadKeys.answername}${index}`}
                                                          value="NOT_APPLICABLE"
                                                          id={`index${index}`}
                                                          checked={
                                                            assessmentAnswers[index][payloadKeys.answername] ==
                                                            'NOT_APPLICABLE'
                                                          }
                                                          onChange={(e) => handleAnswers(e, index)}
                                                          disabled={
                                                            !(user?.role?.role == 'INSPECTOR'
                                                              ? establishmentVisit?.visitStatus == 'false'
                                                                ? false
                                                                : true
                                                              : true)
                                                          }
                                                          required
                                                        />
                                                        <label htmlFor="">{t('Not_applicable')} </label> <br />
                                                        {assessmentAnswers[index][payloadKeys.answername] == 'YES' && (
                                                          <div className="upload__document">
                                                            <div className="heading upload">
                                                              <Typography variant="h6" className={classes.question}>
                                                                {t('UploadDocuments_Optional')}
                                                              </Typography>
                                                              <p>{t('UploadDocumentsDesc')}</p>
                                                            </div>
                                                            {assessmentAnswers[index][payloadKeys.answername] ==
                                                              'YES' &&
                                                              assessmentAnswers[index][payloadKeys.filename].length <
                                                                5 &&
                                                              !assessmentAnswers[index].loading && (
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
                                                                        onClick={(event: any) => {
                                                                          event.currentTarget.value = null;
                                                                        }}
                                                                        name={`${[payloadKeys.filename]}${index}`}
                                                                        onChange={(e) => handleFileUpload(e, index)}
                                                                        // required={
                                                                        //   assessmentAnswers[index][payloadKeys.filename]
                                                                        //     .length <= 0
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
                                                              {assessmentAnswers[index].loading && (
                                                                <CircularProgressWithLabel
                                                                  value={assessmentAnswers[index].progress}
                                                                />
                                                              )}
                                                            </Stack>
                                                            <div className="upload-parentinsp">
                                                              {assessmentAnswers[index][payloadKeys.filename].length >
                                                                0 &&
                                                                assessmentAnswers[index][payloadKeys.filename].map(
                                                                  (item: any, indexFilePayload: number) => (
                                                                    <div
                                                                      key={item?.id}
                                                                      className="upload__preview btn-preview"
                                                                    >
                                                                      <div className="file__upload__preview">
                                                                        <div className="file__name">
                                                                          <DoneIcon className="file__uploaded__tick" />
                                                                          <p className="px-1 mb-0 divflex">
                                                                            <button
                                                                              // href="#" button converted from anchor href="#"

                                                                              onClick={() =>
                                                                                handleFileDownload(
                                                                                  item?.id,
                                                                                  item?.diskName,
                                                                                  item.fileName,
                                                                                )
                                                                              }
                                                                            >
                                                                              {item?.fileName}
                                                                            </button>
                                                                          </p>
                                                                          <CloseIcon
                                                                            onClick={() =>
                                                                              handleRemove(index, indexFilePayload)
                                                                            }
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
                                                        {assessmentAnswers[index][payloadKeys['answername']] ==
                                                          'NOT_APPLICABLE' && (
                                                          <>
                                                            <label htmlFor="userComment">
                                                              <strong>{t('COMMENT')}</strong>{' '}
                                                            </label>{' '}
                                                            <textarea
                                                              rows={4}
                                                              cols={50}
                                                              name={`${payloadKeys.comment}`}
                                                              className={classes.commentArea}
                                                              value={assessmentAnswers[index][payloadKeys.comment]}
                                                              onChange={(e) => handleAnswers(e, index)}
                                                              maxLength={2000}
                                                              required
                                                            ></textarea>
                                                          </>
                                                        )}
                                                      </div>
                                                    )}

                                                  {/* when verfier Assement is Selected */}

                                                  {selectedAssessmentUser != 'self' && (
                                                    <div className="left__screen">
                                                      <div className="answer_screen">
                                                        <div className="answer__option">
                                                          <Typography variant="h6" className={classes.youranswer}>
                                                            {t(`${selectedAssessmentUser}Answer`)}
                                                          </Typography>
                                                          <input
                                                            type="radio"
                                                            name={`radio${index}`}
                                                            checked={item[currentKeys.answername] == 'YES'}
                                                            id=""
                                                            disabled
                                                          />
                                                          <label htmlFor="">{t('YES')} </label> <br />
                                                          <input
                                                            type="radio"
                                                            name={`radio${index}`}
                                                            checked={item[currentKeys.answername] == 'NO'}
                                                            id=""
                                                            disabled
                                                          />
                                                          <label htmlFor="">{t('NO')} </label> <br />
                                                          <input
                                                            type="radio"
                                                            name={`radio${index}`}
                                                            checked={item[currentKeys.answername] == 'NOT_APPLICABLE'}
                                                            id=""
                                                            disabled
                                                          />
                                                          <label htmlFor="">{t('Not_applicable')} </label>{' '}
                                                        </div>
                                                        {item[currentKeys.answername] == 'NOT_APPLICABLE' && (
                                                          <div className={classes.AdditionalComment}>
                                                            <Typography variant="h6">
                                                              {t('AdditionalComment')}
                                                            </Typography>
                                                            <Typography className={classes.textarea}>
                                                              {item[currentKeys.comment]}
                                                            </Typography>
                                                          </div>
                                                        )}
                                                        {item[currentKeys.answername] == 'YES' && (
                                                          <div className="upload__document">
                                                            <div className="heading upload">
                                                              <Typography variant="h6" className={classes.question}>
                                                                {t('UploadDocuments')}
                                                              </Typography>
                                                              <p>{t('UploadDocumentsDesc')}</p>
                                                            </div>
                                                            <div className="upload__option"></div>

                                                            <div className="upload__preview btn-self upload-parentinsp">
                                                              {item[currentKeys.filename].length > 0 &&
                                                                item[currentKeys.filename]?.map(
                                                                  (file: any, indexFile: any) => (
                                                                    <div
                                                                      key={indexFile}
                                                                      className="file__upload__preview"
                                                                    >
                                                                      <div className="file__name">
                                                                        <DoneIcon className="file__uploaded__tick" />
                                                                        <p className="px-1 mb-0 divflex">
                                                                          <button
                                                                            // href="#" button converted from anchorhref="#"
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
                                                                    </div>
                                                                  ),
                                                                )}
                                                            </div>
                                                          </div>
                                                        )}
                                                      </div>
                                                    </div>
                                                  )}
                                                </div>
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
                            </div>
                          );
                        })}
                      </>
                    </BoxWrapper>
                    <BoxWrapper>
                      <FinalComment setComment={setComment} comment={comment} />
                    </BoxWrapper>
                    <SelfAssessmentTopHeader
                      title={selfAssessmentQuestions?.selfAssessmentName}
                      subtitle={selfAssessmentQuestions?.selfAssessmentName}
                    >
                      <>
                        {/* {(pcrRequest?.resubmitStatus == 'ReSubmit' || status) && (
                          <Select
                            variant="outlined"
                            displayEmpty
                            name="role"
                            className={classes.dropdownhd}
                            value={Id}
                            onChange={(e) => setId(e.target.value)}
                          >
                            <MenuItem value={Id}>{t(`Previous PCR Requests`)}</MenuItem>
                            {userPcRequests && userPcRequests.length > 0
                              ? userPcRequests.map((item: any, index: number) => (
                                  <MenuItem
                                    key={index}
                                    onClick={() => history.push(`/insepector-assessment/${item}?resubmit=true`)}
                                    value={item}
                                  >
                                    {index == 0
                                      ? `${t(`Current PCR Request`)}`
                                      : `${t(`PCR Request Attempt`)} ${E2A(
                                          String(userPcRequests.length - index),
                                          locale,
                                        )}`}
                                  </MenuItem>
                                ))
                              : ''}
                          </Select>
                        )} */}

                        {selectedAssessmentUser == 'self' && (
                          <>
                            {/* <Button
                    className={classes.saveBtn}
                    // hidden={stepIndex === 0}
                    color="primary"
                    size="large"
                    type="submit"
                    onClick={handleSubmit}
                    sx={{ ml: 2 }}
                  >
                    <SaveIcon color="primary" className={classes.saveBtnIcon} />
                    {t("Save&exit")}
                  </Button> */}
                            <Button
                              variant="outlined"
                              color="primary"
                              className={classes.btnHeader}
                              onClick={() => history.goBack()}
                            >
                              <ArrowBackwordIcon />
                            </Button>
                            {pcrRequest?.performanceCardRequestStatus != 'REJECTED' && (
                              <Button
                                color="primary"
                                className={classes.nxtBtn}
                                sx={{ ml: 1 }}
                                type="submit"
                                disabled={
                                  !(user?.role?.role == 'INSPECTOR'
                                    ? establishmentVisit?.visitStatus == 'false'
                                      ? false
                                      : true
                                    : true)
                                }
                              >
                                {t('Submit')}
                              </Button>
                            )}
                          </>
                        )}

                        {user?.role?.role == 'SUPERVISIOR' &&
                        pcrRequest?.performanceCardRequestStatus != 'CARD_ISSUED' &&
                        (pcrRequest?.finalScore == null ? pcrRequest?.score >= 50 : pcrRequest?.finalScore >= 50) ? (
                          <Button
                            color="primary"
                            className={classes.btnApprove}
                            sx={{ ml: 1 }}
                            onClick={handleApprovePublish}
                            disabled={
                              pcrRequest?.performanceCardRequestStatus == 'CARD_ISSUED' ||
                              pcrRequest?.performanceCardRequestStatus == 'REJECTED'
                            }
                          >
                            {t('Approve')}
                          </Button>
                        ) : (
                          ''
                        )}

                        {user?.role?.role == 'SUPERVISIOR' &&
                        pcrRequest?.performanceCardRequestStatus != 'CARD_ISSUED' ? (
                          <Button
                            variant="outlined"
                            color="primary"
                            className={classes.btnReject}
                            onClick={handleRejectPublish}
                            disabled={
                              pcrRequest?.performanceCardRequestStatus == 'CARD_ISSUED' ||
                              pcrRequest?.performanceCardRequestStatus == 'REJECTED'
                            }
                          >
                            {t('Reject')}
                          </Button>
                        ) : (
                          ''
                        )}
                      </>
                    </SelfAssessmentTopHeader>
                  </>
                }
              </>
              {/* )} */}
            </form>
            {/* <SelfAssessmentSubmitDialog
        handleClose={() => {
          setOpenPublishDialog(false);
        }}
        open={openPublishDialog}
        handleSubmit={() => handleSubmitAnswers()}
      /> */}

            <AcceptRejectSubmitDialog
              handleClose={() => {
                setOpenApproveDialog(false);
              }}
              open={openApproveDialog}
              handleSubmit={() => ApproveRejectPCR(true)}
            />

            <RejectSubmitDialogBox
              handleClose={() => {
                setOpenRejectDialog(false);
              }}
              open={openRejectDialog}
              handleSubmit={() => ApproveRejectPCR(false)}
            />
          </Container>
        )
      )}
    </>
  );
}

export default SelfAssessmentQuestion;
