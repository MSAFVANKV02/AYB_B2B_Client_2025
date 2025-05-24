
import { useNavigate } from 'react-router-dom';



const Commands = () => {
    const navigate = useNavigate();
    const commands: { keywords: string[]; action: () => void }[] = [
        {
            keywords: [
              "home", "main home", "homepage", "start page",
              "go to home", "open home", "go to main home", "open main home",
              "go to homepage", "open homepage", "go to start page", "open start page"
            ],
            action: () => navigate("/")
          },
          {
            keywords: [
              "login", "sign in", "log in", "access account", "user login",
              "go to login", "open login", "go to sign in", "open sign in",
              "go to log in", "open log in", "go to access account", "open access account"
            ],
            action: () => navigate("/login")
          },
          {
            keywords: [
              "about", "about us", "who we are", "company info", "our story",
              "go to about", "open about", "go to about us", "open about us",
              "go to who we are", "open who we are", "go to company info", "open company info",
              "go to our story", "open our story"
            ],
            action: () => navigate("/about")
          },
          {
            keywords: [
              "otp verification", "verify otp", "enter otp", "confirm code",
              "go to otp verification", "open otp verification",
              "go to verify otp", "open verify otp",
              "go to enter otp", "open enter otp",
              "go to confirm code", "open confirm code"
            ],
            action: () => navigate("/register/otp-verification")
          },
          {
            keywords: [
              "user details", "my details", "enter user details", "fill user form", "profile details",
              "go to user details", "open user details",
              "go to my details", "open my details",
              "go to profile details", "open profile details"
            ],
            action: () => navigate("/register/user-details")
          },
          {
            keywords: [
              "all products", "products", "all kind products", "browse all", "product list", "shop all",
              "go to products", "open products",
              "go to all products", "open all products",
              "go to browse all", "open browse all"
            ],
            action: () => navigate("/page/all")
          },
          {
            keywords: [
              "cart", "shopping cart", "my cart", "view cart", "show cart items",
              "go to cart", "open cart", "go to shopping cart", "open shopping cart",
              "go to my cart", "open my cart"
            ],
            action: () => navigate("/cart")
          },
          {
            keywords: [
              "checkout", "purchase page", "buy now", "proceed to payment", "place order",
              "go to checkout", "open checkout", "go to purchase page", "open purchase page"
            ],
            action: () => navigate("/cart/checkout")
          },
          {
            keywords: [
              "confirm order", "order confirmation", "finalize order", "order placed", "confirmation page",
              "go to confirm order", "open confirm order",
              "go to order confirmation", "open order confirmation"
            ],
            action: () => navigate("/cart/checkout/order-confirmation")
          },
          {
            keywords: [
              "my account", "profile settings", "account", "user profile", "account settings",
              "go to my account", "open my account", "go to profile settings", "open profile settings"
            ],
            action: () => navigate("/my-account")
          },
          {
            keywords: [
              "my orders", "orders", "open order","order history", "view orders", "purchase history",
              "go to my orders", "open my orders", "go to orders", "open orders"
            ],
            action: () => navigate("/my-account/my-orders")
          },
          {
            keywords: [
              "order details", "single order", "last order", "latest order", "recent order",
              "go to order details", "open order details",
              "go to last order", "open last order"
            ],
            action: () => navigate("/my-account/my-orders/last")
          },
          {
            keywords: [
              "reviews", "my reviews", "write review", "order reviews", "product feedback",
              "go to reviews", "open reviews", "go to my reviews", "open my reviews"
            ],
            action: () => navigate("/my-account/my-orders/review")
          },
          {
            keywords: [
              "chat", "messages", "support chat", "customer support", "help center",
              "go to chat", "open chat", "go to messages", "open messages"
            ],
            action: () => navigate("/my-account/chat")
          },
          {
            keywords: [
              "wishlist", "my wishlist", "favorite items", "saved products", "favorites",
              "go to wishlist", "open wishlist", "go to my wishlist", "open my wishlist"
            ],
            action: () => navigate("/my-account/my-wishlist")
          },
          {
            keywords: [
              "notifications", "alerts", "updates", "notification center",
              "go to notifications", "open notifications"
            ],
            action: () => navigate("/my-account/notifications")
          },
          {
            keywords: [
              "seller register", "become a seller", "seller sign up", "register as seller", "open shop",
              "go to seller register", "open seller register"
            ],
            action: () => navigate("/become/seller/register")
          },
          {
            keywords: [
              "store register", "become a store", "store sign up", "create store", "open store",
              "go to store register", "open store register"
            ],
            action: () => navigate("/become/store/register")
          },
          {
            keywords: [
              "kyc home", "kyc page", "kyc start", "verify identity",
              "go to kyc home", "open kyc home", "go to kyc page", "open kyc page"
            ],
            action: () => navigate("/kyc")
          },
          {
            keywords: [
              "kyc details", "fill kyc", "kyc form", "kyc verification", "identity form",
              "go to kyc details", "open kyc details"
            ],
            action: () => navigate("/kyc/details")
          },
        {
            keywords: [
                "scroll to footer","scroll", "scroll footer", "footer", "go to footer", "open footer", "bottom of page"
              ],
          action: () =>
            document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" }),
        },
        {
            keywords: ["scroll to top", "scroll top", "top"],
            action: () =>
              window.scrollTo({ top: 0, behavior: "smooth" }),
          },
        // Add more static commands here if needed
      ];
  return {
    commands
  }
}

export default Commands