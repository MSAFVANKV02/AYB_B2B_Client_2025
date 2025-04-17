import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode"; // Use named import
import { useEffect } from "react";
import SellerCreationPage from "./seller-creation/seller-creation-page";
import { makeToastError } from "@/utils/toaster";

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzkxZjQ2MmI1YzcxNjBiYmMxNWVkMGYiLCJtb2JpbGUiOiI3MDM0MzU5MzMwIiwiaWF0IjoxNzM3OTYyMDcyLCJleHAiOjE3NDA1NTQwNzJ9.itUpIK6bqIYeFydwmN9BxVuFWR2AaZgA4bNLIMHMu_Q

interface CustomJwtPayload extends JwtPayload {
  mobile: string; // Define the mobile field here
}

export default function SellerRegisterForm() {
  const { token } = useParams();
  const navigate = useNavigate();

  // Decode the JWT token and extract the payload
  // const decodedToken: CustomJwtPayload | null = token ? jwtDecode(token) : null;

  useEffect(() => {
    // makeToastError("useEffect")
    let decodedToken: CustomJwtPayload | null = null;

    try {
      if (token) {
        // Attempt to decode the token
        decodedToken = jwtDecode<CustomJwtPayload>(token);
      } else {
        const errMsg = "Invalid Token"
        makeToastError(errMsg);
        throw new Error("No token provided");
      }
    } catch (error: any) {
      const errMsg = "Invalid Token"
      makeToastError(errMsg||error);
      // console.log(error); 
      navigate("/become/seller/register");
      return;
    }

    const mobile = localStorage.getItem("store_reg_num") ?? "";
    const decodedMobile = decodedToken?.mobile; // Extract mobile number from the token

    if (mobile !== decodedMobile) {
      navigate("/become/seller/register"); // Redirect if mobile numbers do not match
    }
  }, [token, navigate]);

  return (
    <div className="">
      {/* {decodedToken ? (
        <pre>{JSON.stringify(decodedToken, null, 2)}</pre> // Display the decoded token in a readable format
      ) : (
        <p>No token available or invalid token.</p>
      )} */}
      <SellerCreationPage />
    </div>
  );
}
