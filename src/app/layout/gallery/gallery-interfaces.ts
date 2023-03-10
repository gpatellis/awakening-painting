import { SafeUrl } from "@angular/platform-browser";

export interface PaintingData { // create enums
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
}

export interface PaintingDataResponse {
    paintings: PaintingData[];
}

export interface PaintingModalData {
    painting: PaintingData;
    isMobileView: boolean;
    isTabletView: boolean;
}
