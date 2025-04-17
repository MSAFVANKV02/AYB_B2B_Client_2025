

// export interface IAddressType {
//     addresses: Address;
//   }
  
  export interface IAddressType {
    _id: string;
    name: string;
    mobile: number;
    email: string;
    street: string;
    city: string;
    building: string;
    landmark: string;
    state: string;
    country: string;
    zip: string;
    isDefault: boolean;
  }