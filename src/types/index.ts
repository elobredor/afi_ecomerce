export interface BillingData {
    id: string;
    name: string;
    nit: string;
    address: string;
    city: string;
    phone: string;
    email: string;
    isPrimary: boolean;
    quota: number;
    totalBilling: number;
    availableQuota: number;
  }