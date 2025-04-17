import { ProductState } from "@/utils/Validator/product-validator";

type Props = {
  fTabsList: {
    id: number;
    name: string;
    value: string;
  }[];
  setFilter: React.Dispatch<React.SetStateAction<ProductState>>;
  filter: ProductState;
};

function RespFilterTabs({ fTabsList, setFilter , filter}: Props) {
  const handleChangeFilter = (tab: ProductState["fTab"]) => {
    setFilter((prev) => ({
      ...prev,
      fTab: tab,
    }));
    // const params = new URLSearchParams();
    // if (tab !== "clear") {
    //   params.set("fTab", tab);
    // } else {
    //   params.delete("fTab");
    // }

    // navigate(`?${params}`);
  };

  return (
    <ul className="flex flex-col h-full border bg-white">
      {fTabsList.map((tab) => (
        <li
          key={tab.id}
          className={` ${filter.fTab === tab.value ?"bg-[#F6F6F6] font-semibold shadow-inner border-none":""} duration-200 transition-transform border-b p-3 text-xs cursor-pointer`}
          onClick={() => {
            handleChangeFilter(tab.value as ProductState["fTab"]);
          }}
        >
          {tab.name}
        </li>
      ))}
    </ul>
  );
}

export default RespFilterTabs;
