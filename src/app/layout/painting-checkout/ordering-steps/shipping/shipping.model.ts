export interface ADDRESS_VALIDATION_RESPONSE {
    statusCode: number;
    shipEngineStatusCode: number;
    body: ADDRESS_VALIDATION_BODY[]
}

export interface CARRIER_RATES_RESPONSE {
    statusCode: number;
    shipEngineStatusCode: number;
    body: CARRIER_RATE[]
}

export interface CARRIER_RATE {
    rate_id: string;
    rate_type: string;
    carrier_id: string;
    shipping_amount: SHIPPING_AMOUNT;
    estimated_delivery_date: string;
    service_type: string
}

export interface SHIPPING_AMOUNT {
    currency: string;
    amount: number
}

export interface ADDRESS_VALIDATION_BODY {
    status: string;
    original_address: ADDRESS;
    matched_address: ADDRESS;
    messages: any[];
}

export interface ADDRESS {
    name: string;
    phone: string;
    company_name: string;
    address_line1: string;
    address_line2: string;
    address_line3: string;
    city_locality: string;
    state_province: string;
    postal_code: number;
    country_code: string;
    address_residential_indicator: string;
    emailAddress?: string;
}
