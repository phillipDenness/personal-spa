import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { from, Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class PdfResolver implements Resolve<any> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let fileUrl = route.paramMap.get('id');
    if (!fileUrl) {
      fileUrl = 'Phillip Denness Software Developer CV.pdf';
    }
    const storageRef = firebase.app().storage().ref();

    return from(storageRef.child(fileUrl).getDownloadURL());
  }
}
