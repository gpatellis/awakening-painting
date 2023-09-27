import { SafeUrl } from "@angular/platform-browser";

export interface PaintingData {
    name: string;
    paintType: string;
    image: string;
    dimensions: string;
    edgesPainted: boolean;
    surfaceType: string;
    DateFinished: string;
    status: string;
    renderedImage: SafeUrl;
    objectUrl: string;
    aspectRatio: number;
    price: number;
    length:	number;
    width:	number;
    height:	number;
    distanceUnit: string;
    weight:	number;
    weightUnit:	string;
}

export interface PaintingModalData {
    painting: PaintingData;
    isMobileView: boolean;
    isTabletView: boolean;
}
