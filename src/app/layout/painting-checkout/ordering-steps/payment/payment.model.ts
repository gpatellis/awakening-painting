import { StripeAddressElementChangeEvent } from "@stripe/stripe-js";
import { CARRIER_RATE } from "../shipping/shipping.model";

export interface CREATE_PAYMENT_INTENT_RESPONSE {
    statusCode: number;
    body: PAYMENT_INTENT;
}

export interface PAYMENT_INTENT {
    client_secret: string;
    paymentIntentId: string;
}

export interface UPDATE_PAYMENT_INTENT_RESPONSE {
    statusCode: number;
    body: PAYMENT_INTENT_UPDATE;
}

export interface PAYMENT_INTENT_UPDATE {
    status: string;
    amount: number;
}

export interface PAYMENT_CONFRIMATION_DATA {
    carrierRateSelected: CARRIER_RATE;
    paintingPrice: number;
    totalAmount: number;
    paymentMethodDetails: PAYMENT_METHOD_RESPONSE;
}

export interface PAYMENT_METHOD_RESPONSE {
    billing_details: BILLING_DETAILS;
    card: BILLING_CARD;
    id: string;
}

export interface BILLING_DETAILS {
    address: ADDRESS_STRIPE,
    email: string;
    name: string;
    phone?: string;
}

export interface ADDRESS_STRIPE {
    city:  string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
}

export interface BILLING_CARD {
    brand: string;
    country: string;
    exp_month: number;
    exp_year: number;
    funding: string;
    last4: string;
}

export interface SHIPPING_ADDRESS_STRIPE {
    address: ADDRESS_STRIPE;
    name: string;
}
