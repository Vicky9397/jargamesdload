import './App.css';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Links from './components/Links';
import Ps2Links from './components/Ps2Links';

function App() {
  return (
    <div className="App">
      <Tabs>
      {/* Tab Headers */}
      <TabList>
        <Tab>PS2 games</Tab>
        <Tab>Mobile games</Tab>
      </TabList>

      {/* Tab Content */}
      <TabPanel>
        <Ps2Links></Ps2Links>
      </TabPanel>
      <TabPanel>
        <Links></Links>
      </TabPanel>
    </Tabs>
    </div>
  );
}

export default App;
