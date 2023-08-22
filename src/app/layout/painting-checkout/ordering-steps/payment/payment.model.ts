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
    amount: string;
}

