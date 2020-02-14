export function loadImage(URI: string) {
    const image = new Image();

    return new Promise<HTMLImageElement>((resolve, reject) => {
        (image.onload = () => resolve(image)), (image.onerror = reject);

        (image.crossOrigin = 'anonymous'), (image.src = URI);
    });
}
