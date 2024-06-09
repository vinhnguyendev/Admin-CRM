interface Address {
    homeAddress: string;
    state: string;
    zipCode: string;
    county: string;
  }
  
 export interface CustomerData {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    lastServiced: string;
    technician: string;
    comments: string;
    address: Address;
    seer: string;
    condenser: string;
    airHandler: string;
    heater: string;
    acLocation: string;
  }