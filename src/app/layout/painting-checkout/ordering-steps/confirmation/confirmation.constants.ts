export const STRIPE_PAYMENT_SUCCESS = "succeeded"
export const SHIPPING_LABEL_AND_CONFIRMATION_EMAIL_SUCCESS = "succeeded"

export enum UPDATE_SOLD_PAINTING_RESPONSES {
    successfull = "Successfull",
    paintingAlreadySold = "Painting Already Sold"
}

export enum UPDATE_SOLD_PAINTING {
    sold = "Sold",
    available = "Available"
}

export const STRIPE_PAYMENT_CONSOLE_ERROR = "stripePaymentConfirmationResponse.status does not say succeeded"
export const UPDATE_SOLD_PAINTING_CONSOLE_ERROR = "the updateSoldPaintingEndpoint response does not match the intended responses"
export const SHIPPING_LABEL_AND_CONFIRMATION_EMAIL_ERROR = "the createShippingLabelAndConfirmationEmailEndpoint response does not match the intended responses"