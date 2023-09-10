export const environment = {
  production: true,
  getAddressValidationEndpoint: 'https://w3bxzjfsxg.execute-api.us-east-1.amazonaws.com/v1/checkaddressvalidation',
  getCarrierRatesEndpoint: 'https://is7633u508.execute-api.us-east-1.amazonaws.com/v1/getcarrierrates',
  getImagesFromCloudFrontS3: 'https://dnxr70io2hu9r.cloudfront.net/',
  paintingData: 'paintingData.json',
  createPaymentIntentEndpoint: "https://bjdx3cog18.execute-api.us-east-1.amazonaws.com/v1/createpaymentintent",
  updatePaymentIntentEndpoint: 'https://eq1yd658df.execute-api.us-east-1.amazonaws.com/v1/updatepaymentintent',
  allowOnlineCheckout: false,
  googleMapsApi: {
    apiKey: 'AIzaSyC9s0coG4ziTZ9etSHtm_FWwrPRPX9c2eE'
  },
  stripe: {
    publicKey: 'pk_test_51NXQnKAFGO2wW8pWFNwPdMIGFRwXIHFRsKqOThn95bOAuxNsSuKBS6h3o7rSs7SSoS7NTPimqmKTdaJYVqVzcwG800GZh6hL3a',
  }
};
