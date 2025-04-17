import SettingsLayout from "../layout";
import RefundRequests from "./refund_requests";
import ReturnDetails from "./return_details";
import ReturnLists from "./return_lists";
import ReturnTabs from "./return_tabs";
import { useLocation, useNavigate } from "react-router-dom";

function UseReturnPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get("tab") || "refund";
  const slug = queryParams.get("slug");
  // Update the URL query parameter when switching tabs
  const handleTabChange = (tab: string) => {
    queryParams.set("tab", tab);
    queryParams.delete("slug");
    navigate({ search: queryParams.toString() });
  };

  // Dynamic content based on the active tab
  const renderTabContent = () => {
    if (slug) {
      // If a slug is present, render ReturnDetails
      return <ReturnDetails />;
    }

    switch (activeTab) {
      case "refund":
        return <ReturnLists />;
      case "requests":
        return <RefundRequests/>  ;
      case "replace":
        return <RefundRequests/>;
      case "send":
        return <div>Product Send Content</div>;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <SettingsLayout>
      <div className="">
        {!slug && (
          <ReturnTabs activeTab={activeTab} setActiveTab={handleTabChange} />
        )}

        <div className="mt-4">{renderTabContent()}</div>
      </div>
    </SettingsLayout>
  );
}

export default UseReturnPage;
