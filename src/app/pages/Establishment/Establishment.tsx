import React, { useEffect, useRef, useState } from 'react';
// import { makeStyles } from '@mui/styles';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import { useNavigate } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { useDispatch, useSelector } from 'react-redux';
import { Container, FormControl, Grid, Typography, Select as SelectM, MenuItem } from '@mui/material';
import { useAuth } from '@takamol/react-qiwa-core';
import { Loader, DatePicker, Button, Select } from '@takamol/qiwa-design-system/components';
import ReactPaginate from 'react-paginate';
import { Datatable } from 'src/components/ui/CustomTable';
import { useLocale } from 'src/app/translations/hooks/useLocale';
import { AuthRoute } from 'src/app/routing/enums/AuthRoute.enum';
import { PostRequestProxy, PostRequest } from 'src/Axios/axios';
import { PCREQUESTSLIST, PCREQUESTSLISTWithSearch } from 'src/utils/common/endpoint';
import { convertToDate, E2A, nomalizeDate } from 'src/utils/common/utils';
import { setLoading, setNotLoading } from 'src/store/actions';

export const EstablishmentList = () => {
  const navigate = useNavigate();
  const { t, locale } = useLocale();
  const dispatch = useDispatch();
  // const { isLoadingAuth } = useAuth();
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState('');
  const globalFilterRef: any = useRef();
  const [data, setData] = useState<any>([]);
  const [estab, setEstab] = useState<any>();
  const [currentState, setCurrentState] = useState<any>('');
  const [selected, setSelected] = useState<any>(0);
  const loading = useSelector((state: any) => state.loading);
  const user = useSelector((state: any) => state.user);
  const [status, setStatus] = React.useState<string>('');
  const [issuedOn, setIssuedOn] = React.useState<string>('');
  const [expirationDate, setExpirationDate] = React.useState<string>('');
  const [pagination, setPagination] = React.useState({
    offset: 0,
    perPage: 10,
    currentPage: 0,
    pageCount: 0,
  });
  const [filterbody, setFilterBody] = React.useState<any>({
    performanceCardZone: null,
    issuedOn: null,
    expirationDate: null,
  });
  const STATUSES = [
    { code: null, text: t('ALL') },
    { code: 'GREEN', text: t('GREEN') },
    { code: 'YELLOW', text: t('YELLOW') },
    { code: 'RED', text: t('RED') },
  ];
  // const useStyles = makeStyles(() => ({
  //   paginationLabelIcons: {
  //     paddingTop: '4px',
  //   },
  //   paginationItems: {
  //     display: 'flex',
  //     alignItems: 'center',
  //     flexDirection: 'row',
  //     justifyContent: 'flex-end',
  //   },
  //   paginationSelect: {
  //     padding: '5px 30px 5px 24px',
  //   },
  //   btnClear: {
  //     marginLeft: '15px',
  //     minWidth: '135px',
  //   },
  //   filterContainer: {
  //     display: 'flex',
  //     alignItems: 'center',
  //     padding: '10px 5px 0px 5px',
  //     background: 'white',
  //   },
  // }));
  // const classes = useStyles();
  const classes = {};

  const [columnNames, setColumn] = useState([
    {
      accessor: 'Id',
      Header: 'Electronic Verification Code',
    },
    {
      accessor: 'issuedOn',
      Header: 'Issued On',
    },
    {
      accessor: 'createdOn',
      Header: 'Creation Date',
    },
    {
      accessor: 'expirationDate',
      Header: 'Expiration Date',
    },
    {
      accessor: 'performanceCardZone',
      Header: 'Zone',
    },

    {
      Header: 'Actions',
      id: 'button',
      accessor: 'action',
      Cell: (row: any, index: any) => {
        return (
          row.row.index === 0 && (
            <div key={index}>
              {/* <Button
                variant="contained"
                className="icon__verticall"
                color="primary"
                size="medium"
                // onClick={() => navigate(`${AuthRoute.startSelfAssessment}?status=resubmit`)}
                disabled={handleDisableResubmitButton(row?.row?.original)}
              >
                {t('resubmit')}
              </Button> */}
            </div>
          )
        );
      },
    },
  ]);
  async function getCategories() {
    const result = await PostRequestProxy('GetAllCategories', {});
    console.log('resultsCategory', result);
  }
  async function getEconomicActivities() {
    const result = await PostRequestProxy(`GetAllEconomicActivities`, {});
    console.log('resultsEconomicActivity', result);
  }

  useEffect(() => {
    getCategories();
    getEconomicActivities();

    getPCRequests(user?.establishment[0].id);
    // if(user?.establishment[0]){

    // }
  }, [filterbody, pagination?.perPage, pagination?.currentPage, locale]);

  const handleDisableResubmitButton = (row: any) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const expiry = new Date(row?.expirationDate);
    expiry.setHours(0, 0, 0, 0);
    if (
      row?.performanceCardRequestStatus == 'REJECTED' ||
      (row?.performanceCardRequestStatus == 'CARD_ISSUED' && expiry < now) ||
      (row?.performanceCardRequestStatus == 'IN_PROGRESS' && row?.score >= 50 && row?.score <= 70)
      //   row?.performanceCardRequestStatus == 'CARD_ISSUED' || row?.performanceCardRequestStatus == 'REJECTED') &&// row?.score < 70
    ) {
      return false;
    }
    return true;
  };
  async function getPCRequests(id: string) {
    console.log('called');
    dispatch(setLoading());
    // const url = `/${PCREQUESTSLISTWithSearch}${id}&page=${pagination.currentPage}&size=${pagination?.perPage}`;
    // const result1 = await PostRequest(url, filterbody);

    const body = {
      page: pagination?.currentPage,
      size: pagination?.perPage,
      queryParams: filterbody,
      establishmentId: id,
    };
    const tempUsers: any = [];
    const result = await PostRequestProxy('PerformanceCardSearchFilter', body);
    console.log('called', result);
    if (result?.data?.PerformanceCardSearchFilter?.Header?.ResponseStatus?.Code == '000') {
      result?.data?.PerformanceCardSearchFilter?.Body?.content?.forEach((item: any) =>
        tempUsers.push({
          ID: item.id,
          Id: String(item?.id).substring(String(item?.id).length - 8),
          issuedOn: item?.issuedOn,
          createdOn: item?.performanceCardRequest?.createdOn,
          expirationDate: item?.expirationDate,
          performanceCardZone: item?.performanceCardZone,
          performanceCardGrade: item?.performanceCardGrade,
          performanceCardRequestStatus: item?.performanceCardRequest?.performanceCardRequestStatus,
          score: item?.performanceCardRequest?.score,
          performanceCardRequest: item?.performanceCardRequest,
          reSubmittable: item?.reSubmittable,
          // "ecnomicactivity": question?.eactivity.map((e:any) => e.name).join(' '),
          // "Weightage":question.weightage,
          // "action": null
        }),
      );
      setPagination({
        ...pagination,
        pageCount: result?.data?.PerformanceCardSearchFilter?.Body?.totalPages,
      });
    }
    setLoader(false);
    setData(tempUsers);
  }

  const handleDisableButton = (row: any) => {
    if (
      row?.performanceCardRequestStatus == 'CARD_ISSUED' ||
      row?.performanceCardRequestStatus == 'REJECTED'
      // selected?.performanceCardRequest?.score < 50
    ) {
      return false;
    }

    return true;
  };
  function previewPerformanceCard(id: string) {
    navigate(`/pcrequest/performance-certificate/${id}`);
  }

  const handleChangeRowsPerPage = (e: any) => {
    setPagination({ ...pagination, currentPage: 0, perPage: parseInt(e.target.value, 10) });
  };
  const handleClear = () => {
    setIssuedOn('');
    setExpirationDate('');
    setSearch('');
    setFilterBody({
      performanceCardZone: null,
      issuedOn: null,
      expirationDate: null,
    });
  };
  const handlePageClick = (e: any) => {
    const selectedPage = e.selected;

    const offset = selectedPage * pagination.perPage;

    setPagination({
      ...pagination,
      currentPage: selectedPage,
      offset: offset,
    });
  };
  const onChangeStatusFilter = (e: any) => {
    setPagination({
      offset: 0,
      perPage: 10,
      currentPage: 0,
      pageCount: 0,
    });
    // setStatusFilter(e);
    setFilterBody({ ...filterbody, performanceCardZone: e.value });
  };
  const ResultStatuses: any = ['CARD_ISSUED', 'REJECTED'];

  return (
    <>
      {loader ? (
        <div className="loading">{/* <Loader size={100} thickness={6} /> */}</div>
      ) : (
        <>
          <Container className="esb-container-2" style={{ marginTop: '20px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <>
                  <div className="innerContainer">
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                          {t('Occupational Health and')}
                          <span> {t('Safety Certificate')}</span>
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        justifyItems={'center'}
                        margin="auto"
                        display="flex"
                        flexDirection={'row-reverse'}
                      >
                        {/* <Button onClick={() => navigate(AuthRoute.startSelfAssessment)} color="primary">
                          {t('Self-evaluate and Apply')}
                        </Button> */}
                      </Grid>
                    </Grid>
                  </div>
                </>
              </Grid>
            </Grid>
          </Container>

          {data?.length == 0 && (
            <Container className="esb-container-2">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <>
                    <div className="innerContainer">
                      {/* <QIcon name="certificate" sizePx={50} className="my-class" /> */}
                      <ContentPasteSearchOutlinedIcon sx={{ fontSize: '50px', color: '#1a5373' }} />
                      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                        {t('Occupational Health and Safety Certificate')}
                      </Typography>
                      <p className="customclass">
                        {t('You don')}&apos;{t('t have an active or pending certificates')}
                      </p>

                      <Button color="primary" onClick={() => navigate('/start-self-assessment')}>
                        {t('Self-evaluate and Apply')}
                      </Button>
                    </div>
                  </>
                </Grid>
              </Grid>
            </Container>
          )}
          {data?.length > 0 && !ResultStatuses.includes(data[selected]?.performanceCardRequestStatus) && (
            <div className="padd">
              <Container className="esb-container-2">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <>
                      <div className="innerContainer">
                        <div className="esttitle">
                          <ContentPasteSearchOutlinedIcon sx={{ fontSize: '50px', color: '#1a5373' }} />
                          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            {t('Occupational Health and Safety Certificate')}
                          </Typography>
                        </div>
                        <div className="certifiedmaindiv w-100">
                          <div className="certifieddiv w-100">
                            {' '}
                            <div className="circle"></div>{' '}
                            <p style={{ marginBottom: '0px' }} className="yellow">
                              {t('Send Under review')}
                            </p>{' '}
                            <span className="black">
                              ( Submitted on {convertToDate(data[selected].createdOn, locale)} )
                            </span>
                          </div>
                        </div>

                        <div className="EvaluateSection">
                          <div>
                            <p>{t('Self-evaluation score')}</p>
                            <h3>{data[selected].score}%</h3>
                          </div>
                          <div>
                            <p>{t('Certificate grade')}</p>
                            <h3>{t('Underreview')}</h3>
                          </div>
                        </div>
                      </div>
                    </>
                  </Grid>
                </Grid>
              </Container>
            </div>
          )}
          {data && data?.length > 0 && ResultStatuses.includes(data[selected]?.performanceCardRequestStatus) && (
            <Container className="esb-container-2">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <>
                    <div className="innerContainer">
                      <div className="esttitle">
                        <ContentPasteSearchOutlinedIcon sx={{ fontSize: '50px', color: '#1a5373' }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                          {t('Occupational Health and Safety Certificate')}
                        </Typography>
                      </div>

                      <div className="certifiedmaindiv w-100">
                        <div className="certifieddiv w-50">
                          {' '}
                          {data[selected]?.performanceCardRequestStatus == 'REJECTED' ||
                          (data[selected]?.performanceCardRequestStatus == 'CARD_ISSUED' &&
                            data[selected]?.performanceCardRequest?.finalScore < 50) ? (
                            <>
                              <CancelRoundedIcon sx={{ fontSize: '30px', color: 'red' }} />
                              <p style={{ margin: 0, marginLeft: '5px' }}>{t('NOT Certified')}</p>{' '}
                            </>
                          ) : (
                            <>
                              <VerifiedIcon /> <p style={{ marginBottom: '0px' }}>{t('Certified')}</p>{' '}
                            </>
                          )}
                          {data[selected]?.issuedOn && (
                            <span className="black">
                              ( on{' '}
                              {data[selected]?.issuedOn
                                ? data[selected]?.issuedOn
                                : convertToDate(data[selected]?.issuedOn, locale)}
                              )
                            </span>
                          )}
                        </div>
                        <div className="certifiedbtndiv w-50">
                          {/* <Button
                            color="primary"
                            size="medium"
                            onClick={() => {
                              previewPerformanceCard(data[selected]?.ID);
                            }}
                            disabled={handleDisableButton(data[selected])}
                          >
                            {t('PreviewPerformanceCard')}
                          </Button> */}
                        </div>
                      </div>

                      <div className="EvaluateSection">
                        <div>
                          <p>{t('Certificate grade')}</p>
                          <h3>
                            {data[selected]?.performanceCardGrade == 'NON_COMPLIANT'
                              ? t(`NON COMPLIANT`)
                              : data[selected]?.performanceCardGrade == 'PARTIALLY_COMPLIANT'
                              ? t('PARTIALLY COMPLIANT')
                              : t(data[selected]?.performanceCardGrade)}
                          </h3>
                        </div>
                        <div>
                          <p>{t('Self-evaluation score')}</p>
                          <h3>{data[selected]?.score}%</h3>
                        </div>
                        {data[selected]?.performanceCardRequest?.finalScore && (
                          <div>
                            <p>{t('FinalScore')}</p>
                            <h3>{data[selected]?.performanceCardRequest?.finalScore}%</h3>
                          </div>
                        )}

                        <div>
                          <p>{t('Expiry date')}</p>
                          <h3>{convertToDate(data[selected]?.expirationDate, locale)}</h3>
                        </div>
                      </div>
                    </div>
                  </>
                </Grid>
              </Grid>
            </Container>
          )}

          <Container className="table-container">
            <div>
              <input
                style={{ height: '45px', width: '300px' }}
                // className={classes.search_report}
                value={search}
                placeholder={t('SearchReport')}
                type="text"
                onChange={(e) => {
                  globalFilterRef?.current?.callGlobalFilter(e.target.value);
                  setSearch(e.target.value);
                }}
              />
              <FormControl sx={{ mx: 1, my: 0, width: '300px' }}>
                {/* <InputLabel id="demo-multiple-name-label">{t('Status')}</InputLabel> */}
                {/* <Select
                  id="status-dd"
                  placeholder={t('Status')}
                  isClearable={true}
                  value={filterbody.performanceCardGrade}
                  onChange={onChangeStatusFilter}
                  options={STATUSES.map((status) => ({
                    value: status.code,
                    label: status.text,
                  }))}
                ></Select> */}
              </FormControl>
              <FormControl sx={{ mx: 1, my: 0 }}>
                {/* <DatePicker
                  date={issuedOn}
                  calendarType={3}
                  displayFormat="yyyy/MM/dd"
                  format="yyyy/MM/dd"
                  className="date-picker"
                  label="startDate"
                  placeholder="Start Date"
                  locale={locale}
                  onDateChange={(date) => {
                    setIssuedOn(date);
                  }}
                /> */}
              </FormControl>
              <FormControl sx={{ mx: 1, my: 0 }}>
                {/* <DatePicker
                  date={expirationDate}
                  calendarType={3}
                  displayFormat="yyyy/MM/dd"
                  label="endDate"
                  format="yyyy/MM/dd"
                  className="date-picker"
                  placeholder="End Date"
                  onDateChange={(date) => {
                    setExpirationDate(date);
                  }}
                /> */}
              </FormControl>
              {/* <Button
                color="primary"
                className={classes.btnClear}
                disabled={expirationDate == '' || issuedOn == ''}
                onClick={() =>
                  setFilterBody({
                    ...filterbody,
                    issuedOn: nomalizeDate(issuedOn),
                    expirationDate: nomalizeDate(expirationDate),
                  })
                }
                type="button"
              >
                {t('Apply')}
              </Button> */}
              {/* <Button color="primary" className={classes.btnClear} onClick={() => handleClear()}>
                {t('Clear')}
              </Button> */}
            </div>
            <Datatable
              ref={globalFilterRef}
              columns={columnNames}
              data={data}
              rowEvent={(index: number) => setSelected(index)}
            />
            <div dir={'ltr'}>
              <span>{t('RowsPerPage')} </span>
              <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
                <SelectM
                  id="label-for-select-option-step-one"
                  value={pagination?.perPage}
                  onChange={(e) => handleChangeRowsPerPage(e)}
                >
                  <MenuItem value={10}>{E2A(String(10), locale)}</MenuItem>
                  <MenuItem value={25}>{E2A(String(25), locale)}</MenuItem>
                  <MenuItem value={50}>{E2A(String(50), locale)}</MenuItem>
                </SelectM>
              </FormControl>
              <ReactPaginate
                previousLabel={<KeyboardArrowLeftRoundedIcon />}
                // nextLabel={<KeyboardArrowRightRoundedIcon className />}
                pageLabelBuilder={(page) => E2A(String(page), locale)}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pagination.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(e: any) => handlePageClick(e)}
                containerClassName={'pagination'}
                activeClassName={'active'}
              />
            </div>
          </Container>
        </>
      )}
    </>
  );
};
