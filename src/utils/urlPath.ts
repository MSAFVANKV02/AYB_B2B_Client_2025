

// User Register Routes =================================================

// ---- fetch current users --------------------------------
export const CURRENT_USER_URL = `/user_api/user/getCurrentuser`;
// ---- fetch current users --------------------------------


export const USER_LOGOUT = `user_api/user/logoutUser`

export const SEND_OTP_REGISTER_USER = `/user_api/user/sendOtp`;
export const VERIFY_OTP_REGISTER_USER = `/user_api/user/verifyOtp`;
export const RESEND_OTP_USER = `/user_api/user/resendOtp`;
export const SUBMIT_USER_DETAILS_REGISTRATION = `user_api/user/registerUser`;

// user login Routes =============================
export const SEND_OTP_USER_LOGIN = `/user_api/user/sendOtpForLogin`;
export const USER_LOGIN_OTP_VERIFICATION = `/user_api/user/verifyOtpForLogin`;

// user kyc Routes =============
export const UPLOAD_USER_KYC = `/user_api/user/submitKyc`;



// ======= store registrations =====
export const SEND_OTP_STORE_REGISTER = `/user_api/store/sendOtp_Storereg`;
export const RESEND_OTP_STORE_REGISTER = `/user_api/store/resendOtp_Storereg`;
export const VERIFY_OTP_STORE_REGISTER = `/user_api/store/verifyOtp_Storereg`;
// ===== create store ===-================================================
export const CREATE_STORE_USER = `/user_api/store/registerStore_storereg`;

// ======= seller registrations =====
export const SEND_OTP_SELLER_REGISTER = `/user_api/seller/sendOtp_Sellerreg`;
export const RESEND_OTP_SELLER_REGISTER = `/user_api/seller/resendOtp_Sellerreg`;
export const VERIFY_OTP_SELLER_REGISTER = `/user_api/seller/verifyOtp_Sellerreg`;
export const CREATE_SELLER_USER = `/user_api/seller/registerSeller_sellerreg`;





// ======= store kyc =====

