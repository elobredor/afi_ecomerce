export interface EpaycoResponse {
    x_ref_payco: string
    x_transaction_id: string
    x_amount: string
    x_currency_code: string
    x_signature: string
    complemento: Complemento
    id: number
    pedido: number
  }
  
  export interface Complemento {
    x_cust_id_cliente: string
    x_ref_payco: string
    x_id_factura: string
    x_id_invoice: string
    x_description: string
    x_amount: string
    x_amount_country: string
    x_amount_ok: string
    x_tax: string
    x_amount_base: string
    x_currency_code: string
    x_bank_name: string
    x_cardnumber: string
    x_quotas: string
    x_respuesta: string
    x_response: string
    x_approval_code: string
    x_transaction_id: string
    x_fecha_transaccion: string
    x_transaction_date: string
    x_cod_respuesta: string
    x_cod_response: string
    x_response_reason_text: string
    x_errorcode: string
    x_cod_transaction_state: string
    x_transaction_state: string
    x_franchise: string
    x_business: string
    x_customer_doctype: string
    x_customer_document: string
    x_customer_name: string
    x_customer_lastname: string
    x_customer_email: string
    x_customer_phone: string
    x_customer_movil: string
    x_customer_ind_pais: string
    x_customer_country: string
    x_customer_city: string
    x_customer_address: string
    x_customer_ip: string
    x_test_request: string
    x_extra1: string
    x_extra2: string
    x_extra3: string
    x_extra4: string
    x_extra5: string
    x_extra6: string
    x_extra7: string
    x_extra8: string
    x_extra9: string
    x_extra10: string
    x_tax_ico: string
    x_payment_date: string
    x_signature: string
    x_transaction_cycle: string
    is_processable: string
  }
  