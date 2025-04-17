import axios from 'axios';
import Cookies from 'js-cookie';

export const isAuthenticated_4_Kyc = () => {
  const token = Cookies.get('us_tkn_kyc');
//   console.log('Token from cookies:', token);
//   console.log(document.cookie);

  return !!token; // Returns true if the token exists, otherwise false
};


export const isAuthenticated = () => {
    const token = Cookies.get('us_b2b_tkn');
    // console.log('Token from cookies:', token);
    // console.log(document.cookie);
  
    return !!token; // Returns true if the token exists, otherwise false
  };


  export const checkAuthKyc = async () => {
    // const token = Cookies.get("st_b2b_tkn"); 
    // console.log(token,'token');
    
    try {
      const response = await axios.get("http://localhost:4000/user_api/user/auth/check/kyc", { withCredentials: true });
      
      // console.log(response,'response');
      
      return response.data.authenticated;
    } catch {
      return false;
    }
  };
