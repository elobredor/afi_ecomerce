export interface Equivalent {
    logo: string;
    codigo: string;
    price: number;
}
export interface Producto {
    id: number;
    code: string;
    name: string;
    full_name: string;
    description: string;
    category: string;
    brand: string;
    line: string;
    price: string;
    discountedprice: string;
    image: string;
    isavailable: number;
    equivalents: Equivalent[];
  
}
export interface CurrentProduct {
    characteristic: Characteristic[]
    crosseItems: CrosseItem[]
    relationedItems: any[]
    oem: string[]
    applications: string[]
    item:Producto
  }

  export interface Characteristic {
    cca_id: number
    cca_idtrca: number
    cca_categoria: number
    cca_marca: number
    cca_linea: string
    cca_consumo: any
    cca_modelo: any
    cca_family_code: any
    cca_caracteristica: any
    mfa_id: number
    mfa_pref: string
    mfa_name: string
    mfa_gcode: any
    business: number
    branch: any
    mga_code: string
    mga_name: string
    mga_acctin: any
    mga_acct_out: any
    mga_acct_inv: any
    mga_acct_stockn: any
    mga_acct_stockp: any
    mga_acct_redu: any
    mga_acct_amp: any
    mga_acct_cost: any
    mga_enabled: number
    mga_id: number
    mga_accretpurch: any
    mga_accretsales: any
    mga_acct_invproc: any
    deductible_spent: any
    taxable_income: any
    mga_acct_return: any
    mga_userelated: any
    msg_id: number
    msg_pref: string
    msg_name: string
    msg_fcode: any
    cca_categoria_name: string
    cca_linea_name: string
    cca_marca_name: string
    item_id: number
  }
  
  export interface CrosseItem {
    id: number
    code: number
  }
  