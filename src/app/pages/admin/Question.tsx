import React, { useState, useEffect, useRef } from 'react';
// import { Container, FormControl, Grid, Typography, Select as SelectM, MenuItem } from '@mui/material';
// import { Select, Button } from '@takamol/qiwa-design-system/components';
// import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
// import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
// import ReactPaginate from 'react-paginate';
// // import { makeStyles } from '@mui/styles';
// import BoxWrapper from 'src/components/ui/BoxWrapper';
// import { useLocale } from 'src/app/translations/hooks/useLocale';
// import { Datatable } from 'src/components/ui/CustomTable';
// import { GetRequest, PostRequestProxy, PostRequest, PutRequest } from 'src/Axios/axios';
// import { addParameterToURL, AdminStatus, E2A } from 'src/utils/common/utils';
// import Success from 'src/components/Modal.Success';
// import Error from 'src/components/Modal.Error';

// import { QuestionColumns } from './MataColumn';
// import AddQuestionComponent from './AddQuestionForm';
// import { DUPLICATE, ECONOMICACTIVITY, GETCATEGORY } from 'src/utils/common/endpoint';
import { QiwaTable } from 'src/app/Components/Table';

// const GET_QUESTIONS_KEY = `GetSelfAssessmentQuestionByQueryParam`;
// const GET_ECONOMIC_ACTIVITIES = `GetAllEconomicActivities`;
// const GET_CATEGORIES = `GetAllCategories`;
// const DUPLICATE_QUESTION = `DuplicateSelfAssessmentQuestionByQuestionId`;
// const UPDATE_QUESTION_STATUS = `UpdateSelfAssessmentQuestionStatus`;

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
//     height: '45.5px',
//     marginLeft: '15px',
//     minWidth: '135px',
//   },
//   filterContainer: {
//     display: 'flex',
//     padding: '10px 5px 0px 5px',
//     background: 'white',
//   },
// }));

