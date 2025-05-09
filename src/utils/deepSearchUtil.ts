// utils.ts
export const deepSearch = (obj: any, query: string): boolean => {
    if (typeof obj === "string") {
      return obj.toLowerCase().includes(query);
    }
  
    if (typeof obj === "number" || typeof obj === "boolean") {
      return obj.toString().toLowerCase().includes(query);
    }
  
    if (Array.isArray(obj)) {
      return obj.some((item) => deepSearch(item, query));
    }
  
    if (typeof obj === "object" && obj !== null) {
      return Object.values(obj).some((value) => deepSearch(value, query));
    }
  
    return false;
  };
  