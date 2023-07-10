import * as React from 'react';
import { Box, HorizontalNotification, TabsContextProvider, Text } from '@takamol/qiwa-design-system/components';
import {
  BorderTab,
  BorderTabList,
  BorderTabPanel,
  BorderTabPanels,
} from '@takamol/qiwa-design-system/components/Tabs/BorderTabs';

import { useLocale } from 'src/app/translations/hooks/useLocale';
import { useTodoList } from '../../hooks/useTodoList';
import { Section } from '../Section';
import { getLocaleName } from '../../utils/locale';

const NUMBER_OF_RECOMMENDATIONS = 1;

const TodoList = () => {
  const { data, isLoading } = useTodoList();
  const { t, locale } = useLocale();

  if (isLoading) return <p>Loading...</p>;

  return (
    <Section mt={24}>
      <TabsContextProvider>
        <BorderTabList dangerBadgeLimit={20} variant="business">
          <BorderTab badge={2}>{t('EXAMPLE_DASHBOARD.TO_DO.TAB')}</BorderTab>
          <BorderTab badge={NUMBER_OF_RECOMMENDATIONS} isDisabled={!NUMBER_OF_RECOMMENDATIONS}>
            {t('EXAMPLE_DASHBOARD.RECOMMENDATIONS.TAB')}
          </BorderTab>
        </BorderTabList>
        <Box mt={[8, 16]}>
          <BorderTabPanels>
            <BorderTabPanel>
              <Box gap={[8, 12]}>
                {data?.items &&
                  data?.items.map((item, index) => {
                    return (
                      <HorizontalNotification
                        key={index}
                        buttonsVariant={item.buttonsVariant}
                        notificationText={<Text variant="body-l">{item.content}</Text>}
                        primaryButtonLabel={getLocaleName(item.primaryAction, locale)}
                        primaryButtonOnClick={() => null}
                        secondaryButtonLabel={getLocaleName(item.secondaryAction, locale)}
                        secondaryButtonOnClick={() => null}
                        variant={item.variant}
                      />
                    );
                  })}
              </Box>
            </BorderTabPanel>
            <BorderTabPanel>
              <Box bgColor="grayscale_50" padding={16}>
                {t('EXAMPLE_DASHBOARD.NO_CONTENT')}
              </Box>
            </BorderTabPanel>
          </BorderTabPanels>
        </Box>
      </TabsContextProvider>
    </Section>
  );
};

export default TodoList;
