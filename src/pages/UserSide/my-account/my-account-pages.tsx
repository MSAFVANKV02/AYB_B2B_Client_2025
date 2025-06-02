
import { useParams } from "react-router-dom";
import MyOrdersPage from "./my-orders/My-Orders-Page";
import ReturnOrderPage from "./my-orders/return/page";
import UseReviewPage from "./reviews/use-review-page";
import ChatPage from "./chat/Chat-Page";
import WishlistPage from "./wishlist/wishlist-page";
import NotificationsPage from "./notifications/notifications-page";
import PageOnBuild from "@/components/myUi/PageOnBuild";

const MyAccountPages = () => {
  const { page } = useParams();

  const renderPages = () => {
    switch (page) {
      case "my-orders":
        return <MyOrdersPage />;
      case "return":
        return <ReturnOrderPage />;
      case "review":
        return <UseReviewPage />;
      case "chat":
        return <ChatPage />;
      case "my-wishlist":
        return <WishlistPage />;
      case "notifications":
        return <NotificationsPage />;
      case "credit-request":
        return <PageOnBuild />;
      default:
        return <div>Page not found</div>;
    }
  };

  return <div>{renderPages()}</div>;
};

export default MyAccountPages;
