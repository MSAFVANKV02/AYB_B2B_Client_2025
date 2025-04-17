export const encodeId = (Id: string): string => {
    // Convert string to a Uint8Array using TextEncoder
    const encoder = new TextEncoder();
    const encodedArray = encoder.encode(Id);
    // Convert to base64 using btoa() after converting the bytes to a string
    return btoa(String.fromCharCode(...encodedArray));
  };
  
  export const decodeId = (encodedId: string): string => {
    // Decode base64 using atob() and convert back to Uint8Array
    const decodedArray = Uint8Array.from(atob(encodedId), c => c.charCodeAt(0));
    const decoder = new TextDecoder();
    return decoder.decode(decodedArray);
  };
  