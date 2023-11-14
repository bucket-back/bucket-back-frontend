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
  onClick?: () => void;
}

const CommonTabs = ({ tabsData, isFitted = true, tabsType = 'line', onClick }: CommonTabsProps) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <Tabs isFitted={isFitted} variant={tabsType} size="sm">
      <TabList padding={tabsType === 'soft-rounded' ? '1rem 0 0 1rem' : undefined}>
        {tabsData.map((tab, index) => (
          <Tab
            onClick={handleClick}
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
          <TabPanel padding="0" key={index}>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default CommonTabs;
