import { apiKeys } from "./api-keys/api-keys.prod";

export const environment = {
  production: true,
  getAddressValidationEndpoint: "https://7ht7ltoomd.execute-api.us-east-1.amazonaws.com/v1/checkAddressValidation",
  getCarrierRatesEndpoint: "https://1w1je378kc.execute-api.us-east-1.amazonaws.com/v1/getCarrierRates",
  getImagesFromCloudFrontS3: "https://dnxr70io2hu9r.cloudfront.net/",
  paintingData: "paintingData.json",
  createPaymentIntentEndpoint: "https://0uklap4ofa.execute-api.us-east-1.amazonaws.com/v1/createPaymentIntent",
  updatePaymentIntentEndpoint: "https://j7ve7kxn19.execute-api.us-east-1.amazonaws.com/v1/updatePaymentIntent",
  updateSoldPaintingEndpoint: "https://i9zyu57qsb.execute-api.us-east-1.amazonaws.com/v1/updateSoldPainting",
  createShippingLabelAndConfirmationEmailEndpoint: 'https://py3576nqti.execute-api.us-east-1.amazonaws.com/v1/createShippingLabelAndConfirmationEmail',
  allowOnlineCheckout: true,
  googleMapsApi: {
    apiKey: apiKeys.googleMapsApi.apiKey
  },
  stripe: {
    publicKey: apiKeys.stripe.publicKey,
  }
};
