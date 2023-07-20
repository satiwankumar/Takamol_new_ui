import { Button } from '@takamol/qiwa-react-library';
import React from 'react';

export const QuestionColumns = (handleDuplicate: any, handleStatus: any, editQuestion: any, t: any) => {
  return [
    // {
    //   accessor: 'id',
    //   Header: 'ID',
    // },
    {
      accessor: 'question',
      Header: t('Questions'),
    },
    {
      accessor: 'parent',
      Header: t('OriginalQuestion'),
    },
    {
      width: 10,
      accessor: 'category',
      Header: t('Category'),
    },
    {
      width: 10,
      accessor: 'ecnomicactivity',
      Header: t('EconomicActivity'),
    },

    {
      width: 10,
      accessor: 'Weightage',
      Header: t('Weightage'),
    },
    {
      width: 10,
      accessor: 'status',
      Header: t('Status'),
    },
    {
      width: 10,
      accessor: 'version',
      Header: t('Version'),
    },
    {
      Header: t('Actions'),
      id: 'button',
      accessor: 'action',
      Cell: (row: any, index: any) => (
        <div key={index}>
          {row?.row?.original?.statusnumber == 1 && row?.row?.original?.referenceId != null && (
            <>
              <Button
                size="small"
                color="primary"
                onClick={(e) => handleStatus(row.row.original.id, 2)}
                variant="outlined"
              >
                {t(`Deactivate`)}
              </Button>
            </>
          )}
          {row?.row?.original?.statusnumber == 1 && row?.row?.original?.referenceId == null && (
            <>
              <Button
                size="small"
                color="primary"
                onClick={(e) => handleDuplicate(row?.row?.original.id)}
                variant="outlined"
              >
                {t('Duplicate')}
              </Button>
              &nbsp;&nbsp;
              <Button
                size="small"
                color="primary"
                onClick={(e) => handleStatus(row.row.original.id, 2)}
                variant="outlined"
              >
                {t(`Deactivate`)}
              </Button>
            </>
          )}

          {row?.row?.original?.statusnumber == 0 && (
            <>
              <Button
                size="small"
                color="primary"
                onClick={(e) => editQuestion(row?.row?.original?.questiondata)}
                variant="outlined"
              >
                {t(`Edit`)}
              </Button>
              &nbsp;&nbsp;
              <Button
                size="small"
                color="primary"
                onClick={(e) => handleStatus(row.row.original.id, 1)}
                variant="outlined"
              >
                {t(`Publish`)}
              </Button>
            </>
          )}
          {row?.row?.original?.statusnumber == 2 && (
            <>
              <Button
                size="small"
                color="primary"
                onClick={(e) => handleStatus(row.row.original.id, 1)}
                variant="outlined"
              >
                {`Publish`}
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];
};

export const UserColumn = [
  // {
  //   Header: 'ID',
  //   accessor: 'id',
  // },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Phone Number',
    accessor: 'phone',
  },
  {
    Header: 'Role',
    accessor: 'role',
  },
  // {
  //   Header: 'Actions',
  //   id: 'button',
  //   accessor: 'action',
  //   Cell: (row: any) => (
  //     <div>
  //       <Button
  //         size="small"
  //         color="primary"
  //         onClick={(e) => console.log(row.row.original.id, e.target.id)}
  //         variant="outlined"
  //       >
  //         De-activate
  //       </Button>
  //     </div>
  //   ),
  // },
];
