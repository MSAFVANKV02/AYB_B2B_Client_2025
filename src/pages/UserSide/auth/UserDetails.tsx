import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ClipLoader from "react-spinners/ClipLoader";

import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { useState } from "react";
import { makeToast, makeToastError } from "@/utils/toaster";
import axios from "axios";
import { fetchAyabooUserDetails } from "@/redux/userSide/UserAuthSlice";
import { useAppDispatch } from "@/redux/hook";
import { User_Details_Registration_Api } from "@/services/user_side_api/auth/route_url";

// Define the Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  shopName: z.string().min(1, { message: "Name is required." }),
  pinCode: z.string().min(1, { message: "Name is required." }),
  policyVerified: z.boolean().refine((val) => val === true, {
    message: "You must accept the policy.",
  }),
  isWhatsappApproved: z.boolean().optional(),
});

type IFormData = {
  name: string;
  shopName?: string;
  pinCode?: string;
  policyVerified: boolean;
  isWhatsappApproved: boolean;
};

function UserDetails() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch()
  // const [loading] = useState(false);


  const queryParams = new URLSearchParams(window.location.search)
  const auth = queryParams.get("auth");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shopName: "",
      pinCode: "",
      policyVerified: false,
      isWhatsappApproved: false,
    },
  });

  // Handle form submission
  const onSubmit = async (data: IFormData) => {
    try {
      setLoading(true);
      const response = await User_Details_Registration_Api({ ...data, mobile: auth });

      // console.log(response.data,'response.data userDetails');
      if (response.status === 200) {
        // console.log("Data sent successfully",response.data);
        // localStorage.setItem("userProfile", JSON.stringify(response.data.user));
        // dispatch(setUserData(response.data.user));
        dispatch(fetchAyabooUserDetails());
        makeToast(`${response.data.message}`)
        navigate("/kyc");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // console.log(
        //   "Error sending data:",
        //   error.response?.data || error.message
        // );
        makeToastError(`${error.response?.data.message}`)
      } else {
        console.error("Unexpected error:");
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="h-screen w-screen flex relative">
      <img
        src="/img/Background Images/userlogin-bg.svg"
        alt=""
        className="absolute object-cover top-0 left-0 bottom-0 right-0 w-full h-full"
      />
      <div className="bg-[#F5E9FF] max-w-[370px] w-[370px] space-y-5 h-fit backdrop-blur-2xl rounded-2xl p-5 flex flex-col gap-3 m-auto">
        <ArrowLeft
          onClick={() => navigate("/register")}
          className="cursor-pointer text-textMain"
        />
        <div className="flex flex-col w-full   space-y-5">
          <div className="">
            <h4 className="font-bold">Enter Account Information</h4>
            <p className="text-gray-400 text-sm">
              Register your business on odio
            </p>
          </div>

          <Form {...form}>
            <>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 text-gray-500"
              >
                {/* Name Input */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name" className="text-base">
                        Your Name
                      </FormLabel>
                      <FormControl>
                        <input
                          placeholder="Enter your name"
                          {...field}
                          className="w-full p-3 mt-1 rounded-xl border border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Shop Name Input */}
                <FormField
                  control={form.control}
                  name="shopName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="shopName" className="text-base">
                        Business or Shop Name
                      </FormLabel>
                      <FormControl>
                        <input
                          placeholder="Enter your shop name"
                          {...field}
                          className="w-full p-3 mt-1 rounded-xl border border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Pin Code Input */}
                <FormField
                  control={form.control}
                  name="pinCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="pinCode" className="text-base">
                        PinCode
                      </FormLabel>
                      <FormControl>
                        <input
                          placeholder="Enter your pin code"
                          {...field}
                          className="w-full p-3 rounded-xl border border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Policy Verified Checkbox */}
                <FormField
                  control={form.control}
                  name="policyVerified"
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="flex items-center gap-3 ">
                        <FormControl>
                          <Checkbox
                            id="policyVerified"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="rounded-none"
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor="policyVerified"
                          className="cursor-pointer text-sm text-gray-700" // Adjust text color and size as needed
                        >
                          Verify Our Terms & Conditions
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* whatsApp Checkbox */}
                <FormField
                  control={form.control}
                  name="isWhatsappApproved"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <Checkbox
                          id="isWhatsappApproved"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-none"
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor="isWhatsappApproved"
                        className="cursor-pointer text-sm text-gray-700" // Adjust text color and size as needed
                      >
                        Recieve communication via whatsapp
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="b2bStyle"
                  className="w-full  "
                  size={`b2b`}
                >
                  {loading ? (
                    <ClipLoader color="#ffff" size={20} />
                  ) : (
                    "Continue"
                  )}
                </Button>
              </form>
            </>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
