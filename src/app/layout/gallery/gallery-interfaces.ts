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
}

export interface PaintingDataResponse {
    paintings: PaintingData[];
}
