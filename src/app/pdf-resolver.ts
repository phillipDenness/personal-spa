import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { from, Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class APIResolver implements Resolve<any> {
  constructor() {}

  resolve(): Observable<any> {
    const cvDownloadUrl = 'Phillip Denness Software Developer CV.pdf';
    const storageRef = firebase.app().storage().ref();

    return from(storageRef.child(cvDownloadUrl).getDownloadURL());
  }
}
