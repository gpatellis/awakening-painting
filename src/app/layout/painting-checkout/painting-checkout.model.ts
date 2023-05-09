export enum ORDERING_STATUS {
    shipping = "shipping",
	payment = "payment",
	confirmation = "confirmation",
}

export interface GOOGLE_ADDRESS_RESPONSE {
	address_components: GOOGlE_ADDRESS_COMPONENT[];
}

export interface GOOGlE_ADDRESS_COMPONENT {
	long_name: string;
	short_name: string;
	types: string[];
}