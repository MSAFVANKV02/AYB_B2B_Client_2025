
import SellerRegisterSendOtpForm from "./seller_sent_otp_form";
import { Card } from "@/components/ui/card";


export default function SellerRegisterPage() {
  return (
    <div className="h-screen w-full flex xl:flex-row">
      <div
        className="xl:w-[60%] xl:flex hidden justify-end"
        style={{
          backgroundImage: `url('/auth/store3.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          margin: "0 auto",
          flexWrap: "wrap",
        // filter: "blur(1.8px)",

        }}
      >
        {/* <h1 className="m-2 text-2xl select-none">Ayaboo.com</h1> */}
      </div>
      <div className="xl:w-[40%] w-full h-full">
        <div className="flex justify-center items-center p-4 bg-gray-50 h-full">
          <Card className="w-full max-w-[400px] space-y-5 border-none shadow-lg">
            {/* Store Register Form */}
            <SellerRegisterSendOtpForm />

           
          </Card>
        </div>
      </div>
    </div>
  );
}

