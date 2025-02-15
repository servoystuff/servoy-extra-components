import { Component, ChangeDetectorRef, SimpleChanges, Renderer2, Input, ChangeDetectionStrategy } from '@angular/core';
import { ServoyBaseComponent, IFoundset } from '@servoy/public';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';

@Component({
    selector: 'servoyextra-lightboxgallery',
    templateUrl: './lightboxgallery.html',
    styleUrls: ['./lightboxgallery.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyExtraLightboxGallery extends ServoyBaseComponent<HTMLDivElement> {

    @Input() onHoverButtonClicked: (e: Event, imageId: string) => void;

    @Input() imagesFoundset: IFoundset;
    @Input() maxImageWidth: number;
    @Input() maxImageHeight: number;
    @Input() albumLabel: string;
    @Input() fadeDuration: number;
    @Input() fitImagesInViewport: boolean;
    @Input() imageFadeDuration: number;
    @Input() positionFromTop: number;
    @Input() resizeDuration: number;
    @Input() wrapAround: boolean;
    @Input() galleryVisible: boolean;
    @Input() showCaptionInGallery: boolean;
    @Input() showImageNumberLabel: boolean;
    @Input() hoverButtonIcon: string;
    @Input() buttonText: string;
    @Input() buttonStyleClass: string;
    @Input() enabled: boolean;

    public images: Array<any> = [];


    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef, private _lightbox: Lightbox, private _lightboxConfig: LightboxConfig) {
        super(renderer, cdRef);
    }

    svyOnInit() {
        super.svyOnInit();
        this._lightboxConfig.albumLabel = this.albumLabel;
        if (this.fadeDuration) {
            this._lightboxConfig.fadeDuration = this.fadeDuration / 1000;
        }
        this._lightboxConfig.fitImageInViewPort = this.fitImagesInViewport;
        this._lightboxConfig.positionFromTop = this.positionFromTop;
        if (this.resizeDuration) {
            this._lightboxConfig.resizeDuration = this.resizeDuration / 1000;
        }
        this._lightboxConfig.wrapAround = this.wrapAround;
        this._lightboxConfig.showImageNumberLabel = this.showImageNumberLabel;

    }

    svyOnChanges(changes: SimpleChanges) {
        if (changes) {
            if (changes.imagesFoundset) {
                this.createImages();
            }
        }
        super.svyOnChanges(changes);
    }

    open(index: number): void {
        // open lightbox
        this._lightbox.open(this.images, index);
    }

    close(): void {
        // close lightbox programmatically
        this._lightbox.close();
    }

    showLightbox(index: number): void {
        this.open(0);
    }

    refresh(index: number): void {
        this.svyOnInit();
    }

    private createImages = () => {
        this.images = [];
        if (this.imagesFoundset) {
            for (const row of this.imagesFoundset.viewPort.rows) {
                const image = {
                    src: row.image && row.image.url ? row.image.url : null,
                    caption: row.caption ? row.caption : null,
                    thumb: row.thumbnail && row.thumbnail.url ? row.thumbnail.url : null,
                    imageId: row.imageId
                };

                //check if using url strings instead of media/blob
                image.src = typeof row.image == 'string' ? row.image : image.src;
                image.thumb = typeof row.thumbnail == 'string' ? row.thumbnail : image.thumb;

                if (!image.src) continue;
                this.images.push(image);
            }
        }

    };
}

