import { ReactElement } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabsProps } from '@chakra-ui/react';

interface TabsData {
  value?: string;
  label: string;
  content: string | ReactElement;
}
interface CommonTabsProps {
  tabsType?: 'soft-rounded' | 'line';
  isFitted?: TabsProps['isFitted'];
  tabsData: TabsData[];
  onClick?: (value: string) => void;
  currentTabIndex?: number;
}

const selectedStyle = (tabsType: string) => {
  return tabsType === 'line'
    ? { color: 'blue.300', borderColor: 'blue.300' }
    : { color: 'white', bg: 'blue.300' };
};

const CommonTabs = ({
  tabsData,
  isFitted = true,
  tabsType = 'line',
  onClick,
  currentTabIndex = 0,
}: CommonTabsProps) => {
  const handleClick = (value: string) => {
    onClick && onClick(value);
  };

  return (
    <Tabs defaultIndex={currentTabIndex} isFitted={isFitted} variant={tabsType} size="sm">
      <TabList padding={tabsType === 'soft-rounded' ? '1rem 0 0 1rem' : undefined}>
        {tabsData.map((tab, index) => (
          <Tab
            onClick={() => handleClick(tab.value ?? '')}
            color="blue.900"
            bg="none"
            _selected={selectedStyle(tabsType)}
            key={index}
            _disabled={selectedStyle(tabsType)}
            isDisabled={currentTabIndex === index}
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
