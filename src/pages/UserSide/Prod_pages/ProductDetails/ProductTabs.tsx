import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";

export default function ProductTabs() {
  const tabData = [
    {
      label: "Product Features",
      content:
        "Elementum faucibus mi sed non. Eget mus tristique a aliquam viverra egestas sed donec. Ultrices id morbi platea libero dignissim non. Eu a nibh nunc id sit dui mollis massa. Dolor lobortis enim nulla aliquam convallis nisi vel libero sollicitudin. Nulla nunc in nunc nunc nec arcu. Semper donec mi donec aliquam ipsum eget ut sed sagittis. Imperdiet etiam morbi vulputate vitae interdum hac leo eget. Dolor sollicitudin consequat nulla tellus. Nulla aenean lectus nunc elementum scelerisque ut.",
    },
    {
      label: "Special Features",
      content:
        "Elementum faucibus mi sed non. Eget mus tristique a aliquam viverra egestas sed donec. Ultrices id morbi platea libero dignissim non. Eu a nibh nunc id sit dui mollis massa. Dolor lobortis enim nulla aliquam convallis nisi vel libero sollicitudin. Nulla nunc in nunc nunc nec arcu. Semper donec mi donec aliquam ipsum eget ut sed sagittis. Imperdiet etiam morbi vulputate vitae interdum hac leo eget. Dolor sollicitudin consequat nulla tellus. Nulla aenean lectus nunc elementum scelerisque ut.",
    },
    {
      label: "Care Guide",
      content:
        "Elementum faucibus mi sed non. Eget mus tristique a aliquam viverra egestas sed donec. Ultrices id morbi platea libero dignissim non. Eu a nibh nunc id sit dui mollis massa. Dolor lobortis enim nulla aliquam convallis nisi vel libero sollicitudin. Nulla nunc in nunc nunc nec arcu. Semper donec mi donec aliquam ipsum eget ut sed sagittis. Imperdiet etiam morbi vulputate vitae interdum hac leo eget. Dolor sollicitudin consequat nulla tellus. Nulla aenean lectus nunc elementum scelerisque ut.",
    },
  ];

  return (
    <Tabs aria-label="Basic tabs" defaultValue={0}>
      <TabList className="custom-tablist">
        {tabData.map((tab, index) => (
          <Tab key={index}>{tab.label}</Tab>
        ))}
      </TabList>
      {tabData.map((tab, index) => (
        <TabPanel
          key={index}
          value={index}
          className="max-h-[400px] overflow-auto"
        >
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );
}
