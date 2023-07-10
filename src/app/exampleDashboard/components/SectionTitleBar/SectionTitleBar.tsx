import * as React from 'react';
import { Box, Button, Link, Text } from '@takamol/qiwa-design-system/components';
import { IconComponent } from '@takamol/qiwa-design-system/components/Icon/types';
import { Chevron } from '@takamol/qiwa-design-system/icons';
import { useWindowUtils } from '@takamol/qiwa-design-system/utils/windowUtils';

interface SectionTitleBarProps {
  title: string;
  linkLabel?: string;
  buttonLabel?: string;
  linkIcon?: IconComponent;
  onClick?: () => void;
}

const SectionTitleBar = ({ title, linkLabel, buttonLabel, linkIcon, onClick }: SectionTitleBarProps) => {
  const { isMobileWidth } = useWindowUtils();

  return (
    <Box direction="row" justify="space-between" align="center" mb={[24, 32]} mt={[56, 64]}>
      <Text variant={['heading-s', 'heading-m']} weight="semibold">
        {title}
      </Text>
      {!isMobileWidth && linkLabel && (
        <Link iconComponent={linkIcon || Chevron} onClick={onClick}>
          {linkLabel}
        </Link>
      )}
      {!isMobileWidth && buttonLabel && (
        <Button variant="business_ghost" onClick={onClick}>
          {buttonLabel}
        </Button>
      )}
    </Box>
  );
};

export default SectionTitleBar;
