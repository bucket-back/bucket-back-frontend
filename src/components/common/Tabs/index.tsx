import { ReactElement } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabsProps } from '@chakra-ui/react';

interface TabsData {
  label: string;
  content: string | ReactElement;
}
interface CommonTabsProps {
  tabsType?: 'soft-rounded' | 'line';
  isFitted?: TabsProps['isFitted'];
  tabsData: TabsData[];
}

const CommonTabs = ({ tabsData, isFitted = true, tabsType = 'line' }: CommonTabsProps) => {
  return (
    <Tabs isFitted={isFitted} variant={tabsType} size="sm">
      <TabList>
        {tabsData.map((tab, index) => (
          <Tab
            color="blue.900"
            bg="none"
            _selected={
              tabsType === 'line'
                ? { color: 'blue.300', borderColor: 'blue.300' }
                : { color: 'white', bg: 'blue.300' }
            }
            key={index}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabsData.map((tab, index) => (
          <TabPanel p={4} key={index}>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default CommonTabs;
