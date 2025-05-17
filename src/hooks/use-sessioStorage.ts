export const AddToSessionStorage = (path: string, data: any) => {
  //   const searchParams = useSearchParams();
  //   const params = new URLSearchParams(searchParams);
  if (path) {
    window.sessionStorage.setItem(path, data);
    // params.set(storageName, path);
  }
};

export const DeleteSessionStorage = (path: string) => {
  if (path) {
    return window.sessionStorage.removeItem(path);
  }
};

export const GetSessionStorage = (path: string) => {
  if (path) {
    return window.sessionStorage.getItem(path);
  }
};

export const SessionStorageAllPaths = () => {
    const orders = "orders" 
    return{
        orders
    }
};
