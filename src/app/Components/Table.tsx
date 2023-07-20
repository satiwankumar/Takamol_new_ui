import React from 'react';
import { Table, Box, Icon, Text } from '@takamol/qiwa-design-system/components';
import { useWindowUtils } from '@takamol/qiwa-design-system/utils';
import { Search } from '@takamol/qiwa-design-system/icons';

export const QiwaTable = (args: any) => {
  const { isMobileWidth } = useWindowUtils();
  const isEmpty = true;

  return (
    <Table {...args}>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Question</Table.HeadCell>
          <Table.HeadCell>Cateogry</Table.HeadCell>
          <Table.HeadCell>Economic Activity </Table.HeadCell>
          <Table.HeadCell>Weightage</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Version</Table.HeadCell>
          {/* {!isMobileWidth ? <Table.HeadCell alignCenter>Actions</Table.HeadCell> : <></>} */}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {Array.from({ length: 10 }, (_, index) => (
          <Table.Row key={index}>
            <Table.Cell>Moroccan</Table.Cell>
            <Table.Cell>Designer</Table.Cell>
            <Table.Cell>Rabat</Table.Cell>
            <Table.Cell>Male</Table.Cell>
            <Table.Cell>Muslim</Table.Cell>
            <Table.Cell>1</Table.Cell>
            {/* <Table.Cell alignCenter>{renderActions(isMobileWidth, args.variant)}</Table.Cell> */}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
