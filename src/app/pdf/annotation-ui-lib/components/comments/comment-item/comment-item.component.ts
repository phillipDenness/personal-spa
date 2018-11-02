import {Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy, ChangeDetectorRef, ElementRef, Inject} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/platform-browser';
import {Comment, Annotation} from '../../../data/annotation-set.model';
import {AnnotationStoreService} from '../../../data/annotation-store.service';
import { PdfService } from '../../../data/pdf.service';

@Component({
    selector: 'app-comment-item',
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit, OnDestroy {

    private commentBtnSub: Subscription;
    private commentFocusSub: Subscription;
    hideButton: boolean;
    focused: boolean;

    private dataLoadedSubscription: Subscription;
    @Input() annotation: Annotation;
    @Input() comment: Comment;

    @Output() commentSubmitted: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('commentArea') commentArea: ElementRef;
    @ViewChild('commentItem') commentItem: NgForm;

    zIndex;
    commentPosTop;

    constructor(private annotationStoreService: AnnotationStoreService,
                @Inject(DOCUMENT) private document: any,
                private pdfservice: PdfService,
                private ref: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.hideButton = true;
        this.focused = false;

        this.commentFocusSub = this.annotationStoreService.getCommentFocusSubject()
            .subscribe((options) => {
                if (options.annotation.id === this.comment.annotationId) {
                    this.focused = true;
                    if (options.showButton) {
                        this.handleShowBtn();
                        this.commentArea.nativeElement.focus();
                    }
                    this.ref.detectChanges();
                } else {
                    this.onBlur();
                }
        });

        this.commentBtnSub = this.annotationStoreService.getCommentBtnSubject()
            .subscribe((commentId) => {
                if (commentId === this.comment.id) {
                this.handleShowBtn();
                } else {
                this.handleHideBtn();
                }
            });

          this.dataLoadedSubscription = this.pdfservice.getDataLoadedSub()
            .subscribe((dataLoaded: boolean) => {
                if (dataLoaded) {
                this.commentPosTop = this.getRelativePosition(this.comment.annotationId);
                }
            });
    }

    ngOnDestroy() {
        if (this.commentFocusSub) {
            this.commentFocusSub.unsubscribe();
        }
        if (this.commentBtnSub) {
            this.commentBtnSub.unsubscribe();
        }
        if (this.dataLoadedSubscription) {
            this.dataLoadedSubscription.unsubscribe();
        }
    }

    onSubmit() {
        const comment = this.convertFormToComment(this.commentItem);
        this.annotationStoreService.editComment(comment);
        this.commentSubmitted.emit(this.annotation);
        this.handleHideBtn();
    }

    onBlur() {
        this.zIndex = 0;
        if (!this.ref['destroyed']) {
            this.ref.detectChanges();
        }
    }

    convertFormToComment(commentForm: NgForm): Comment {
        return new Comment(
            this.comment.id,
            this.comment.annotationId,
            null,
            null,
            new Date(),
            null,
            null,
            null,
            commentForm.value.content
        );
    }

    handleDeleteComment() {
        this.annotationStoreService.deleteComment(this.comment.id);
    }

    handleCommentClick() {
        this.annotationStoreService.setCommentBtnSubject(this.comment.id);
        this.zIndex = 1;
        this.annotationStoreService.setAnnotationFocusSubject(this.annotation);
    }

    handleShowBtn() {
        this.focused = true;
        this.hideButton = false;
    }

    handleHideBtn() {
        if (!this.commentItem.value.content) {
            this.annotationStoreService.deleteComment(this.comment.id);
        }
        this.focused = false;
        this.hideButton = true;
    }

    getRelativePosition(annotationId: string): number {
        const svgSelector = this.document.querySelector(`g[data-pdf-annotate-id="${annotationId}"]`);
        const highlightRect = <DOMRect>svgSelector.getBoundingClientRect();
        const wrapper = this.document.querySelector('#annotation-wrapper');
        const wrapperRect = <DOMRect>wrapper.getBoundingClientRect();
        const top = (highlightRect.y - wrapperRect.top);

        return top;
    }
}
