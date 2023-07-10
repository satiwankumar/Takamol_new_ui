import * as React from 'react';
import { Box, BoxProps } from '@takamol/qiwa-design-system/components';
import { useWindowUtils } from '@takamol/qiwa-design-system/utils/windowUtils';

type SectionProps = React.PropsWithChildren<BoxProps>;

const Section = ({ children, ...props }: SectionProps) => {
  const { isMobileWidth } = useWindowUtils();

  return (
    <Box
      bgColor="grayscale_0"
      borderRadius={[0, 8]}
      borderColor="grayscale_200"
      borderWidth={isMobileWidth ? 0 : 1}
      withBorderTop={isMobileWidth}
      shadow="medium"
      pt={24}
      pb={[24, 32]}
      ps={[0, 48]}
      pe={[0, 48]}
      withExpandedBackground={[true, false]}
      {...props}
    >
      {children}
    </Box>
  );
};
export default Section;
