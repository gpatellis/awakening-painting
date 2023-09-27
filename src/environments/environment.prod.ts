export const environment = {
  production: true,
  getAddressValidationEndpoint: "https://7ht7ltoomd.execute-api.us-east-1.amazonaws.com/v1/checkAddressValidation",
  getCarrierRatesEndpoint: "https://1w1je378kc.execute-api.us-east-1.amazonaws.com/v1/getCarrierRates",
  getImagesFromCloudFrontS3: "https://dnxr70io2hu9r.cloudfront.net/",
  paintingData: "paintingData.json",
  createPaymentIntentEndpoint: "https://0uklap4ofa.execute-api.us-east-1.amazonaws.com/v1/createPaymentIntent",
  updatePaymentIntentEndpoint: "https://j7ve7kxn19.execute-api.us-east-1.amazonaws.com/v1/updatePaymentIntent",
  updateSoldPaintingEndpoint: "https://i9zyu57qsb.execute-api.us-east-1.amazonaws.com/v1/updateSoldPainting",
  allowOnlineCheckout: false,
  googleMapsApi: {
    apiKey: "AIzaSyC9s0coG4ziTZ9etSHtm_FWwrPRPX9c2eE"
  },
  stripe: {
    publicKey: "pk_test_51NXQnKAFGO2wW8pWFNwPdMIGFRwXIHFRsKqOThn95bOAuxNsSuKBS6h3o7rSs7SSoS7NTPimqmKTdaJYVqVzcwG800GZh6hL3a",
  }
};
