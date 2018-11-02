import {ElementRef, Injectable} from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';

declare const PDFJS: any;
declare const PDFAnnotate: any;

@Injectable()
export class PdfService {

    PAGE_HEIGHT;
    UI;
    comments;
    private RENDER_OPTIONS: { documentId: string, pdfDocument: any, scale: any, rotate: number };
    private pageNumber: BehaviorSubject<number>;
    private annotationSub: Subject<string>;
    private dataLoadedSubject: BehaviorSubject<boolean>;

    pdfPages: number;
    viewerElementRef: ElementRef;

    constructor() {
        this.dataLoadedSubject = new BehaviorSubject(false);
    }

    preRun() {
        this.PAGE_HEIGHT = void 0;
        this.UI = PDFAnnotate.UI;

        this.pageNumber = new BehaviorSubject(1);

        this.annotationSub = new Subject();
        this.annotationSub.next(null);
    }

    getDataLoadedSub(): BehaviorSubject<boolean> {
        return this.dataLoadedSubject;
    }

    dataLoadedUpdate(isLoaded: boolean) {
        this.dataLoadedSubject.next(isLoaded);
    }

    getPageNumber(): BehaviorSubject<number> {
        return this.pageNumber;
    }

    setPageNumber(pageNumber: number) {
        this.pageNumber.next(pageNumber);
    }

    getAnnotationClicked(): Subject<string> {
        return this.annotationSub;
    }

    setAnnotationClicked(annotationId: string) {
        this.annotationSub.next(annotationId);
    }

    getRenderOptions() {
        return Object.assign({}, this.RENDER_OPTIONS);
    }

    setRenderOptions(RENDER_OPTIONS: { documentId: string; pdfDocument: null; scale: number; rotate: number; }): any {
        this.RENDER_OPTIONS = RENDER_OPTIONS;
    }

    render(viewerElementRef?: ElementRef) {
        if (viewerElementRef != null) {
            this.viewerElementRef = viewerElementRef;
        }
        PDFJS.workerSrc = '/assets/pdf.worker.js';
        PDFJS.getDocument(this.RENDER_OPTIONS.documentId)
            .then(pdf => {
                this.RENDER_OPTIONS.pdfDocument = pdf;

                const viewer = this.viewerElementRef.nativeElement;
                viewer.innerHTML = '';
                const NUM_PAGES = pdf.pdfInfo.numPages;
                for (let i = 0; i < NUM_PAGES; i++) {
                    const page = this.UI.createPage(i + 1);
                    viewer.appendChild(page);
                    setTimeout(() => {
                        this.UI.renderPage(i + 1, this.RENDER_OPTIONS).then(resolve => {
                            if (i === NUM_PAGES - 1) {
                              this.dataLoadedUpdate(true);
                            }
                          });
                    });
                }
                this.pdfPages = NUM_PAGES;
            }).catch(
            (error) => {
                const errorMessage = new Error('Unable to render your supplied PDF. ' +
                    this.RENDER_OPTIONS.documentId + '. Error is: ' + error);
                console.log(errorMessage);
            }
        );
    }

    setHighlightTool() {
        PDFAnnotate.UI.enableRect('highlight');
    }

    setCursorTool() {
        PDFAnnotate.UI.disableRect();
    }
}
