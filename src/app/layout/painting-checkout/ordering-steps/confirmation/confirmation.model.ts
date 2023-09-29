import { PAYMENT_CONFRIMATION_DATA, PAYMENT_INTENT, PAYMENT_METHOD } from "../payment/payment.model";

export interface UPDATE_SOLD_PAINTING_RESPONSE {
    update: string;
}

export interface STRIPE_PAYMENT_CONFIRMATION_RESPONSE {
    paymentIntent?: PAYMENT_INTENT;
    error?: STRIPE_PAYMENT_CONFIRMATION_ERROR;
}

export interface STRIPE_PAYMENT_CONFIRMATION_ERROR {
    charge: string;
    code: string;
    decline_code: string;
    doc_url: string;
    message: string;
    payment_intent: PAYMENT_INTENT;
    payment_method: PAYMENT_METHOD;
    request_log_url: string;
    type: string;
}

export interface SHIPPING_LABEL_AND_CONFIRMATION_EMAIL_RESPONSE {
    status: string;
}