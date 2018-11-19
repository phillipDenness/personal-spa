import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, Renderer2, OnDestroy } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FloorplanScannerService } from './floorplan-scanner.service';
import { FloorplanResponse } from './model/floorplan-scanner';

@Component({
  selector: 'app-floorplan-scanner',
  templateUrl: './floorplan-scanner.component.html',
  styleUrls: ['./floorplan-scanner.component.css'],
  providers: [AngularFireStorage]
})
export class FloorplanScannerComponent implements OnInit, OnDestroy {

  private imageName: string;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  private downloadURL: Observable<string>;

  private url: string;
  private floorplanResponseSubscription: Subscription;
  floorplanBody: FloorplanResponse;
  apiUpdate: string;

  @ViewChild('uploadBtn') uploadBtn: ElementRef;

  constructor(private afStorage: AngularFireStorage,
    private changeRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private floorplanScannerService: FloorplanScannerService) { }

  ngOnInit() {
    this.apiUpdate = 'Invoking default API image';
    this.floorplanResponseSubscription = this.floorplanScannerService.getFloorplanResponseSubject()
      .subscribe((floorplanBody: FloorplanResponse) => {
        if (this.apiUpdate) {
          this.apiUpdate = this.apiUpdate + ' | Rendering page';
        }
        this.floorplanBody = floorplanBody;
        this.changeRef.detectChanges();
    });
    // tslint:disable-next-line:max-line-length
    this.floorplanScannerService.createFloorplan('https://firebasestorage.googleapis.com/v0/b/personalspa-221021.appspot.com/o/floorplan.gif?alt=media&token=e4486236-0e2e-490a-bec4-e437377aec30');
  }

  ngOnDestroy() {
    if (this.floorplanResponseSubscription) {
      this.floorplanResponseSubscription.unsubscribe();
    }
  }

  filePicker(event) {
    this.imageName = event.target.files[0].name;
    this.ref = this.afStorage.ref(this.imageName);
    this.task = this.ref.put(event.target.files[0]);
    this.renderer.removeAttribute(this.uploadBtn.nativeElement, 'disabled');
    this.changeRef.detectChanges();
  }

  upload() {
    this.apiUpdate = null;
    this.uploadProgress = this.task.percentageChanges();
    this.uploadProgress.subscribe(num => {
      this.apiUpdate = 'Upload progress: ' + num;
    });

    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.apiUpdate = this.apiUpdate + ' | Waiting for response from API';
        this.downloadURL = this.ref.getDownloadURL();
        this.downloadURL.subscribe(url => {
          this.url = url;
          this.floorplanScannerService.createFloorplan(this.url);
        });
      })
    ).subscribe();
  }
}
