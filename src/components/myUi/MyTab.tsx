
// // =================
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { cn } from "@/lib/utils";
// import { useCallback, useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// type Tab = {
//   value: string;
//   title: string;
//   url: string;
//   TriggerCss?: string; // Full custom TailwindCSS for trigger
//   tabCss?: string; // Full custom TailwindCSS for tab list
//   children?: React.ReactNode;
//   onClick?: () => void;
// };

// type MyTabProps = {
//   setTypeUrl?: (value: string) => void;
//   tabs: Tab[];
//   sideBtn?: React.ReactNode;
//   hiddenTabList?: boolean;
// };

// function MyPageTab({
//   tabs,
//   setTypeUrl,
//   sideBtn,
//   hiddenTabList = true,
// }: MyTabProps) {
//   const [activeTab, setActiveTab] = useState<string | null>(null);
//   const [searchParams] = useSearchParams();
//   const type = searchParams.get("type");
//   const navigate = useNavigate();

//   const handleTabClick = useCallback(
//     (url: string, value: string) => {
//       navigate(url);
//       setActiveTab(value);
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     const matchingTab = tabs.find((tab) => tab.value === type);
//     if (matchingTab) {
//       setActiveTab(matchingTab.value);
//       setTypeUrl?.(matchingTab.value);
//     } else if (tabs.length > 0) {
//       setActiveTab(tabs[0].value);
//       setTypeUrl?.(tabs[0].value);
//     }
//   }, [type, tabs, setTypeUrl]);

//   // if( activeTab === tabs[0].value){
//   //     makeToast(activeTab)
//   // }

//   if (!activeTab) return null;

//   return (
//     <Tabs defaultValue={activeTab} value={activeTab} className="w-full">
//       <div className="flex justify-between">
//         {hiddenTabList && (
//           <TabsList
//             className={cn(
//               "border relative bg-transparent md:h-auto h-fit flex flex-wrap items-start sm:justify-normal md:rounded-full w-fit rounded-md py-1",
//               tabs.find((t) => t.value)?.tabCss
//             )}
//           >
//             {tabs.map((tab) => (
//               <TabsTrigger
//                 key={tab.value}
//                 value={tab.value}
//                 // className={cn(
//                 //   "text-xs min-w-36 font-bold w-auto py-3 data-[state=active]:rounded-full " ,
//                 //   tabs.find((t) => t.value === activeTab)?.TriggerCss
//                 // )}
//                 className={cn(
//                   "data-[state=active]:bg-bg min-w-36  w-auto py-3 data-[state=active]:text-white data-[state=active]:rounded-full",
//                   tabs[0].TriggerCss
//                 )}
//                 onClick={() => {
//                   tab.onClick?.();
//                   handleTabClick(tab.url, tab.value);
//                 }}
//               >
//                 {tab.title}
//               </TabsTrigger>
//             ))}
          
//           </TabsList>
//         )}

//         {sideBtn}
//       </div>

//       {tabs.map(
//         (tab) =>
//           tab.value === activeTab && (
//             <TabsContent key={tab.value} value={tab.value} className="w-full">
//               {tab.children}
//             </TabsContent>
//           )
//       )}
//     </Tabs>
//   );
// }

// export default MyPageTab;
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type Tab = {
  value: string;
  title: string;
  url: string;
  TriggerCss?: string; // Full custom TailwindCSS for trigger
  children?: React.ReactNode;
  onClick?: () => void;
};

type MyTabProps = {
  setTypeUrl?: (value: string) => void;
  tabs: Tab[];
  sideBtn?: React.ReactNode;
  hiddenTabList?: boolean;
  tabsListCss?: string; // Custom CSS for TabsList (e.g. border style)
  triggerActiveCss?: string; // Custom CSS for Active Trigger
  triggerDefaultCss?: string; // Custom CSS for Default Trigger
};

function MyPageTab({
  tabs,
  setTypeUrl,
  sideBtn,
  hiddenTabList = true,
  tabsListCss = "border-b border-gray-300", // Default gray border like the image
  triggerActiveCss = "text-black after:bg-black after:w-full after:h-[2px] after:absolute after:bottom-[-1px]", // Default active underline
  triggerDefaultCss = "text-gray-500", // Default inactive color
}: MyTabProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const navigate = useNavigate();

  const handleTabClick = useCallback(
    (url: string, value: string) => {
      navigate(url);
      setActiveTab(value);
    },
    [navigate]
  );

  useEffect(() => {
    const matchingTab = tabs.find((tab) => tab.value === type);
    if (matchingTab) {
      setActiveTab(matchingTab.value);
      setTypeUrl?.(matchingTab.value);
    } else if (tabs.length > 0) {
      setActiveTab(tabs[0].value);
      setTypeUrl?.(tabs[0].value);
    }
  }, [type, tabs, setTypeUrl]);

  if (!activeTab) return null;

  return (
    <Tabs defaultValue={activeTab} value={activeTab} className="w-full">
      <div className="flex justify-between">
        {hiddenTabList && (
          <TabsList
            className={cn(
              "bg-transparent md:h-auto h-fit flex flex-wrap items-start sm:justify-normal w-full relative",
              tabsListCss
            )}
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "relative text-sm px-4 py-2 transition-all duration-300 ",
                  triggerDefaultCss,
                  activeTab === tab.value && triggerActiveCss
                )}
                onClick={() => {
                  tab.onClick?.();
                  handleTabClick(tab.url, tab.value);
                }}
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
        )}

        {sideBtn}
      </div>

      {tabs.map(
        (tab) =>
          tab.value === activeTab && (
            <TabsContent key={tab.value} value={tab.value} className="w-full">
              {tab.children}
            </TabsContent>
          )
      )}
    </Tabs>
  );
}

export default MyPageTab;
