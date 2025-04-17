

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function ReturnTabs({ activeTab, setActiveTab }: Props) {
  const tabLists = [
    { slug: "refund", title: "Refund / Replace Allowed" },
    { slug: "requests", title: "Refund / Replace Requests" },
    { slug: "replace", title: "Replace Requests" },
    { slug: "send", title: "Refund Request" },
  ];

  return (
    <div>
      <ul className="flex gap-5 overflow-y-auto m-0 list-none border-b border-gray-300 pb-2 px-0">
        {tabLists.map((tab, index) => (
          <li key={index} className="">
            <button
              onClick={() => setActiveTab(tab.slug)}
              className={`py-2 text-sm font-medium  ${
                activeTab === tab.slug
                  ? "text-black "
                  : "text-textGray hover:text-gray-900"
              }`}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
