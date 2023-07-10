import { Box, Link, Text } from '@takamol/qiwa-design-system/components';
import { LinkArrow } from '@takamol/qiwa-design-system/icons';
import * as React from 'react';

interface NonSaudiEmployeesItemProps {
  key: string;
  value: number;
  title: string;
  description: string;
  linkTitle: string;
  onLinkClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const NonSaudiEmployeesItem = ({ value, title, description, linkTitle, onLinkClick }: NonSaudiEmployeesItemProps) => (
  <Box gap={8} maxWidth={['100%', '50%']}>
    <Text variant="heading-s" weight="semibold">
      {value}
    </Text>
    <Text variant="body-l" weight="semibold">
      {title}
    </Text>
    <Text variant="body-m" color="grayscale_700">
      {description}
    </Text>
    <Link size="small" onClick={onLinkClick} iconComponent={LinkArrow} iconPlacement="start">
      {linkTitle}
    </Link>
  </Box>
);

export default NonSaudiEmployeesItem;
