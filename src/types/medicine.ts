

export interface TMedicine {
    name: string;
    Img?: string;
    brand: string;
    price: number;
    symptoms: "Cough & Flu" | "Fever" | "Eye & Ear" | "Allergy" | "Skin & Hair" | "Diabetes";
    requiredPrescription: "Yes" | "No";
    description: string;
    manufacturerDetails: string;
    genericName: string;
    strength: string;
    dosCategory: string;
    quantity: number;
    inStock: boolean;
    expiryDate: Date
}