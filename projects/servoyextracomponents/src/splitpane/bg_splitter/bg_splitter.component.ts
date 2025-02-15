import { Component, Input, Output, OnChanges,SimpleChanges, EventEmitter, HostListener, AfterContentInit,
                ContentChildren, QueryList, Renderer2, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';

import { BGPane } from './bg_pane.component';
@Component( {
    selector: 'bg-splitter',
    template: '<div class="split-panes" #element><ng-content></ng-content></div>',
    styleUrls: ['./bg_splitter.css'],
    encapsulation: ViewEncapsulation.None
} )
export class BGSplitter implements AfterContentInit , OnChanges {

    @Input() orientation = 'vertical';
    @Input() divSize: number;
    @Input() divLocation: number;

    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onDividerChange = new EventEmitter();


    @ContentChildren( BGPane )
    private panes: QueryList<BGPane>;

    @ViewChild( 'element' , {static: true})
    private elementRef: ElementRef;

    private drag = false;
    private handler;

    constructor( private readonly renderer: Renderer2 ) {
        this.handler = this.renderer.createElement( 'div' );
        this.renderer.addClass( this.handler, 'split-handler' );

        this.handler.addEventListener( 'mousedown', ( ev ) => {
            ev.preventDefault();
            this.drag = true;
        } );
    }

    @HostListener( 'document:mouseup', ['$event'] )
    mouseup( event: MouseEvent ) {
        if ( this.drag ) {
            let dividerLocation: string;
            if(this.orientation === 'vertical' ) {
                dividerLocation = this.handler.style.top;
            } else {
                dividerLocation = this.handler.style.left;
            }
            this.onDividerChange.emit( dividerLocation ? parseInt(dividerLocation.substring(0, dividerLocation.length - 2), 10) : 0);
        }
        this.drag = false;
    }

    @HostListener( 'mousemove', ['$event'] )
    mousemove( event: MouseEvent ) {
        if ( !this.drag ) return;
        this.adjustLocation(event);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['divSize']  && changes['divSize'].currentValue >= 0 ) {
            let styleName = 'width';
            if (this.orientation === 'vertical') styleName = 'height';
            this.renderer.setStyle(this.handler,styleName, changes['divSize'].currentValue +'px');
            this.adjustLocation(null, this.divLocation);
        }
         if (changes['orientation']) {
            this.renderer.addClass( this.elementRef.nativeElement, this.orientation);
        }
        if (changes['divLocation'] && changes['divLocation'].currentValue >= 0) {
            this.adjustLocation(null, changes['divLocation'].currentValue);
        }
    }

    ngAfterContentInit() {
        let index = 1;
        this.panes.forEach(( item ) => {
            item.index = index++;
            if ( item.minSize === undefined ) item.minSize = 0;
        } );
        this.renderer.insertBefore( this.elementRef.nativeElement, this.handler, this.panes.last.element.nativeElement );

        this.adjustLocation(null,this.divLocation);
    }


    private adjustLocation(event?: MouseEvent,wantedPosition?: number) {
        if (!this.panes || this.panes.length !== 2) return;
        const bounds = this.elementRef.nativeElement.getBoundingClientRect();
        const pos = this.getPosition(bounds, event, wantedPosition);
        if ( this.orientation === 'vertical' ) {
            const height = bounds.bottom - bounds.top;

            if ( pos < this.panes.first.minSize ) return;
            if ( height - pos < this.panes.last.minSize ) return;
            this.renderer.setStyle( this.handler, 'top', pos + 'px' );
            this.renderer.setStyle( this.panes.first.element.nativeElement, 'height', pos + 'px' );
            this.renderer.setStyle( this.panes.last.element.nativeElement, 'top', pos + 'px' );
        } else {
            const width = bounds.right - bounds.left;

            if ( pos < this.panes.first.minSize ) return;
            if ( width - pos < this.panes.last.minSize ) return;
            this.renderer.setStyle( this.handler, 'left', pos + 'px' );
            this.renderer.setStyle( this.panes.first.element.nativeElement, 'width', pos + 'px' );
            this.renderer.setStyle( this.panes.last.element.nativeElement, 'left',  pos + 'px' );
        }
    }

    private getPosition(bounds: any, event?: any, wantedPosition?: number) {
        if ( this.orientation === 'vertical' ) {
            const height = bounds.bottom - bounds.top;
            if ((wantedPosition < 0 || wantedPosition === undefined) && (event === undefined)) {
                return height / 2;
            } else if (event !== undefined) {
                return event.clientY - bounds.top;
            }
            if (wantedPosition >= 0 && wantedPosition <= 1) {
                return Math.round(height * wantedPosition);
            }
        } else {//horizontal
            const width = bounds.right - bounds.left;
            if ((wantedPosition < 0 || wantedPosition === undefined) && (event === undefined)) {
                return width / 2;
            } else if (event !== undefined) {
                return event.clientX - bounds.left;
            }
            if (wantedPosition >= 0 && wantedPosition <= 1) {
                return Math.round(width * wantedPosition);
            }
        }
        return wantedPosition;
    }
}
