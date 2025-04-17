// import { makeToast, makeToastError } from "@/utils/toaster";
// import StoreRegisterSendOtpForm from "./store_register_form";
// import {
//   register_send_otp_store_Api,
//   register_Verify_otp_store_Api,
// } from "@/services/user_side_api/store/route";
// import { Form, Formik } from "formik";
// import * as Yup from "yup";
// import StoreVerifyOtpForm from "./store_verify_otp_form";
// import { Card, CardFooter } from "@/components/ui/card";
// import AyButton from "@/components/myUi/AyButton";
// import { Link } from "react-router-dom";

// const validationSchema = Yup.object().shape({
//   mobile: Yup.string()
//     .matches(/^\d{10,}$/, "Mobile number must be at least 10 digits")
//     .required("Mobile number is required"),
//   otp: Yup.string()
//     .nullable()
//     .when("otp_sender", {
//       is: true, // Applies validation only if registrationType is "PVT LTD"
//       then: (schema) =>
//         schema
//           .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
//           .required("Otp is required"),
//       otherwise: (schema) => schema.nullable(), // Optional for other types
//     }),
// });

// export default function StoreRegisterPage() {
//   const storedTimer = Number(localStorage.getItem("otp-timer")) || 0;

//   // console.log(storedTimer,'storedTimer');

//   return (
//     <div className="h-screen w-full flex xl:flex-row-reverse">
//       <div
//         className="xl:w-[60%] xl:flex hidden justify-end"
//         style={{
//           backgroundImage: `url('/auth/annie-spratt-hCb3lIB8L8E-unsplash.jpg')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           // boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
//           margin: "0 auto",
//           flexWrap: "wrap",
//         }}
//       >
//         <h1 className="m-2 text-2xl select-none">Ayaboo.com</h1>
//       </div>
//       <div className="xl:w-[40%] w-full h-full">
//         <Formik
//           initialValues={{
//             mobile: "",
//             otp_sender: storedTimer > 0,
//             otp: "",
//           }}
//           validationSchema={validationSchema}
//           onSubmit={async (values, { setFieldValue }) => {
//             console.log(values);
//             try {
//               if (!values.otp_sender) {
//                 const response = await register_send_otp_store_Api(
//                   values.mobile
//                 );
//                 if (response.status === 200) {
//                   makeToast(response.data.message);
//                   setFieldValue("otp_sender", true);
//                   localStorage.setItem("otp-timer", "60");
//                   localStorage.removeItem("otp-finished");
//                   localStorage.removeItem("store_reg_num");
//                 }
//               } else {
//                 console.log("api to : ");

//                 const mobile = localStorage.getItem("store_reg_num") ?? "";
//                 const response = await register_Verify_otp_store_Api({
//                   mobile: values.mobile || mobile,
//                   otp_Store: values.otp,
//                 });
//                 localStorage.setItem("store_reg_num", values.mobile);

//                 localStorage.setItem("otp-timer", "0");
//                 localStorage.removeItem("otp-finished");
//                 if (response.status === 200) {
//                   makeToast(response.data.message);
//                   setFieldValue("otp_sender", true);
//                 }
//               }
//             } catch (error: any) {
//               console.log("Error:", error);
//               if (error.response.data) {
//                 makeToastError(error.response.data.message);
//                 return;
//               }
//             }
//           }}
//         >
//           {({ values, setFieldValue, isSubmitting }) => (
//             <Form className="flex justify-center items-center p-4 bg-gray-50 h-full">
//               <Card className="w-full max-w-[400px] space-y-5 border-none shadow-lg">
//                 {/* 1. send Otp Form === */}
//                 {values.otp_sender || storedTimer > 0 ? (
//                   <StoreVerifyOtpForm
//                     setFieldValue={setFieldValue}
//                     isSubmitting={isSubmitting}
//                     values={values}
//                   />
//                 ) : (
//                   <StoreRegisterSendOtpForm
//                     setFieldValue={setFieldValue}
//                     isSubmitting={isSubmitting}
//                   />
//                 )}

//                 <CardFooter className="flex flex-col gap-4">
//                   <AyButton
//                     title="Verify OTP"
//                     loading={isSubmitting}
//                     disabled={isSubmitting}
//                     type="submit"
//                     sx={{
//                       width: "100%",
//                       height: "40px",
//                     }}
//                   />
//                   <div className="flex text-xs gap-2 items-center">
//                     <p className="text-sm">Already a Supplier</p> ?
//                     <Link
//                       to="https://store.ayaboo.com/login"
//                       className="text-blue-600 hover:text-blue-400 hover:underline"
//                     >
//                       Sign In
//                     </Link>
//                   </div>
//                 </CardFooter>
//               </Card>

//               {/* 2. verify Otp Form ===  */}
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// }
// =================================================================
import StoreRegisterSendOtpForm from "./store_sent_otp_form";
import { Card } from "@/components/ui/card";


export default function StoreRegisterPage() {
  return (
    <div className="h-screen w-full flex xl:flex-row-reverse">
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
            <StoreRegisterSendOtpForm />

           
          </Card>
        </div>
      </div>
    </div>
  );
}

