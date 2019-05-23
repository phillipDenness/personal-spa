import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  s3Response: Observable<string>;
  currentDoc: string;
  private _s3Sub: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this._s3Sub = this.documentService.s3Response.subscribe(s3Url => {
      console.log('Client side has url ' + s3Url);
    });
  }

  ngOnDestroy() {
    this._s3Sub.unsubscribe();
  }

  loadDoc(id: string) {
    this.documentService.getDocument(id);
  }

  newDoc() {
    this.documentService.newDocument();
  }

}