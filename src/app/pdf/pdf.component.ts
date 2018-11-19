import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, Renderer2, NgZone } from '@angular/core';
import { AnnotationSet } from './annotation-ui-lib/data/annotation-set.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
  providers: [AngularFireStorage]
})
export class PdfComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  dmDocumentId: string;
  annotationSet: any;
  url: string;

  resolverSubscription: Subscription;
  routerSubscription: Subscription;

  apiUpdate: string;

  @ViewChild('uploadBtn') uploadBtn: ElementRef;

  constructor(private actr: ActivatedRoute,
              private afStorage: AngularFireStorage,
              private router: Router,
              private changeRef: ChangeDetectorRef,
              private renderer: Renderer2,
              private zone: NgZone) {

    this.apiUpdate = 'Rendering PDF';
    this.resolverSubscription = this.actr.data.subscribe(data => {
      this.dmDocumentId = data.items.substring(
        data.items.lastIndexOf('/o/') + 3,
        data.items.lastIndexOf('?')
      );
      this.url = data.items;
      this.annotationSet = new AnnotationSet('', null , null, null, null, null, null, this.dmDocumentId, []);
    });
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.routerSubscription = this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
            this.router.navigated = false;
            window.scrollTo(0, 0);
        }
    });
  }

  onDestroy() {
    if (this.resolverSubscription) {
      this.resolverSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.changeRef) {
      this.changeRef.detach();
    }
  }

  filePicker(event) {
    this.dmDocumentId = event.target.files[0].name;
    this.ref = this.afStorage.ref(this.dmDocumentId);
    this.task = this.ref.put(event.target.files[0]);
    this.renderer.removeAttribute(this.uploadBtn.nativeElement, 'disabled');
    this.changeRef.detectChanges();
  }

  upload() {
    this.uploadProgress = this.task.percentageChanges();
    this.uploadProgress.subscribe(num => {
      this.apiUpdate = 'Upload progress: ' + num;
    });
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
        this.downloadURL.subscribe(url => {
          this.url = url;
          this.zone.run(async () => {
            this.router.navigate([`/projects/pdf/${this.dmDocumentId}`]);
          });
        });
      })
    ).subscribe();
  }
}
