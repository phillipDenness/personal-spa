import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  currentDocument = this.socket.fromEvent<Document>('document');
  s3Response = this.socket.fromEvent<string>('s3Response');

  constructor(private socket: Socket) { }

  getDocument(id: string) {
    this.socket.emit('getDoc', id);
  }

  newDocument() {
    this.socket.emit('addDoc', { id: this.docId(), doc: '' });
  }

  editDocument(document: Document) {
    this.socket.emit('editDoc', document);
  }

  private docId() {
    let text = 'A';
    return text;
  }
}