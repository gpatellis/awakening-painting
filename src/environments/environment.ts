// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  getAddressValidationEndpoint: 'https://w3bxzjfsxg.execute-api.us-east-1.amazonaws.com/v1/checkaddressvalidation/dev',
  getCarrierRatesEndpoint: 'https://is7633u508.execute-api.us-east-1.amazonaws.com/v1/getcarrierrates/dev',
  getImagesFromCloudFrontS3: 'https://dnxr70io2hu9r.cloudfront.net/',
  createPaymentIntentEndpoint: "https://bjdx3cog18.execute-api.us-east-1.amazonaws.com/v1/createpaymentintent/dev",
  allowOnlineCheckout: true,
  googleMapsApi: {
    apiKey: 'AIzaSyC9s0coG4ziTZ9etSHtm_FWwrPRPX9c2eE'
  },
  stripe: {
    publicKey: 'pk_test_51NXQnKAFGO2wW8pWFNwPdMIGFRwXIHFRsKqOThn95bOAuxNsSuKBS6h3o7rSs7SSoS7NTPimqmKTdaJYVqVzcwG800GZh6hL3a',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
