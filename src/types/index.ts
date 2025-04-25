export interface TMedicine  {
  _id?: string; // optional because when creating, you might not have it yet
  name: string;
  brand: string;
  price: number;
  Img?: string;
  symptoms:
    | "Cough & Flu"
    | "Fever"
    | "Eye & Ear"
    | "Allergy"
    | "Skin & Hair"
    | "Diabetes";
  
  requiredPrescription: "Yes" | "No",
  description: string;
  manufacturerDetails: string;
  genericName: string;
  strength: string;
  dosCategory: string;
  quantity: number;
  inStock?: boolean;
  expiryDate: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TApiResponse<T> = {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    meta: TMeta;
    result: T[];
  };
};

export * from "./customer"