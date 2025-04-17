// export const isValidUrl = (url?: string) => 
//     url && (url.startsWith("/") || url.startsWith("http"));

export const isValidUrl = (url?: string) =>
    typeof url === "string" &&
    url.trim() !== "" &&
    (url.startsWith("/") || url.startsWith("http")|| url.startsWith("https" ));
