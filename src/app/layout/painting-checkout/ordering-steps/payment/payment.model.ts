export interface CREATE_PAYMENT_INTENT_RESPONSE {
    statusCode: number;
    body: CLIENT_SECRET
}

interface CLIENT_SECRET {
    client_secret: string;
}