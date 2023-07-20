import React from 'react';
import { Box, Drawer, IconButton } from '@takamol/qiwa-design-system/components';
import { Close } from '@takamol/qiwa-design-system/icons';
import { useWindowUtils } from '@takamol/qiwa-design-system/utils/windowUtils';
import {
  Footer,
  Sidebar,
  BusinessNavigation,
  useAuth,
  useDrawerVisiblity,
  LayoutSkeleton,
} from '@takamol/react-qiwa-core';
import { TopSection } from 'src/app/exampleDashboard/components/TopSection';

interface LayoutProps {
  isPublic?: boolean;
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children, isPublic = false }: LayoutProps) => {
  const { isDrawerOpened, closeDrawer } = useDrawerVisiblity();
  const { isMobileWidth, isTabletWidth } = useWindowUtils();
  const isDesktopWidth = !isTabletWidth && !isMobileWidth;
  const { authStatus } = useAuth();

  const isAuthLoading = !isPublic && authStatus === 'loading';

  if (isAuthLoading) {
    return (
      <div role="progressbar">
        <LayoutSkeleton>
          <Box>{children}</Box>
        </LayoutSkeleton>
      </div>
    );
  }

  return (
    <>
      <BusinessNavigation />
      {/* <Box bgColor="business_700">
        <Layout variant="with-sidebar-condensed">
          <TopSection />
        </Layout>
      </Box> */}

      <Box direction="row" align="stretch">
        {isDesktopWidth && <Sidebar />}
        {isTabletWidth && (
          <Drawer
            isOpened={isDrawerOpened}
            handleClose={closeDrawer}
            headerContent={<></>}
            positionedAt="start"
            size="small"
          >
            <Box pt={24} gap={40}>
              {!isMobileWidth && (
                <IconButton
                  iconComponent={Close}
                  variant="neutral_ghost"
                  onClick={closeDrawer}
                  borderRadius="rounded"
                  borderWidth={1}
                  size={40}
                  ariaLabel="close sidebar"
                />
              )}
              <Sidebar />
            </Box>
          </Drawer>
        )}
        <Box>{children}</Box>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
