import { TestBed, inject, async } from '@angular/core/testing';
import { Subject, Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

import { AnnotationStoreService } from './annotation-store.service';
import { ApiHttpService } from './api-http.service';
import { PdfAdapter } from './pdf-adapter';
import { PdfService } from './pdf.service';
import { Annotation, AnnotationSet, Comment } from './annotation-set.model';

declare global { interface Window { PDFAnnotate: any; } }

class MockPDFAnnotate {
  setStoreAdapter() {}
  getStoreAdapter() {
    const getAnnotation = function() {};
    const getAnnotations = function() {};
  }
}

class MockPdfAdapter {
  annotationSet: AnnotationSet;
  annotations: [Annotation];

  private annotationChangeSubject: Subject<{ type: String, annotation: Annotation }>;

  constructor() {
    this.annotationChangeSubject = new Subject<{ type: String, annotation: Annotation }>();
  }

  getAnnotationChangeSubject() {
    return this.annotationChangeSubject;
  }

  setStoreData() {}
  getStoreAdapter() {}
  editComment() {}
}

class MockApiHttpService {
  saveAnnotation() {}
  deleteAnnotation() {}
  fetch() {}
  createAnnotationSet() {}
}

class MockPdfService {
  getRenderOptions() {
    return {
      documentId: 'docId'
    };
  }
}

describe('AnnotationStoreService', () => {
  const mockPDFAnnotate = new MockPDFAnnotate();
  window.PDFAnnotate = mockPDFAnnotate;

  const mockPdfService = new MockPdfService();
  const mockApiHttpService = new MockApiHttpService();
  const mockPdfAdapter = new MockPdfAdapter();

  const dmDocumentId = 'ad88d12c-8526-49b6-ae5e-3f7ea5d08168';
  const dummyAnnotationSet = new AnnotationSet(
    '3351ebe9-a671-45c0-a36e-d348c40afb20',
    '123141',
    null, new Date(),
    '123141',
    null, new Date(), dmDocumentId,
    []
  );

  const mockAnnotation = new Annotation(
    '22a3bde9-18d6-46b2-982b-36e0a631ea4b',
    '9ad31e66-ec05-476d-9a38-09973d51c0c3',
    '111111', new Date(), null,
    '111111', null, new Date(), 'docId',
    1, 'red', []
  );

  const annotations = [new Annotation(
    'a9a04b1b-8a19-41f4-8a04-b55915fc4635',
    dummyAnnotationSet.id,
    '123141',
    new Date(),
    null,
    '123141',
    null,
    new Date(),
    dmDocumentId,
    1,
    'COLOR',
    [],
    [],
    'highlight'
    )];

  const dummyComment = new Comment(
    '84a2ae2b-4177-4e9d-bd70-2696c71a0820',
    annotations[0].id,
    '123141',
    null,
    new Date(),
    '123141',
    null,
    new Date(),
    'comment string'
  );

  const mockAnnotationSet = new AnnotationSet(
    '9ad31e66-ec05-476d-9a38-09973d51c0c3',
    '111111',
    null,
    new Date(),
    '111111', null,
    new Date(),
    '',
    [mockAnnotation]
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnnotationStoreService,
        { provide: ApiHttpService, useFactory: () => mockApiHttpService },
        { provide: PdfAdapter, useFactory: () => mockPdfAdapter},
        { provide: PdfService, useFactory: () => mockPdfService},
        ]
    });

    spyOn(mockPdfAdapter, 'getAnnotationChangeSubject').and.returnValue(of({type: null, annotation: null}));
  });

  describe('constructor', () => {
    it('should be created', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      expect(service).toBeTruthy();
    }));

    it('should initialise commentBtnSubject', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      expect(service['commentBtnSubject']).toBeDefined();
    }));

    it('should initialise contextualToolBarOptions', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      expect(service.getToolbarUpdate()).toBeDefined();
    }));

    it('should subscribe to pdfAdapater annotationChangeSub',  inject([AnnotationStoreService], () => {
      expect(mockPdfAdapter.getAnnotationChangeSubject).toHaveBeenCalled();
    }));
  });

  describe('onDestroy', () => {
    it('should unsubscribe from the annotationChangeSubscription', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      const annotationChangeSubscription = service['annotationChangeSubscription'];
      spyOn(annotationChangeSubscription, 'unsubscribe');
      service.ngOnDestroy();
      expect(annotationChangeSubscription.unsubscribe).toHaveBeenCalled();
    }));
  });

  describe('getAnnotationFocusSubject', () => {
    it('should return annotationFocusSubject', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      expect(service.getAnnotationFocusSubject()).toBeTruthy();
    }));
  });

  describe('setAnnotationFocusSubject', () => {
    it('should set the annotationFocusSubject', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      service.getAnnotationFocusSubject().subscribe((annotation) => {
        expect(annotation).toBe(mockAnnotation);
      });

      service.setAnnotationFocusSubject(mockAnnotation);
    }));
  });

  describe('getCommentFocusSubject', () => {
    it('should return commentFocusSubject', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      expect(service.getCommentFocusSubject()).toBeTruthy();
    }));
  });

  // describe('setCommentFocusSubject', () => {
  //   it('should set the commentFocusSubject and showButton should default to false',
  //     inject([AnnotationStoreService], (service: AnnotationStoreService) => {

  //     service.getCommentFocusSubject().subscribe((commentOptions: {annotation, showButton}) => {
  //       console.log(commentOptions);
  //       expect(commentOptions).toBe({annotation: mockAnnotation, showButton: true});
  //       // expect(commentOptions.showButton).toBeFalsy();
  //     });

  //     service.setCommentFocusSubject(mockAnnotation, true);
  //   }));
  // });

  describe('setCommentBtnSubject', () => {
    it('should set the commentBtnSubject', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      const commentId = '99750ac4-10c9-401e-b127-c043bf4e80fc';
      service.getCommentBtnSubject().subscribe((subId) => {
        expect(subId).toBe(commentId);
      });

      service.setCommentBtnSubject(commentId);
    }));
  });

  describe('setToolbarUpdate', () => {
    it('should set the contextualToolBarOptions and showButton false',
      inject([AnnotationStoreService], (service: AnnotationStoreService) => {
        service.getToolbarUpdate().subscribe((contexualOptions) => {
          expect(contexualOptions.annotation).toBe(mockAnnotation);
          expect(contexualOptions.showDelete).toBeFalsy();
        });
        service.setToolBarUpdate(mockAnnotation);
    }));

    it('should set the contextualToolBarOptions and showButton false',
    inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      service.getToolbarUpdate().subscribe((contexualOptions) => {
        expect(contexualOptions.annotation).toBe(mockAnnotation);
        expect(contexualOptions.showDelete).toBeTruthy();
      });
      service.setToolBarUpdate(mockAnnotation, true);
  }));
  });

  describe('preLoad with annotation data', () => {

    // it('should set pdfStoreAdapter with data', inject([AnnotationStoreService], (service: AnnotationStoreService)  => {
    //   spyOn(pdfAdapaterSpy, 'setStoreData');

    //   spyOn(mockPDFAnnotate, 'setStoreAdapater').and.returnValue(
    //     new Promise((resolve) => {
    //       resolve({pdfInfo: { numPages: 65}});
    //     }
    //   ));
    //   service.preLoad(dummyAnnotationSet);
    //   expect(pdfAdapaterSpy.setStoreData).toHaveBeenCalled();
    // }));
  });

  describe('handleAnnotationEvent', () => {
    it('should call saveAnnotation for addAnnotation event', async(inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      spyOn(mockApiHttpService, 'saveAnnotation').and.returnValue(Observable.of({response: 'ok', error: 'not ok'}));

      service.handleAnnotationEvent({type: 'addAnnotation', annotation: mockAnnotation});
      expect(mockApiHttpService.saveAnnotation).toHaveBeenCalled();
    })));

    it('should call saveAnnotation for addComment event', async(inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      spyOn(mockApiHttpService, 'saveAnnotation').and.returnValue(Observable.of({response: 'ok', error: 'not ok'}));

      service.handleAnnotationEvent({type: 'addComment', annotation: mockAnnotation});
      expect(mockApiHttpService.saveAnnotation).toHaveBeenCalled();
    })));

    it('should call saveAnnotation for editComment event', async(inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      spyOn(mockApiHttpService, 'saveAnnotation').and.returnValue(Observable.of({response: 'ok', error: 'not ok'}));

      service.handleAnnotationEvent({type: 'editComment', annotation: mockAnnotation});
      expect(mockApiHttpService.saveAnnotation).toHaveBeenCalled();
    })));

    it('should call saveAnnotation for deleteComment event', async(inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      spyOn(mockApiHttpService, 'saveAnnotation').and.returnValue(Observable.of({response: 'ok', error: 'not ok'}));

      service.handleAnnotationEvent({type: 'deleteComment', annotation: mockAnnotation});
      expect(mockApiHttpService.saveAnnotation).toHaveBeenCalled();
    })));

    it('should call saveAnnotation for editAnnotation event', async(inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      spyOn(mockApiHttpService, 'saveAnnotation').and.returnValue(Observable.of({response: 'ok', error: 'not ok'}));

      service.handleAnnotationEvent({type: 'editAnnotation', annotation: mockAnnotation});
      expect(mockApiHttpService.saveAnnotation).toHaveBeenCalled();
    })));

    it('should call saveAnnotation for deleteAnnotation event',
      async(inject([AnnotationStoreService], (service: AnnotationStoreService) => {
        spyOn(mockApiHttpService, 'deleteAnnotation').and.returnValue(Observable.of({response: 'ok', error: 'not ok'}));

        service.handleAnnotationEvent({type: 'deleteAnnotation', annotation: mockAnnotation});
        expect(mockApiHttpService.deleteAnnotation).toHaveBeenCalled();
    })));
  });

  describe('fetchData', () => {

    it('should return annotationSet if successful', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      const mockResponse = new HttpResponse().clone({body: mockAnnotationSet});
      spyOn(mockApiHttpService, 'fetch').and.returnValue(Observable.of(mockResponse));
      service.fetchData('http://localhost:3000', 'documentId').subscribe(response => {
        expect(response.body).toBe(mockAnnotationSet);
      });
    }));

    it('should call httpService.createAnnotationSet if 404', inject([AnnotationStoreService], () => {
    }));

    it('should return error Observable if 400', inject([AnnotationStoreService], () => {
    }));

    it('should return error Observable if 500', inject([AnnotationStoreService], () => {
    }));
  });

  // describe('saveData', () => {

  //   spyOnProperty(mockPdfAdapter, 'annotationSet', 'get').and.returnValue(
  //     dummyAnnotationSet);
  //   spyOnProperty(mockPdfAdapter, 'annotations', 'get').and.returnValue(
  //       annotations);
  // });

  describe('saveAnnotation', () => {
    it('should call httpservice to save annotation', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      spyOn(mockApiHttpService, 'saveAnnotation').and.returnValue(of('ok'));

      service.saveAnnotation(annotations[0]);
      expect(mockApiHttpService.saveAnnotation).toHaveBeenCalledWith(annotations[0]);
    }));

    it('should log the error if encountered', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      spyOn(mockApiHttpService, 'saveAnnotation').and.callFake(() => {
        return Observable.create(observer => {
          observer.error();
        });
      });
      service.saveAnnotation(annotations[0]);
    }));
  });

  describe('deleteAnnotation', () => {
    it('should call httpservice to delete annotation', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      spyOn(mockApiHttpService, 'deleteAnnotation').and.returnValue(of('ok'));

      service.deleteAnnotation(annotations[0]);
      expect(mockApiHttpService.deleteAnnotation).toHaveBeenCalledWith(annotations[0]);
    }));

    it('should log the error if encountered', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      spyOn(mockApiHttpService, 'deleteAnnotation').and.callFake(() => {
        return Observable.create(observer => {
          observer.error();
        });
      });
      service.deleteAnnotation(annotations[0]);
    }));
  });

  describe('editComment', () => {
    it('should call pdfAdapater to edit comment', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
      spyOn(mockPdfAdapter, 'editComment');

      service.editComment(dummyComment);
      expect(mockPdfAdapter.editComment).toHaveBeenCalledWith(dummyComment);
    }));
  });

  // describe('getAnnotationById', () => {
  //   it('should return a promise with the annotation', inject([AnnotationStoreService], (service: AnnotationStoreService) => {
  //     service.getAnnotationById(mockAnnotation.id);
  //   }));
  // });
});
