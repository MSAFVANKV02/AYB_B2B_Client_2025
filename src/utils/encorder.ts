// Encodes the orderId into base64, removing padding characters
export const encodeId = (orderId: string): string => {
  const base64Encoded = btoa(orderId); // Use btoa to encode in Base64
  return base64Encoded.replace(/=+$/, ''); // Remove trailing '=' padding
};

// Decodes the base64-encoded orderId, adding padding if needed
export const decodeId = (encodedOrderId: string): string => {
  // Add back padding if it's missing before decoding
  const paddedBase64 = encodedOrderId + '=='.slice(0, (4 - encodedOrderId.length % 4) % 4);
  return atob(paddedBase64); // Use atob to decode from Base64
};