export const Question = () => {
  // const globalFilterRef: any = useRef();
  // const [data, setData] = useState([]);
  // // const classes = useStyles();
  // const classes = {};
  // const [loading, setLoading] = useState(false);
  // const [open, setOpen] = React.useState(false);
  // const [update, setUpdate] = React.useState(false);
  // const [search, setSearch] = React.useState('');

  // const [filterbody, setFilterBody] = React.useState<any>({
  //   status: null,
  //   eid: null,
  //   categoryId: null,
  // });

  // const [statusFilter, setStatusFilter] = useState(null);
  // const [economicActivityFilter, setEconomicActivityFilter] = useState(null);
  // const [categoryFilter, setcategoryFilter] = useState(null);
  // const [pagination, setPagination] = React.useState({
  //   offset: 0,
  //   perPage: 10,
  //   currentPage: 0,
  //   pageCount: 0,
  // });
  // const [categories, setCategories] = useState([]);
  // const [economicActivities, setEconomicActivities] = useState([]);
  // const [questionData, setQuestionData] = React.useState<any>('');

  // const { t, locale } = useLocale();
  // const STATUSES = [
  //   { code: null, text: t('ALL') },
  //   { code: 0, text: t('DRAFT') },
  //   { code: 1, text: t('PUBLISHED') },
  //   { code: 2, text: t('ARCHEIVED') },
  // ];

  // const handleChangeRowsPerPage = (e: any) => {
  //   setPagination({ ...pagination, currentPage: 0, perPage: parseInt(e.target.value, 10) });
  // };
  // const handlePageClick = (e: any) => {
  //   const selectedPage = e.selected;

  //   const offset = selectedPage * pagination.perPage;

  //   setPagination({
  //     ...pagination,
  //     currentPage: selectedPage,
  //     offset: offset,
  //   });
  // };
  // const handleClear = () => {
  //   setcategoryFilter(null);
  //   setEconomicActivityFilter(null);
  //   setStatusFilter(null);
  //   setSearch('');
  //   setFilterBody({
  //     performanceCardRequestStatus: null,
  //     assignedTo: null,
  //     dateAfter: null,
  //     dateBefore: null,
  //   });
  // };
  // async function getQuestions() {
  //   setLoading(true);
  //   const body = {
  //     page: pagination.currentPage,
  //     size: pagination.perPage,
  //     queryParams: filterbody,
  //   };
  //   const result = await PostRequestProxy(GET_QUESTIONS_KEY, body);
  //   if (!result?.data?.errorCode) {
  //     const { totalPages, content } = result.data[GET_QUESTIONS_KEY].Body;
  //     const questions = content.map((question: any) => ({
  //       id: question.id,
  //       question: locale == 'en' ? question.questionEnglish : question.questionArabic,
  //       category: locale == 'en' ? question?.category?.categoryNameEn : question?.category?.categoryName,
  //       ecnomicactivity: question?.eactivity.map((e: any) => (locale == 'en' ? e.nameEn : e.name)).join(', '),
  //       Weightage: question?.weightage,
  //       status: t(`${AdminStatus[question?.status] as 'PUBLISHED' | 'DRAFT' | 'ARCHEIVED'}`),
  //       statusnumber: question?.status,
  //       referenceId: question?.referenceId,
  //       parent: locale == 'en' ? question?.parentQuestionEn : question?.parentQuestionAr,
  //       version: question?.version.toFixed(1),
  //       questiondata: question,
  //       action: null,
  //     }));
  //     setPagination({ ...pagination, pageCount: totalPages });
  //     setData(questions);
  //   }
  //   setLoading(false);
  // }

  // React.useEffect(() => {
  //   getQuestions();
  // }, [pagination?.perPage, pagination?.currentPage, filterbody, locale]);

  // const handleClose = (value: string) => {
  //   setOpen(false);
  // };

  // async function handleDuplicate(id: number) {
  //   const url = `${DUPLICATE}`;

  //   const result = await PostRequestProxy(`${DUPLICATE_QUESTION}`, { id: id });
  //   if (result?.status === 200 || result?.status === 201) {
  //     Success('Create Duplicate Question');
  //     getQuestions();
  //   }
  // }
  // async function handleStatus(id: number, status: number) {
  //   const payload = {
  //     // version: '0.0',
  //   };
  //   const result = await PostRequestProxy(UPDATE_QUESTION_STATUS, { id: id, status: status });
  //   if (result?.status === 200 || result?.status === 201) {
  //     Success(
  //       status == 2 ? t('Question Archieved Successfully') : status == 1 ? t('Question Published Successfully') : '',
  //     );
  //     getQuestions();
  //   } else {
  //     Error(result?.error ? result.error : 'Action not acheivable');
  //   }
  // }
  // async function editQuestion(data: number) {
  //   setOpen(true);
  //   setUpdate(true);
  //   setQuestionData(data);
  // }
  // const handleAdd = () => {
  //   {
  //     setOpen(true), setUpdate(false);
  //   }
  // };

  // async function getEconomicActivities() {
  //   const url = `/${ECONOMICACTIVITY}`;
  //   const result = await PostRequestProxy(GET_ECONOMIC_ACTIVITIES);
  //   if (result && result.status === 200) {
  //     setEconomicActivities(result.data[GET_ECONOMIC_ACTIVITIES].Body);
  //     // setSelectedOption(result.data[0].economicActivity);
  //   }
  // }

  // useEffect(() => {
  //   getCategoriesAndEconomicActivities();
  // }, []);
  // async function getCategoriesAndEconomicActivities() {
  //   if (data === null) return;
  //   setLoading(true);
  //   await getEconomicActivities();
  //   await getCategories();
  //   setLoading(false);
  // }
  // async function getCategories() {
  //   const url = `/${GETCATEGORY}`;
  //   const result = await PostRequestProxy(GET_CATEGORIES, {});
  //   if (result && result.status === 200) {
  //     setCategories(result.data[GET_CATEGORIES].Body);
  //     // setSelectedOption(result.data[0].economicActivity);
  //   }
  // }

  // const onChangeEconomicActivityFilter = (e: any) => {
  //   setPagination({
  //     offset: 0,
  //     perPage: 10,
  //     currentPage: 0,
  //     pageCount: 0,
  //   });
  //   setEconomicActivityFilter(e);
  //   setFilterBody({ ...filterbody, eid: e.value });
  // };
  // const onChangeStatusFilter = (e: any) => {
  //   setPagination({
  //     offset: 0,
  //     perPage: 10,
  //     currentPage: 0,
  //     pageCount: 0,
  //   });
  //   setStatusFilter(e);
  //   setFilterBody({ ...filterbody, status: e.value });
  // };
  // const onChangeCategoryFilter = (e: any) => {
  //   setPagination({
  //     offset: 0,
  //     perPage: 10,
  //     currentPage: 0,
  //     pageCount: 0,
  //   });
  //   setcategoryFilter(e);
  //   setFilterBody({ ...filterbody, categoryId: e.value });
  // };

  return (
    <QiwaTable />
    // <div>
    //   <Container className="esb-container-2" style={{ marginTop: '20px' }}>
    //     <Grid container>
    //       <Grid item xs={12}>
    //         <>
    //           <div className="innerContainer">
    //             <Grid container spacing={2}>
    //               <Grid item xs={6}>
    //                 <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
    //                   {t('Questions')}
    //                 </Typography>
    //               </Grid>
    //               <Grid item xs={6} justifyItems={'center'} margin="auto" display="flex" flexDirection={'row-reverse'}>
    //                 <Button variant="contained" onClick={() => handleAdd()}>
    //                   {t('AddQuestion')}
    //                 </Button>
    //               </Grid>
    //             </Grid>
    //           </div>
    //         </>
    //       </Grid>
    //     </Grid>
    //   </Container>
    //   {open && (
    //     <AddQuestionComponent
    //       open={open}
    //       update={update}
    //       questionData={questionData}
    //       setOpen={setOpen}
    //       onClose={handleClose}
    //       getQuestions={() => getQuestions()}
    //       options={economicActivities}
    //       categories={categories}
    //     />
    //   )}

    //   <Container className="table-container" style={{ background: 'white' }}>
    //     <div className={classes.filterContainer}>
    //       <input
    //         className="input-bright"
    //         style={{ height: '45.5px' }}
    //         // className={classes.search_report}
    //         placeholder={t('SearchReport')}
    //         value={search}
    //         type="text"
    //         onChange={(e) => {
    //           globalFilterRef?.current?.callGlobalFilter(e.target.value);
    //           setSearch(e.target.value);
    //         }}
    //       />
    //       <FormControl sx={{ m: 0, ml: 1, width: 600 }}>
    //         {/* <InputLabel id="demo-multiple-name-label">{t('Status')}</InputLabel> */}
    //         {/* <Select
    //           id="status-dd"
    //           placeholder={t('Status')}
    //           value={statusFilter}
    //           onChange={onChangeStatusFilter}
    //           options={STATUSES.map((status) => ({
    //             value: status.code,
    //             label: status.text,
    //           }))}
    //         ></Select> */}
    //       </FormControl>
    //       <FormControl sx={{ m: 0, ml: 1, width: 600 }}>
    //         {/* <InputLabel id="demo-multiple-name-label">{t('Status')}</InputLabel> */}
    //         {/* <Select
    //           id="status-dd"
    //           placeholder={t('EconomicActivity')}
    //           value={economicActivityFilter}
    //           onChange={onChangeEconomicActivityFilter}
    //           options={[
    //             {
    //               value: null,
    //               label: 'All',
    //             },
    //             ...economicActivities.map((eActivity: any) => ({
    //               value: eActivity.id,
    //               label: locale == 'en' ? eActivity.economicActivityEn : eActivity.economicActivity,
    //             })),
    //           ]}
    //         ></Select> */}
    //       </FormControl>
    //       <FormControl sx={{ m: 0, ml: 1, mr: 0, width: 600 }}>
    //         {/* <InputLabel id="demo-multiple-name-label">{t('Status')}</InputLabel> */}
    //         {/* <Select
    //           id="status-dd"
    //           placeholder={t('Category')}
    //           value={categoryFilter}
    //           onChange={onChangeCategoryFilter}
    //           options={[
    //             {
    //               value: null,
    //               label: 'All',
    //             },
    //             ...categories.map((category: any) => ({
    //               value: category.id,
    //               label: locale == 'en' ? category.categoryNameEn : category.categoryName,
    //             })),
    //           ]}
    //         ></Select> */}
    //       </FormControl>
    //       <Button color="primary" className={classes.btnClear} onClick={() => handleClear()}>
    //         {t('Clear')}
    //       </Button>
    //     </div>
    //     <Datatable
    //       ref={globalFilterRef}
    //       hasFilters={true}
    //       loading={loading}
    //       columns={QuestionColumns(handleDuplicate, handleStatus, editQuestion, t)}
    //       data={data}
    //     ></Datatable>

    //     {/* <div className={classes.paginationItems} dir={'ltr'}>
    //       <span>{t('RowsPerPage')} </span>
    //       <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
    //         <SelectM
    //           id="label-for-select-option-step-one"
    //           value={pagination?.perPage}
    //           onChange={(e) => handleChangeRowsPerPage(e)}
    //         >
    //           <MenuItem value={10}>{E2A(String(10), locale)}</MenuItem>
    //           <MenuItem value={25}>{E2A(String(25), locale)}</MenuItem>
    //           <MenuItem value={50}>{E2A(String(50), locale)}</MenuItem>
    //         </SelectM>
    //       </FormControl> */}
    //     {/* <ReactPaginate
    //         previousLabel={<KeyboardArrowLeftRoundedIcon className={classes.paginationLabelIcons} />}
    //         nextLabel={<KeyboardArrowRightRoundedIcon className={classes.paginationLabelIcons} />}
    //         pageLabelBuilder={(page) => E2A(String(page), locale)}
    //         breakLabel={'...'}
    //         breakClassName={'break-me'}
    //         pageCount={pagination.pageCount}
    //         marginPagesDisplayed={2}
    //         pageRangeDisplayed={5}
    //         onPageChange={(e: any) => handlePageClick(e)}
    //         containerClassName={'pagination'}
    //         activeClassName={'active'}
    //       /> */}
    //     {/* </div> */}
    //   </Container>
    // </div>
  );
};
