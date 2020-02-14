import { component, mixin, createCell, Fragment } from 'web-cell';
import { FileInput } from 'boot-cell/source/Form/FileInput';
import { Button } from 'boot-cell/source/Form/Button';

import { loadImage } from '../utility';

const support = 'FaceDetector' in self;

@component({
    tagName: 'detect-page',
    renderTarget: 'children'
})
export class DetectPage extends mixin() {
    private imageURI: string;

    cacheImage = async ({ currentTarget }: Event) => {
        const { value } = currentTarget as FileInput;

        this.imageURI = value;
    };

    detectImage = async (event: Event) => {
        event.preventDefault();

        let list = await new FaceDetector({ fastMode: false }).detect(
            await loadImage(this.imageURI)
        );
        console.log(list);

        if (!list[0]) return self.alert('未检测到人脸');

        list = list.filter(({ landmarks }) => landmarks?.[0]);

        if (!list[0]) self.alert('未检测出五官');
    };

    connectedCallback() {
        this.classList.add(
            'd-flex',
            'vh-100',
            'flex-column',
            'align-items-center',
            'justify-content-center'
        );
    }

    render() {
        return (
            <Fragment>
                {support ? null : (
                    <header className="text-muted p-3">
                        您的浏览器暂不支持人脸识别，可尝试开启{' '}
                        <a
                            target="_blank"
                            href="chrome://flags/#enable-experimental-web-platform-features"
                        >
                            Chrome: Experimental Web Platform features
                        </a>
                    </header>
                )}
                <form onSubmit={this.detectImage}>
                    <FileInput
                        className="d-block mb-3"
                        accept="image/*"
                        onChange={this.cacheImage}
                    />
                    <Button type="submit" block>
                        识别
                    </Button>
                </form>
            </Fragment>
        );
    }
}
