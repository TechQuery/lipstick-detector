declare type LandmarkType = 'mouth' | 'eye' | 'nose';

declare interface Point2D {
    x: number;
    y: number;
}

declare interface Landmark {
    type: LandmarkType;
    readonly locations: Point2D[];
}

declare interface DetectedFace {
    readonly boundingBox: DOMRectReadOnly;
    readonly landmarks?: Landmark[];
}

interface FaceDetectorOptions {
    maxDetectedFaces?: number;
    fastMode?: boolean;
}

declare class FaceDetector {
    constructor(faceDetectorOptions?: FaceDetectorOptions);

    detect(image: ImageBitmapSource): Promise<DetectedFace[]>;
}
